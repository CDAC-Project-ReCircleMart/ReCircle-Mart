package com.recirclemart.admin.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.recirclemart.admin.entity.AdminEvent;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
public class AdminEventResponse {
        Integer id;
        String title;
        @JsonProperty("event_date")
        LocalDate eventDate;
        String description;
        @JsonProperty("created_at")
        LocalDateTime createdAt;

        public static AdminEventResponse from(AdminEvent e) {
                return new AdminEventResponse(e.getId(), e.getTitle(), e.getEventDate(), e.getDescription(),
                                e.getCreatedAt());
        }
}
