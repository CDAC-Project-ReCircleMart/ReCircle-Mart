package com.recirclemart.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EncryptedMessageRequestDTO {
  private Integer chatId;
  private Integer receiverId;

  private String alg;
  private String iv;
  private String ciphertext;
  private String tag;
  private String encKeyForReceiver;
}