package com.recirclemart.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class AdminEventCreateRequest{
        String title;
        @JsonProperty("event_date")
        String eventDate;     // yyyy-MM-dd
        String description;
} 
