package com.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dtos.ChatRoomResponseDTO;
import com.backend.entity.ChatParticipant;
import com.backend.entity.ChatRoom;
import com.backend.enums.ResourceType;
import com.backend.repository.ChatParticipantRepository;
import com.backend.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatParticipantRepository chatParticipantRepository;

    public ChatRoomResponseDTO getOrCreateChatRoom(
            ResourceType resourceType,
            Long resourceId,
            List<Long> participantIds
    ) {
        // 1️⃣ Create or fetch chat room
        ChatRoom room = chatRoomRepository
                .findByResourceTypeAndResourceId(resourceType, resourceId)
                .orElseGet(() -> {
                    ChatRoom newRoom = new ChatRoom();
                    newRoom.setResourceType(resourceType);
                    newRoom.setResourceId(resourceId);
                    return chatRoomRepository.save(newRoom);
                });

        // 2️⃣ Safely handle participants (VERY IMPORTANT)
        if (participantIds != null && !participantIds.isEmpty()) {
            for (Long userId : participantIds) {

                boolean exists =
                        chatParticipantRepository.existsByChatRoomChatRoomIdAndExternalUserId(
                                        room.getChatRoomId(),
                                        userId
                                );

                if (!exists) {
                    ChatParticipant cp = new ChatParticipant();
                    cp.setChatRoom(room);
                    cp.setExternalUserId(userId);
                    cp.setJoinedAt(LocalDateTime.now()); // REQUIRED
                    chatParticipantRepository.save(cp);
                }
            }
        }

        // 3️⃣ Return DTO (no entity leakage)
        return mapToDTO(room);
    }

    public ChatRoomResponseDTO getChatRoom(Long chatRoomId) {
        ChatRoom room = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));
        return mapToDTO(room);
    }

    private ChatRoomResponseDTO mapToDTO(ChatRoom room) {
        ChatRoomResponseDTO dto = new ChatRoomResponseDTO();
        dto.setChatRoomId(room.getChatRoomId());
        dto.setResourceType(room.getResourceType());
        dto.setResourceId(room.getResourceId());
        dto.setCreatedAt(room.getCreatedAt());

        List<Long> users = chatParticipantRepository
                .findByChatRoomChatRoomId(room.getChatRoomId())
                .stream()
                .map(ChatParticipant::getExternalUserId)
                .toList();

        dto.setParticipantExternalUserIds(users);
        return dto;
    }
}