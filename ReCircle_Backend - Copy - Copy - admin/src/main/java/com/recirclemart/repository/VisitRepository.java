package com.recirclemart.repository;



import com.recirclemart.dtos.VisitsChartPoint;
import com.recirclemart.entity.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Integer> {

    @Query(value = "SELECT COUNT(*) FROM visits WHERE DATE(created_at) = :today", nativeQuery = true)
    long countToday(@Param("today") LocalDate today);

    @Query(value = """
      SELECT DATE(created_at) as date, COUNT(*) as visits
      FROM visits
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
      """, nativeQuery = true)
    List<VisitsChartPoint> visitsPerDay();
}
