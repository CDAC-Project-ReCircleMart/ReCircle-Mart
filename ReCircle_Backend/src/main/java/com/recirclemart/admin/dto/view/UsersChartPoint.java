package com.recirclemart.admin.dto.view;

import java.sql.Date;
import java.time.LocalDate;

public class UsersChartPoint {

    private LocalDate date;
    private Long users;

    public UsersChartPoint(Date date, Long users) {
        this.date = date.toLocalDate();
        this.users = users;
    }

    public LocalDate getDate() {
        return date;
    }

    public Long getUsers() {
        return users;
    }
}
