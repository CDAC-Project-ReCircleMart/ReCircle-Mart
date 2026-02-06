package com.recirclemart.chat.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendMessageRequestDTO {
    private Integer receiverId; 
    private String alg; 
    private String iv; 
    private String ciphertext; 
    private String tag; 
    private String encKeyForReceiver; 

    private String encKeyForSender;

}