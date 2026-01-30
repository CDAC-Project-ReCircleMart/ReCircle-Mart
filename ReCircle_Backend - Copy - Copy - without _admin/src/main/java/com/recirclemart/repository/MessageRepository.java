package com.recirclemart.repository;

import com.recirclemart.entity.Chat;
import com.recirclemart.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {
	List<Message> findByChat_IdOrderByIdAsc(Integer chatId);
	void deleteByChat_Id(Integer chatId);
    // Load full chat messages in order
    List<Message> findByChatOrderByCreatedAtAsc(Chat chat);
}
