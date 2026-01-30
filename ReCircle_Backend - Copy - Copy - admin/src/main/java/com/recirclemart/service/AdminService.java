package com.recirclemart.service;


import com.recirclemart.dtos.AdminEventCreateRequest;
import com.recirclemart.dtos.AdminEventResponse;
import com.recirclemart.dtos.AdminListingRow;
import com.recirclemart.dtos.AdminUserRow;
import com.recirclemart.dtos.AdminUserUpdateRequest;
import com.recirclemart.dtos.CategoryChartPoint;
import com.recirclemart.dtos.DashboardStatsResponse;
import com.recirclemart.dtos.ListingsChartPoint;
import com.recirclemart.dtos.UsersChartPoint;
import com.recirclemart.dtos.UsersListResponse;
import com.recirclemart.dtos.UsersListingsChartResponse;
import com.recirclemart.dtos.VisitsChartPoint;
import com.recirclemart.entity.AdminEvent;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;
import com.recirclemart.repository.*;
import com.recirclemart.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final ListingRepository listingRepository;
    private final VisitRepository visitRepository;
    private final AdminEventRepository adminEventRepository;
    private final ListingImageRepository listingImageRepository;
    private final NotificationService notificationService;

    private final PasswordEncoder passwordEncoder;

    /* ===================== DASHBOARD ===================== */

    public DashboardStatsResponse getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalListings = listingRepository.count();
        long totalVisitsToday = visitRepository.countToday(LocalDate.now());
        long todayListings = listingRepository.countToday(LocalDate.now());

        return new DashboardStatsResponse(totalUsers, totalListings, totalVisitsToday, todayListings);
    }

    /* ===================== CHART APIS ===================== */

    public UsersListingsChartResponse getUsersListingsChart() {
        List<UsersChartPoint> users = userRepository.usersPerDay();
        List<ListingsChartPoint> listings = listingRepository.listingsPerDay();
        return new UsersListingsChartResponse(users, listings);
    }

    public List<VisitsChartPoint> getVisitsChart() {
        return visitRepository.visitsPerDay();
    }

    public List<CategoryChartPoint> getCategoryChart() {
        return listingRepository.categoryCounts();
    }

    /* ===================== EVENTS ===================== */

    public List<AdminEventResponse> getAllEvents() {
        return adminEventRepository.findAllByOrderByEventDateAsc()
                .stream().map(AdminEventResponse::from).toList();
    }

    public List<AdminEventResponse> getEventsByDate(String date) {
        LocalDate d = LocalDate.parse(date);
        return adminEventRepository.findByEventDateOrderByCreatedAt(d)
                .stream().map(AdminEventResponse::from).toList();
    }

    public AdminEventResponse addEvent(AdminEventCreateRequest req) {
        if (req.title() == null || req.title().isBlank() || req.eventDate() == null || req.eventDate().isBlank()) {
            throw new IllegalArgumentException("Title and date are required");
        }

        AdminEvent e = new AdminEvent();
        e.setTitle(req.title());
        e.setEventDate(LocalDate.parse(req.eventDate()));
        e.setDescription(req.description());

        AdminEvent saved = adminEventRepository.save(e);
        return AdminEventResponse.from(saved);
    }

    public void deleteEvent(Integer id) {
        adminEventRepository.deleteById(id);
    }

    /* ===================== USERS ===================== */

    public UsersListResponse getAllUsers() {
        List<AdminUserRow> rows = userRepository.adminUsersWithListingCount();
        return new UsersListResponse(rows, rows.size(), 1, 1);
    }

    public void updateUser(Long id, AdminUserUpdateRequest req) {
        // Required validation like your Node code
        if (req.firstName() == null || req.firstName().isBlank() || req.email() == null || req.email().isBlank()) {
            throw new IllegalArgumentException("First name and email are required");
        }

        User u = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + id));

        u.setFirstName(req.firstName());
        u.setLastName(req.lastName());
        u.setEmail(req.email());

        if (req.password() != null && !req.password().trim().isEmpty()) {
            u.setPassword(passwordEncoder.encode(req.password().trim()));
        }

        if (req.role() != null && !req.role().isBlank()) {
            u.setRole(req.role());
        }

        userRepository.save(u);
    }

    public void deleteUser(Long id) {
        // Equivalent to: if (Number(id) === req.user.id) block
        Long currentUserId = getCurrentUserIdOrNull();
        if (currentUserId != null && currentUserId.equals(id)) {
            throw new IllegalArgumentException("You cannot delete yourself");
        }
        userRepository.deleteById(id);
    }

    private Long getCurrentUserIdOrNull() {
        // You must set this in your JWT auth filter (e.g., principal contains id)
        // If you don’t yet have it, return null for now.
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserPrincipal p) return p.id();
        return null;
    }

    /* ===================== LISTINGS ===================== */

    public List<AdminListingRow> getAllListings() {
        return listingRepository.adminListings();
    }

    public void deleteListing(Integer id) {
        listingImageRepository.deleteByListingId(id);
        listingRepository.deleteById(id);
    }

    public void updateListingStatus(Integer id, String status) {
        if (!List.of("pending", "approved", "rejected").contains(status)) {
            throw new IllegalArgumentException("Invalid status value");
        }

        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found"));

        listingRepository.updateStatus(Long.parseLong(id+""), status);

        // notification logic like your Node code
        if ("approved".equals(status)) {
            notificationService.createNotification(null, status, status, status, null, null);
        } else if ("rejected".equals(status)) {
            notificationService.createNotification(null, status, status, status, null, null);
        }
    }

    /* Dummy principal record (replace with your real one) */
    public record UserPrincipal(Long id) {}
}
