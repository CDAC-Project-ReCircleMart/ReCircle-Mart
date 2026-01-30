package com.recirclemart.controller;

import com.recirclemart.entity.*;
import com.recirclemart.service.MessageService;
import com.recirclemart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired private MessageService messageService;
    @Autowired private ChatRepository chatRepository;
    @Autowired private UserRepository userRepository;

    @PostMapping("/{chatId}")
    public Message send(@PathVariable Integer chatId,
                        @RequestBody Map<String, String> body,
                        Principal principal) {

        Chat chat = chatRepository.findById(chatId).orElseThrow();
        User sender = userRepository.findByEmail(principal.getName()).orElseThrow();

        return messageService.sendMessage(chat, sender, body.get("message"));
    }

    @GetMapping("/{chatId}")
    public List<Message> getChat(@PathVariable Integer chatId) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();
        return messageService.getChatMessages(chat);
    }
}
