package com.backend.controller.rest;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.entity.ChatRoom;
import com.backend.service.ChatRoomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    /**
     * Create or fetch existing chat room
     */
    @PostMapping
    public ResponseEntity<ChatRoom> getOrCreateChatRoom(
            @RequestParam String resourceType,
            @RequestParam Long resourceId,
            @RequestBody List<Long> participantExternalUserIds
    ) {
        ChatRoom chatRoom = chatRoomService.getOrCreateChatRoom(
                resourceType,
                resourceId,
                participantExternalUserIds
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(chatRoom);
    }

    /**
     * Get chat room by ID
     */
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<ChatRoom> getChatRoom(
            @PathVariable Long chatRoomId
    ) {
        return ResponseEntity.ok(
                chatRoomService.getChatRoomById(chatRoomId)
        );
    }
}