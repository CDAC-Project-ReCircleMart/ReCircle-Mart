package com.recirclemart.admin.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recirclemart.admin.dto.request.AdminEventCreateRequest;
import com.recirclemart.admin.dto.request.AdminUserUpdateRequest;
import com.recirclemart.admin.dto.response.AdminEventResponse;
import com.recirclemart.admin.dto.response.DashboardStatsResponse;
import com.recirclemart.admin.dto.view.CategoryChartPoint;
import com.recirclemart.admin.dto.view.UsersListingsChartResponse;
import com.recirclemart.admin.dto.view.VisitsChartPoint;
import com.recirclemart.admin.service.AdminService;
import com.recirclemart.listing.dto.request.UpdateListingStatusRequest;
import com.recirclemart.user.dto.response.UsersListResponse;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

  

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    

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

    

    @GetMapping("/users")
    public ResponseEntity<UsersListResponse> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> updateUser(@PathVariable Integer id,
            @RequestBody AdminUserUpdateRequest req) {
        adminService.updateUser(id, req);
        return ResponseEntity.ok(Map.of("message", "User updated successfully"));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Integer id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

   

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
