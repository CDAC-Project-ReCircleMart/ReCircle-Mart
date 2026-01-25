package com.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.dtos.ChatRoomRequestDTO;
import com.backend.dtos.ChatRoomResponseDTO;
import com.backend.entity.ChatRoom;
import com.backend.enums.ResourceType;
import com.backend.service.ChatRoomService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping
    public ResponseEntity<ChatRoomResponseDTO> getOrCreateChatRoom(
    		@RequestBody ChatRoomRequestDTO request
    		) {
    		ChatRoomResponseDTO response =
    		chatRoomService.getOrCreateChatRoom(
    		request.getResourceType(),
    		request.getResourceId(),
    		request.getParticipantIds()
    		);


    		return ResponseEntity.ok(response);
    		}
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<ChatRoomResponseDTO> getRoom(
            @PathVariable Long chatRoomId
    ) {
        return ResponseEntity.ok(chatRoomService.getChatRoom(chatRoomId));
    }
}
