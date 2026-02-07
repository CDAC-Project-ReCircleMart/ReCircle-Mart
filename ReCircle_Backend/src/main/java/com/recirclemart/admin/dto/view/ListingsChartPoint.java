package com.recirclemart.admin.dto.view;

import java.sql.Date;
import java.time.LocalDate;

public class ListingsChartPoint {

    private final LocalDate date;
    private final long listings;

    public ListingsChartPoint(Date date, long listings) {
        this.date = date.toLocalDate();
        this.listings = listings;
    }

    public LocalDate getDate() {
        return date;
    }

    public long getListings() {
        return listings;
    }
}
