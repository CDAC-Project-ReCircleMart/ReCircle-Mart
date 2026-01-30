package com.recirclemart.dtos;

public interface ChatListView {
    Integer getId();
    Integer getListingId();
    Integer getBuyerId();
    Integer getSellerId();
    String getTitle();

    Integer getOtherId();
    String getOtherName();
    String getOtherAvatar();
}
