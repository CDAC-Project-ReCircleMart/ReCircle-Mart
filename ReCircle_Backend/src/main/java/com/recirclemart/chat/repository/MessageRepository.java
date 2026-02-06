package com.recirclemart.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.chat.entity.Chat;
import com.recirclemart.chat.entity.Message;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findByChat_IdOrderByIdAsc(Integer chatId);

    void deleteByChat_Id(Integer chatId);

   
    List<Message> findByChatOrderByCreatedAtAsc(Chat chat);
}
