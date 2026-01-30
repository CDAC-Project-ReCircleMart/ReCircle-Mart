package com.recirclemart.dtos;

public interface AdminListingRow {
    Long getId();
    String getTitle();
    Double getPrice();
    String getCategory();
    String getSubcategory();
    String getLocation();
    Integer getYear();
    String getDescription();
    String getStatus();

    String getSellerName();
    String getSellerEmail();
    String getImage();
}
