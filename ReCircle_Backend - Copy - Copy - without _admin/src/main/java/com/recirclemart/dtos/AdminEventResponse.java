package com.recirclemart.dtos;

import com.recirclemart.entity.AdminEvent;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record AdminEventResponse(
        Long id,
        String title,
        LocalDate eventDate,
        String description,
        LocalDateTime createdAt
) {
    public static AdminEventResponse from(AdminEvent e) {
        return new AdminEventResponse(e.getId(), e.getTitle(), e.getEventDate(), e.getDescription(), e.getCreatedAt());
    }
}
