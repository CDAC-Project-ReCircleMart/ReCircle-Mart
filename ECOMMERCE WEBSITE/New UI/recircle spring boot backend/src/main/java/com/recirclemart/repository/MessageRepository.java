package com.recirclemart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entity.Chat;
import com.recirclemart.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    // Load full chat messages in order
    List<Message> findByChatOrderByCreatedAtAsc(Chat chat);

    // Delete messages by chat
    void deleteByChat(Chat chat);
}
