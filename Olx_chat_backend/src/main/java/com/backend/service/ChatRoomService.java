package com.backend.service;

import java.util.List;

import com.backend.entity.ChatRoom;

public interface ChatRoomService {

    ChatRoom getOrCreateChatRoom(
            String resourceType,
            Long resourceId,
            List<Long> participantExternalUserIds
    );

    ChatRoom getChatRoomById(Long chatRoomId);
}