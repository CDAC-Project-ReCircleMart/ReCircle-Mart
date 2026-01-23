package com.backend.service;

import java.util.List;

import com.backend.entity.ChatMessage;

public interface ChatMessageService {

    ChatMessage sendMessage(
            Long chatRoomId,
            Long senderExternalUserId,
            String message
    );

    List<ChatMessage> getChatHistory(Long chatRoomId);
}
