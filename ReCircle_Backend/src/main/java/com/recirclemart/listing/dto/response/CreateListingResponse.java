package com.recirclemart.listing.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateListingResponse {
    private String message;
    private Integer id;
}