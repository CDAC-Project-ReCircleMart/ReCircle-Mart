package com.backend.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.backend.enums.ResourceType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomResponseDTO {
    private Long chatRoomId;
    private ResourceType resourceType;
    private Long resourceId;
    private List<Long> participantExternalUserIds;
    private LocalDateTime createdAt;
}
