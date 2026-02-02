package com.recirclemart.admin.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public interface AdminUserRow {
    Long getId();

    @JsonProperty("first_name")

    String getFirstName();

    @JsonProperty("last_name")

    String getLastName();

    String getEmail();

    String getAvatar();

    String getRole();

    Long getTotalListings();
}
