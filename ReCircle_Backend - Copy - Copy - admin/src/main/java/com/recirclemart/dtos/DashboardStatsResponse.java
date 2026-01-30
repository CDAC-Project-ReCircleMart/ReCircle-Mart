package com.recirclemart.dtos;

public record DashboardStatsResponse(
        long totalUsers,
        long totalListings,
        long totalVisitsToday,
        long todayListings
) {}
