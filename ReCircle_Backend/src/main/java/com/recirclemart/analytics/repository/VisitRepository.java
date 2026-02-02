package com.recirclemart.analytics.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.recirclemart.analytics.entity.Visit;

import java.time.LocalDate;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Integer> {

    @Query(value = "SELECT COUNT(*) FROM visits WHERE DATE(created_at) = :today", nativeQuery = true)
    long countToday(@Param("today") LocalDate today);

    // 🔥 FIX: return Object[] instead of DTO
    @Query(value = """
            SELECT DATE(created_at) AS date, COUNT(*) AS visits
            FROM visits
            GROUP BY DATE(created_at)
            ORDER BY DATE(created_at)
            """, nativeQuery = true)
    List<Object[]> visitsPerDayRaw();
}