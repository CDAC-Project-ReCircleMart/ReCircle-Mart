package com.recirclemart.repository;

import com.recirclemart.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VisitRepository extends JpaRepository<Visit, Integer> {

    // Admin dashboard - today visits
    @Query("SELECT COUNT(v) FROM Visit v WHERE DATE(v.createdAt) = CURRENT_DATE")
    long countTodayVisits();
}
