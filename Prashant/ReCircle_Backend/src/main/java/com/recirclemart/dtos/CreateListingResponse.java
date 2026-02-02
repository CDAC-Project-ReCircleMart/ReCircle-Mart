package com.recirclemart.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateListingResponse {
    private String message;
    private Integer id;
}