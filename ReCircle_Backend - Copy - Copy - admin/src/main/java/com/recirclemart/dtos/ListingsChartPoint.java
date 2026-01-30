//package com.recirclemart.dtos;
//
//
//
//import java.time.LocalDate;
//
//public record ListingsChartPoint(LocalDate date, long listings) {
//
//    // ✅ JPA will use this when the query returns java.sql.Date
//    public ListingsChartPoint(java.sql.Date date, long listings) {
//        this(date.toLocalDate(), listings);
//    }
//}


package com.recirclemart.dtos;

import java.sql.Date;
import java.time.LocalDate;

public class ListingsChartPoint {

    private final LocalDate date;
    private final long listings;

    // ✅ SINGLE constructor with exactly 2 params (matches query)
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
