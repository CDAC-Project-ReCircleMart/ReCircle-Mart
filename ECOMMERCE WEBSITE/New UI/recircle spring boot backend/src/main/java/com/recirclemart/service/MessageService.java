package com.recirclemart.service;

import com.recirclemart.entity.*;
import com.recirclemart.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    public Message sendMessage(Chat chat, User sender, String text) {

        Message msg = Message.builder()
                .chat(chat)
                .sender(sender)
                .message(text)
                .build();

        return messageRepository.save(msg);
    }

    public List<Message> getChatMessages(Chat chat) {
        return messageRepository.findByChatOrderByCreatedAtAsc(chat);
    }

    public void deleteMessagesByChat(Chat chat) {
        messageRepository.deleteByChat(chat);
    }
}
