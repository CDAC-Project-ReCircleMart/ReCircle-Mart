package com.recirclemart.admin.dto.response;

public record DashboardStatsResponse(
        long totalUsers,
        long totalListings,
        long totalVisitsToday,
        long todayListings) {
}
