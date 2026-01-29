package com.recirclemart.repository;

import com.recirclemart.entity.Notification;
import com.recirclemart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    // All notifications of user
    List<Notification> findByUserOrderByCreatedAtDesc(User user);

    // Unread notifications
    List<Notification> findByUserAndIsReadFalse(User user);
}
