package com.recirclemart.dtos;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ChatListResponseDTO {
    private Integer id;
    private Integer listingId;
    private Integer buyerId;
    private Integer sellerId;
    private String title;

    private Integer otherId;
    private String otherName;
    private String otherAvatar;
}