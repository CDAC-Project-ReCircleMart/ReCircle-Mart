package com.recirclemart.notification.controller;

import com.recirclemart.user.entity.User;
import com.recirclemart.user.repository.UserRepository;
import com.recirclemart.exception.ResourceNotFoundException;
import com.recirclemart.notification.service.NotificationService;
import com.recirclemart.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityUtil.getCurrentEmail();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    // GET /api/notifications
    @GetMapping
    public ResponseEntity<?> getUserNotifications() {
        User me = getCurrentUser();
        return ResponseEntity.ok(Map.of(
                "notifications", notificationService.getUserNotifications(me.getId())));
    }

    // GET /api/notifications/unread/count
    @GetMapping("/unread/count")
    public ResponseEntity<?> getUnreadCount() {
        User me = getCurrentUser();
        return ResponseEntity.ok(Map.of(
                "unreadCount", notificationService.getUnreadCount(me.getId())));
    }

    // PUT /api/notifications/{id}/read
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Integer id) {
        User me = getCurrentUser();
        notificationService.markAsRead(me.getId(), id);
        return ResponseEntity.ok(Map.of("message", "Notification marked as read"));
    }

    // PUT /api/notifications
    @PutMapping
    public ResponseEntity<?> markAllAsRead() {
        User me = getCurrentUser();
        notificationService.markAllAsRead(me.getId());
        return ResponseEntity.ok(Map.of("message", "All notifications marked as read"));
    }

    // DELETE /api/notifications/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable Integer id) {
        User me = getCurrentUser();
        notificationService.deleteNotification(me.getId(), id);
        return ResponseEntity.ok(Map.of("message", "Notification deleted"));
    }
}
