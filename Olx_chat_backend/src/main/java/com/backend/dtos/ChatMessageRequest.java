package com.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageRequest {

    @NotNull
    private Long chatRoomId;

    @NotNull
    private Long senderId;

    @NotBlank
    private String content;

    // getters & setters
}
