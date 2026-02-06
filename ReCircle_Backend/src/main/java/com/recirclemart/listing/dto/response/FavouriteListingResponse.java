// dto/FavouriteListingResponse.java
package com.recirclemart.listing.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FavouriteListingResponse {
    private Integer id;
    private String title;
    private Double price;
    private String category;
    private String subcategory;
    private String location;
    private Integer year;
    private String description;
    private LocalDateTime createdAt;

    
    private String image;
}
