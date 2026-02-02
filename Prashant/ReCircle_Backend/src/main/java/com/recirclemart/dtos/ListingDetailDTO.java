package com.recirclemart.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListingDetailDTO {
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

    // Node adds images[]
    private List<String> images;

    // Node adds seller object
    private SellerDTO seller;

    @Data
    @AllArgsConstructor
    public static class SellerDTO {
        private Integer id;
        private String name;   // maps to first_name in Node query
        private String avatar;
    }
}