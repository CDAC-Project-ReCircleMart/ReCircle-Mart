package com.recirclemart.repository;

import com.recirclemart.entity.Chat;
import com.recirclemart.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    // Load full chat messages in order
    List<Message> findByChatOrderByCreatedAtAsc(Chat chat);
}
