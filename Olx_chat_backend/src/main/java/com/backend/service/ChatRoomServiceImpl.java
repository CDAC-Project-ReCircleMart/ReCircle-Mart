package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.entity.ChatParticipant;
import com.backend.entity.ChatRoom;
import com.backend.respository.ChatParticipantRepository;
import com.backend.respository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatParticipantRepository chatParticipantRepository;

    @Override
    public ChatRoom getOrCreateChatRoom(
            String resourceType,
            Long resourceId,
            List<Long> participantExternalUserIds) {

        return chatRoomRepository
                .findByResourceTypeAndResourceId(resourceType, resourceId)
                .orElseGet(() -> createChatRoom(
                        resourceType,
                        resourceId,
                        participantExternalUserIds
                ));
    }

    private ChatRoom createChatRoom(
            String resourceType,
            Long resourceId,
            List<Long> participantExternalUserIds) {

        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setResourceType(resourceType);
        chatRoom.setResourceId(resourceId);

        ChatRoom savedRoom = chatRoomRepository.save(chatRoom);

        for (Long userId : participantExternalUserIds) {
            ChatParticipant participant = new ChatParticipant();
            participant.setChatRoom(savedRoom);
            participant.setExternalUserId(userId);
            chatParticipantRepository.save(participant);
        }

        return savedRoom;
    }

    @Override
    public ChatRoom getChatRoomById(Long chatRoomId) {
        return chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));
    }
}
