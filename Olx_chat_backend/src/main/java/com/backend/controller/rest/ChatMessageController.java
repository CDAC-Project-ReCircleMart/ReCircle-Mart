package com.backend.controller.rest;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ChatMessageRequest;
import com.backend.entity.ChatMessage;
import com.backend.service.ChatMessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat/messages")
@RequiredArgsConstructor
public class ChatMessageController {

	private final ChatMessageService chatMessageService;

	/**
	 * Send message in a chat room
	 */
	@PostMapping
	public ResponseEntity<ChatMessage> sendMessage(@RequestBody ChatMessageRequest request) {
		ChatMessage chatMessage = chatMessageService.sendMessage(request.getChatRoomId(), request.getSenderId(),
				request.getContent());

		return ResponseEntity.ok(chatMessage);
	}

	/**
	 * Fetch chat history
	 */
	@GetMapping("/{chatRoomId}")
	public ResponseEntity<List<ChatMessage>> getChatHistory(@PathVariable Long chatRoomId) {
		return ResponseEntity.ok(chatMessageService.getChatHistory(chatRoomId));
	}
}
