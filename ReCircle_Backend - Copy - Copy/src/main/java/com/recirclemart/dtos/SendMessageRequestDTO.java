package com.recirclemart.dtos;

import lombok.Getter;
import lombok.Setter;
@Getter @Setter
public class SendMessageRequestDTO {
    private Integer receiverId;          // important
    private String alg;                  // "AES-256-GCM"
    private String iv;                   // base64
    private String ciphertext;           // base64
    private String tag;                  // base64
    private String encKeyForReceiver;    // base64 (RSA-OAEP(aesKey))
}