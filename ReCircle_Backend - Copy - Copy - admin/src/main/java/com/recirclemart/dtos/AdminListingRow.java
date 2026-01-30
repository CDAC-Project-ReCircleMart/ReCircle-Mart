package com.recirclemart.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface AdminListingRow {
    Integer getId();
    String getTitle();
    Double getPrice();
    String getCategory();
    String getSubcategory();
    String getLocation();
    Integer getYear();
    String getDescription();
    String getStatus();
    
    @JsonProperty("created_at")
    String getCreatedAt();
   
    @JsonProperty("seller_name")
    String getSellerName();
    
    @JsonProperty("seller_email")
    String getSellerEmail();
    String getImage();
    
    
}
