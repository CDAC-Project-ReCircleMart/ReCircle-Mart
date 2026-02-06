

package com.recirclemart.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.admin.entity.AdminEvent;

import java.time.LocalDate;
import java.util.List;

public interface AdminEventRepository extends JpaRepository<AdminEvent, Integer> {

    
    List<AdminEvent> findAllByOrderByCreatedAtDesc();

   
    List<AdminEvent> findByEventDateAfterOrderByEventDateAsc(LocalDate date);

    
    List<AdminEvent> findByEventDateBeforeOrderByEventDateDesc(LocalDate date);

    
    List<AdminEvent> findByTitleContainingIgnoreCase(String keyword);

    List<AdminEvent> findAllByOrderByEventDateAsc();

    List<AdminEvent> findByEventDateOrderByCreatedAt(LocalDate date);
}
