package com.recirclemart.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponseDTO {

    private Long productId;
    private String title;
    private String description;
    private double price;
    private String location;
    private boolean sold;

    private String sellerEmail;
    private String categoryName;
}
