package com.backend.dtos;

import java.time.LocalDateTime;

import com.backend.enums.MessageType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageResponseDTO {
    private Long messageId;
    private Long chatRoomId;
    private Long senderExternalUserId;
    private String message;
    private MessageType messageType;
    private LocalDateTime createdAt;
}