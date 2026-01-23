package com.backend.respository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.ChatMessage;
import com.backend.entity.ChatRoom;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

List<ChatMessage> findByChatRoomOrderByCreatedAtAsc(
    ChatRoom chatRoom
);

List<ChatMessage> findByChatRoomOrderByCreatedAtDesc(
    ChatRoom chatRoom,
    Pageable pageable
);
}
