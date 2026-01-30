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

    @Autowired
    private MessageService messageService;
    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatRepository chatRepository;
    @Autowired
    private UserRepository userRepository;

    // LIST CHATS (converted to Node-style flattened JSON expected by frontend)
    @GetMapping
    public List<Map<String, Object>> allChats(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Chat> chats = chatService.getUserChats(user);

        return chats.stream().map(c -> {
            Map<String, Object> m = new java.util.HashMap<>();
            m.put("id", c.getId());
            m.put("listing_id", c.getListing().getId());
            m.put("buyer_id", c.getBuyer().getId());
            m.put("seller_id", c.getSeller().getId());
            m.put("title", c.getListing().getTitle());

            // other_* fields depend on current user
            if (c.getBuyer().getId().equals(user.getId())) {
                m.put("other_id", c.getSeller().getId());
                m.put("other_name", c.getSeller().getFirstName() + " " + c.getSeller().getLastName());
                m.put("other_avatar", c.getSeller().getAvatar());
            } else {
                m.put("other_id", c.getBuyer().getId());
                m.put("other_name", c.getBuyer().getFirstName() + " " + c.getBuyer().getLastName());
                m.put("other_avatar", c.getBuyer().getAvatar());
            }

            return m;
        }).toList();
    }

    // GET MESSAGES FOR A CHAT (Node-style fields)
    @GetMapping("/{chatId}/messages")
    public List<Map<String, Object>> getChatMessages(@PathVariable Integer chatId) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();
        List<Message> messages = messageService.getChatMessages(chat);

        return messages.stream().map(m -> {
            Map<String, Object> mm = new java.util.HashMap<>();
            mm.put("id", m.getId());
            mm.put("chat_id", m.getChat().getId());
            mm.put("sender_id", m.getSender().getId());
            mm.put("message", m.getMessage());
            mm.put("created_at", m.getCreatedAt() == null ? null : m.getCreatedAt().toString());
            return mm;
        }).toList();
    }

    // SEND MESSAGE (accepts { message: ... } or { text: ... })
    @PostMapping("/{chatId}/messages")
    public Map<String, Object> sendMessage(@PathVariable Integer chatId,
            @RequestBody Map<String, String> body,
            Principal principal) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();
        User sender = userRepository.findByEmail(principal.getName()).orElseThrow();

        String text = body.getOrDefault("message", body.get("text"));
        Message saved = messageService.sendMessage(chat, sender, text);

        Map<String, Object> mm = new java.util.HashMap<>();
        mm.put("id", saved.getId());
        mm.put("chat_id", saved.getChat().getId());
        mm.put("sender_id", saved.getSender().getId());
        mm.put("message", saved.getMessage());
        mm.put("created_at", saved.getCreatedAt() == null ? null : saved.getCreatedAt().toString());

        return mm;
    }

    // DELETE CHAT (and its messages) — only allowed for participants
    @DeleteMapping("/{chatId}")
    public Map<String, String> deleteChat(@PathVariable Integer chatId, Principal principal) {
        Chat chat = chatRepository.findById(chatId).orElseThrow();
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        if (!chat.getBuyer().getId().equals(user.getId()) && !chat.getSeller().getId().equals(user.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("Not allowed");
        }

        messageService.deleteMessagesByChat(chat);
        chatService.deleteChat(chat);

        return Map.of("message", "Chat deleted");
    }
}
