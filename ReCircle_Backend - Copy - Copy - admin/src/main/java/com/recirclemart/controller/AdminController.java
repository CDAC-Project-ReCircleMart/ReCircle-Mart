package com.recirclemart.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recirclemart.dtos.AdminEventCreateRequest;
import com.recirclemart.dtos.AdminEventResponse;
import com.recirclemart.dtos.AdminUserUpdateRequest;
import com.recirclemart.dtos.CategoryChartPoint;
import com.recirclemart.dtos.DashboardStatsResponse;
import com.recirclemart.dtos.UpdateListingStatusRequest;
import com.recirclemart.dtos.UsersListResponse;
import com.recirclemart.dtos.UsersListingsChartResponse;
import com.recirclemart.dtos.VisitsChartPoint;
import com.recirclemart.service.AdminService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /* ===================== DASHBOARD ===================== */

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    /* ===================== CHART APIS ===================== */

    @GetMapping("/chart/users-listings")
    public ResponseEntity<UsersListingsChartResponse> getUsersListingsChart() {
        return ResponseEntity.ok(adminService.getUsersListingsChart());
    }

    @GetMapping("/chart/visits")
    public ResponseEntity<List<VisitsChartPoint>> getVisitsChart() {
        return ResponseEntity.ok(adminService.getVisitsChart());
    }

    @GetMapping("/chart/categories")
    public ResponseEntity<List<CategoryChartPoint>> getCategoryChart() {
        return ResponseEntity.ok(adminService.getCategoryChart());
    }

    /* ===================== CALENDAR (EVENTS) ===================== */

    @GetMapping("/events")
    public ResponseEntity<List<AdminEventResponse>> getAllEvents() {
        return ResponseEntity.ok(adminService.getAllEvents());
    }

    @GetMapping("/events/by-date")
    public ResponseEntity<List<AdminEventResponse>> getEventsByDate(@RequestParam String date) {
        return ResponseEntity.ok(adminService.getEventsByDate(date));
    }

    @PostMapping("/events")
    public ResponseEntity<AdminEventResponse> addEvent(@RequestBody AdminEventCreateRequest req) {
        return ResponseEntity.ok(adminService.addEvent(req));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<Map<String, String>> deleteEvent(@PathVariable Integer id) {
        adminService.deleteEvent(id);
        return ResponseEntity.ok(Map.of("message", "Event deleted successfully"));
    }

    /* ===================== MANAGE USERS ===================== */

    @GetMapping("/users")
    public ResponseEntity<UsersListResponse> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> updateUser(@PathVariable Long id,
                                                         @RequestBody AdminUserUpdateRequest req) {
        adminService.updateUser(id, req);
        return ResponseEntity.ok(Map.of("message", "User updated successfully"));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    /* ===================== LISTINGS MANAGEMENT ===================== */

    @GetMapping("/listings")
    public ResponseEntity<Map<String, Object>> getAllListings() {
        return ResponseEntity.ok(Map.of("listings", adminService.getAllListings()));
    }

    @PutMapping("/listings/{id}/status")
    public ResponseEntity<Map<String, String>> updateListingStatus(@PathVariable Integer id,
                                                                   @RequestBody UpdateListingStatusRequest req) {
        adminService.updateListingStatus(id, req.status());
        return ResponseEntity.ok(Map.of("message", "Listing " + req.status() + " successfully"));
    }

    @DeleteMapping("/listings/{id}")
    public ResponseEntity<Map<String, String>> deleteListing(@PathVariable Integer id) {
        adminService.deleteListing(id);
        return ResponseEntity.ok(Map.of("message", "Listing deleted successfully"));
    }
}
