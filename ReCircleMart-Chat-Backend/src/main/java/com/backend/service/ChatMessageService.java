package com.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dtos.ChatMessageResponseDTO;
import com.backend.entity.ChatMessage;
import com.backend.entity.ChatRoom;
import com.backend.enums.MessageType;
import com.backend.repository.ChatMessageRepository;
import com.backend.repository.ChatRoomRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    public ChatMessageResponseDTO sendMessage(
            Long chatRoomId,
            Long senderId,
            String content
    ) {
        ChatRoom room = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));

        ChatMessage msg = new ChatMessage();
        msg.setChatRoom(room);
        msg.setSenderExternalUserId(senderId);
        msg.setMessage(content);
        msg.setMessageType(MessageType.TEXT);

        return mapToDTO(chatMessageRepository.save(msg));
    }

    public List<ChatMessageResponseDTO> getChatHistory(Long chatRoomId) {
        return chatMessageRepository
                .findByChatRoomChatRoomIdOrderByCreatedAtAsc(chatRoomId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private ChatMessageResponseDTO mapToDTO(ChatMessage m) {
        ChatMessageResponseDTO dto = new ChatMessageResponseDTO();
        dto.setMessageId(m.getMessageId());
        dto.setChatRoomId(m.getChatRoom().getChatRoomId());
        dto.setSenderExternalUserId(m.getSenderExternalUserId());
        dto.setMessage(m.getMessage());
        dto.setMessageType(m.getMessageType());
        dto.setCreatedAt(m.getCreatedAt());
        return dto;
    }
}