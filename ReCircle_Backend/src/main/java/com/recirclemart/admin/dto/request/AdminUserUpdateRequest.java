package com.recirclemart.admin.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AdminUserUpdateRequest(

        @JsonProperty("first_name") String firstName,
        @JsonProperty("last_name") String lastName,
        String email,
        String password,
        String role) {
}
