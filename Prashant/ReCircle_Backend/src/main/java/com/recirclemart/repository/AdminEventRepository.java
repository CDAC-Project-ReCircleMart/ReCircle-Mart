//package com.recirclemart.repository;
//
//import com.recirclemart.entity.AdminEvent;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.JpaRepository;
//
//public interface AdminEventRepository extends JpaRepository<AdminEvent, Integer> {
//
//	List<AdminEvent> findAllByOrderByCreatedAtDesc();
//}


package com.recirclemart.repository;

import com.recirclemart.entity.AdminEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface AdminEventRepository extends JpaRepository<AdminEvent, Integer> {

    // Get all events ordered by newest first (admin panel)
    List<AdminEvent> findAllByOrderByCreatedAtDesc();

    // Upcoming events (by event date)
    List<AdminEvent> findByEventDateAfterOrderByEventDateAsc(LocalDate date);

    // Past events
    List<AdminEvent> findByEventDateBeforeOrderByEventDateDesc(LocalDate date);

    // Search by title (optional future feature)
    List<AdminEvent> findByTitleContainingIgnoreCase(String keyword);
    
    List<AdminEvent> findAllByOrderByEventDateAsc();
    List<AdminEvent> findByEventDateOrderByCreatedAt(LocalDate date);
}
