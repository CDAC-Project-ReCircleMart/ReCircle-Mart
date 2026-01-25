package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

	List<ChatMessage> findByChatRoomChatRoomIdOrderByCreatedAtAsc(Long chatRoomId);
}
