package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.ChatParticipant;

public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

List<ChatParticipant> findByChatRoomChatRoomId(Long chatRoomId);

boolean existsByChatRoomChatRoomIdAndExternalUserId(Long chatRoomId, Long userId);
}
