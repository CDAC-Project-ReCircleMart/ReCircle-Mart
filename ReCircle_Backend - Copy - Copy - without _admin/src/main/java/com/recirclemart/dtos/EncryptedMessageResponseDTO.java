package com.recirclemart.dtos;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
public class EncryptedMessageResponseDTO {
  private Integer id;
  private Integer chatId;
  private Integer senderId;
  private Integer receiverId;

  private String alg;
  private String iv;
  private String ciphertext;
  private String tag;
  private String encKeyForReceiver;

  private LocalDateTime createdAt;
}