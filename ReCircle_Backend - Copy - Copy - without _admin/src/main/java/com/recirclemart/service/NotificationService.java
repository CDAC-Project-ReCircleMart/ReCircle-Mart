package com.recirclemart.service;

import com.recirclemart.entity.Notification;
import com.recirclemart.repository.NotificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    // Equivalent to Node createNotification()
    public void createNotification(Integer userId, String type, String title, String message,
                                   Integer listingId, Integer relatedUserId) {

        Notification n = Notification.builder()
                .userId(userId)
                .type(type)
                .title(title)
                .message(message)
                .listingId(listingId)
                .relatedUserId(relatedUserId)
                .isRead(false)
                .build();

        notificationRepository.save(n);
    }

    public List<Notification> getUserNotifications(Integer userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public long getUnreadCount(Integer userId) {
        return notificationRepository.countUnread(userId);
    }

    @Transactional
    public void markAsRead(Integer userId, Integer id) {
        Notification n = notificationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Not authorized"));

        n.setIsRead(true);
        notificationRepository.save(n);
    }

    @Transactional
    public void markAllAsRead(Integer userId) {
        notificationRepository.markAllAsRead(userId);
    }

    @Transactional
    public void deleteNotification(Integer userId, Integer id) {
        Notification n = notificationRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new RuntimeException("Not authorized"));

        notificationRepository.delete(n);
    }
}
