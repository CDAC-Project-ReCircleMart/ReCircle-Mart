package com.recirclemart.admin.dto.view;

import java.util.List;

public record UsersListingsChartResponse(
                List<UsersChartPoint> users,
                List<ListingsChartPoint> listings) {
}
