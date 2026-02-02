package com.recirclemart.dtos;

import java.util.List;

public record UsersListingsChartResponse(
        List<UsersChartPoint> users,
        List<ListingsChartPoint> listings
) {}
