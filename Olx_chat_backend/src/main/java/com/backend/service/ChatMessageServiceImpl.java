package com.backend.service;




import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import com.backend.entity.ChatMessage;
import com.backend.entity.ChatRoom;
import com.backend.entity.enums.MessageType;
import com.backend.respository.ChatMessageRepository;
import com.backend.respository.ChatParticipantRepository;
import com.backend.respository.ChatRoomRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatParticipantRepository chatParticipantRepository;

    @Override
    public ChatMessage sendMessage(
            Long chatRoomId,
            Long senderExternalUserId,
            String message) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));

        // Authorization check
        chatParticipantRepository
                .findByChatRoomAndExternalUserId(chatRoom, senderExternalUserId)
                .orElseThrow(() -> new RuntimeException("User not part of chat"));

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setChatRoom(chatRoom);
        chatMessage.setSenderExternalUserId(senderExternalUserId);
        chatMessage.setMessage(message);
        chatMessage.setMessageType(MessageType.TEXT);

        return chatMessageRepository.save(chatMessage);
    }

    @Override
    public List<ChatMessage> getChatHistory(Long chatRoomId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
                .orElseThrow(() -> new RuntimeException("Chat room not found"));

        return chatMessageRepository.findByChatRoomOrderByCreatedAtAsc(chatRoom);
    }
}
