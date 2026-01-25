package com.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ChatMessageRequest;
import com.backend.dtos.ChatMessageResponseDTO;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat/messages")
@RequiredArgsConstructor
public class ChatMessageController {

    private final com.backend.service.ChatMessageService chatMessageService;

    @PostMapping
    public ResponseEntity<ChatMessageResponseDTO> sendMessage(
            @RequestBody ChatMessageRequest request
    ) {
        return ResponseEntity.ok(
                chatMessageService.sendMessage(
                        request.getChatRoomId(),
                        request.getSenderId(),
                        request.getContent()
                )
        );
    }

    @GetMapping("/{chatRoomId}")
    public ResponseEntity<List<ChatMessageResponseDTO>> getMessages(
            @PathVariable Long chatRoomId
    ) {
        return ResponseEntity.ok(
                chatMessageService.getChatHistory(chatRoomId)
        );
    }
}