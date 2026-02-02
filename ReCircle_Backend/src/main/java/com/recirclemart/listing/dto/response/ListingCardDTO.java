package com.recirclemart.listing.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ListingCardDTO {
    private Integer id;
    private String title;
    private Double price;
    private String category;
    private String subcategory;

    private String location;
    private Integer year;
    private String description;
    private Integer seller_id;
    private LocalDateTime created_at;

    // Node returns one image field for lists
    private String image;
}