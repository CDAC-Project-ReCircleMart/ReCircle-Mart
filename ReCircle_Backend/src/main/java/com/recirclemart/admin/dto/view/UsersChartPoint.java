//package com.recirclemart.dtos;
//
//import java.sql.Date;
//import java.time.LocalDate;
//
//
//public record UsersChartPoint(LocalDate date, long users) {
//	
//	 public UsersChartPoint(Date date, long users) {
//	        this(date.toLocalDate(), users);
//	    }
//}
//package com.recirclemart.dtos;
//
//import java.sql.Date;
//import java.time.LocalDate;
//
//public record UsersChartPoint(Date date, long users) {
//    public LocalDate localDate() {
//        return date.toLocalDate();
//    }
//}
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
