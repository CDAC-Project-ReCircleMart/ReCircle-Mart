package com.recirclemart.dtos;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class MessageResponseDTO {
    private Integer id;
    private Integer chatId;
    private Integer senderId;
    private Integer receiverId;

    private String alg;
    private String iv;
    private String ciphertext;
    private String tag;
    private String encKeyForReceiver;
    
    private String encKeyForSender;

    private LocalDateTime createdAt;
}