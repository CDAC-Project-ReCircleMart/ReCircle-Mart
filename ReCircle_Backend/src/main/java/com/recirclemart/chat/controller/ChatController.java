package com.recirclemart.chat.controller;

import com.recirclemart.chat.dto.request.SendMessageRequestDTO;
import com.recirclemart.chat.dto.request.StartChatRequestDTO;
import com.recirclemart.chat.dto.response.MessageResponseDTO;
import com.recirclemart.chat.service.ChatService;

import com.recirclemart.listing.repository.ListingRepository;
import com.recirclemart.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/messages")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/start")
    public ResponseEntity<?> startChat(@RequestBody StartChatRequestDTO req) {
        Integer chatId = chatService.startChat(req.getListingId(), req.getSellerId());
        return ResponseEntity.ok(Map.of("chatId", chatId));
    }

    @GetMapping
    public ResponseEntity<?> getMyChats() {
        return ResponseEntity.ok(chatService.getMyChats());
    }

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<MessageResponseDTO>> getMessages(@PathVariable Integer chatId) {
        return ResponseEntity.ok(chatService.getMessages(chatId)); // now returns encrypted DTOs
    }

    @PostMapping("/{chatId}/messages")
    public ResponseEntity<MessageResponseDTO> sendMessage(
            @PathVariable Integer chatId,
            @RequestBody SendMessageRequestDTO req) {
        return ResponseEntity.ok(chatService.sendMessage(chatId, req));
    }

    @DeleteMapping("/{chatId}")
    public ResponseEntity<?> deleteChat(@PathVariable Integer chatId) {
        chatService.deleteChat(chatId);
        return ResponseEntity.ok(Map.of("message", "Chat deleted"));
    }
}
