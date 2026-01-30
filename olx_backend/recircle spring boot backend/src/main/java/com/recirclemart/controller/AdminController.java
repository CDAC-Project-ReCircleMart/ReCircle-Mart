package com.recirclemart.controller;

import com.recirclemart.entity.AdminEvent;
import com.recirclemart.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private AdminService adminService;

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return adminService.getDashboardStats();
    }

    @PostMapping("/events")
    public AdminEvent create(@RequestBody AdminEvent event) {
        return adminService.createEvent(event);
    }

    @GetMapping("/events")
    public List<AdminEvent> allEvents() {
        return adminService.getAllEvents();
    }

    @DeleteMapping("/events/{id}")
    public void delete(@PathVariable Integer id) {
        adminService.deleteEvent(id);
    }
}
