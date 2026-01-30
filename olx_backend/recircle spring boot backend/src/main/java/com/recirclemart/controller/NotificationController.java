package com.recirclemart.controller;

import com.recirclemart.entity.*;
import com.recirclemart.service.NotificationService;
import com.recirclemart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired private NotificationService notificationService;
    @Autowired private UserRepository userRepository;

    @GetMapping
    public List<Notification> all(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return notificationService.getUserNotifications(user);
    }

    @GetMapping("/unread")
    public List<Notification> unread(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return notificationService.getUnread(user);
    }
}
