package com.recirclemart.notification.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponseDTO {

    private Integer id;
    private Integer userId;
    private String type;
    private String title;
    private String message;
    private Integer listingId;
    private Integer relatedUserId;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
