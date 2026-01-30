package com.recirclemart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entity.Notification;
import com.recirclemart.entity.User;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    // All notifications of user
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Unread notifications
    List<Notification> findByUserAndIsReadFalse(User user);

    // Unread count
    long countByUserAndIsReadFalse(User user);
}
