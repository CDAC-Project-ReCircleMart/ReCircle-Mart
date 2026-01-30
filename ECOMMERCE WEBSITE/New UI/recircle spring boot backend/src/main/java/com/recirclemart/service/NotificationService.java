package com.recirclemart.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recirclemart.entity.Notification;
import com.recirclemart.entity.User;
import com.recirclemart.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

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

    public long getUnreadCount(User user) {
        return notificationRepository.countByUserAndIsReadFalse(user);
    }

    public Notification markAsRead(Integer id, User user) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        if (!n.getUser().getId().equals(user.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("Not allowed");
        }
        n.setIsRead(true);
        return notificationRepository.save(n);
    }

    public void markAllAsRead(User user) {
        List<Notification> unread = notificationRepository.findByUserAndIsReadFalse(user);
        unread.forEach(n -> n.setIsRead(true));
        notificationRepository.saveAll(unread);
    }

    public void deleteNotification(Integer id, User user) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        if (!n.getUser().getId().equals(user.getId())) {
            throw new org.springframework.security.access.AccessDeniedException("Not allowed");
        }
        notificationRepository.delete(n);
    }
}
