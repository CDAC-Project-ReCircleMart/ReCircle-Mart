package com.recirclemart.dtos;

public record AdminEventCreateRequest(
        String title,
        String eventDate,     // yyyy-MM-dd
        String description
) {}
