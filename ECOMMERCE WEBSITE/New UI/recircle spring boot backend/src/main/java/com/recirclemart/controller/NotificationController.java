package com.recirclemart.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recirclemart.entity.Notification;
import com.recirclemart.entity.User;
import com.recirclemart.repository.UserRepository;
import com.recirclemart.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<Notification> all(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return notificationService.getUserNotifications(user);
    }

    @GetMapping("/unread/count")
    public Map<String, Long> unreadCount(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return Map.of("unreadCount", notificationService.getUnreadCount(user));
    }

    @PutMapping("/{id}/read")
    public Map<String, String> markAsRead(@PathVariable Integer id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        notificationService.markAsRead(id, user);
        return Map.of("message", "Marked as read");
    }

    @PutMapping
    public Map<String, String> markAllAsRead(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        notificationService.markAllAsRead(user);
        return Map.of("message", "All marked as read");
    }

    @DeleteMapping("/{id}")
    public Map<String, String> delete(@PathVariable Integer id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        notificationService.deleteNotification(id, user);
        return Map.of("message", "Notification deleted");
    }
}
