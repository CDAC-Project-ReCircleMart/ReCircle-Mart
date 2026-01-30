package com.recirclemart.dtos;

import com.recirclemart.entity.AdminEvent;

import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
public class AdminEventResponse{
        Integer id;
        String title;
        LocalDate eventDate;
        String description;
        LocalDateTime createdAt;
 
    

	public static AdminEventResponse from(AdminEvent e) {
        return new AdminEventResponse(e.getId(), e.getTitle(), e.getEventDate(), e.getDescription(), e.getCreatedAt());
    }
}
