package com.recirclemart.dtos;

import java.util.List;

public record UsersListResponse(
        List<AdminUserRow> users,
        int total,
        int page,
        int totalPages
) {}
