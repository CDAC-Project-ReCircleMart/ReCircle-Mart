package com.recirclemart.service;

import com.recirclemart.entity.*;
import com.recirclemart.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired private NotificationRepository notificationRepository;

    public Notification createNotification(User user, String message) {

        Notification n = Notification.builder()
                .user(user)
                .message(message)
                .isRead(false)
                .build();

        return notificationRepository.save(n);
    }

    public List<Notification> getUserNotifications(User user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Notification> getUnread(User user) {
        return notificationRepository.findByUserAndIsReadFalse(user);
    }
}
