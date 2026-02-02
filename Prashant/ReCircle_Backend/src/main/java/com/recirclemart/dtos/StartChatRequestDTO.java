package com.recirclemart.dtos;

import com.recirclemart.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StartChatRequestDTO {
    private Integer listingId;
    private Integer sellerId;
    
    
}