package com.recirclemart.user.dto.response;

import java.util.List;

import com.recirclemart.admin.dto.response.AdminUserRow;

public record UsersListResponse(
                List<AdminUserRow> users,
                int total,
                int page,
                int totalPages) {
}
