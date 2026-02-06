package com.recirclemart.admin.service;

import com.recirclemart.admin.dto.request.AdminEventCreateRequest;
import com.recirclemart.admin.dto.request.AdminUserUpdateRequest;
import com.recirclemart.admin.dto.response.AdminEventResponse;
import com.recirclemart.admin.dto.response.AdminListingRow;
import com.recirclemart.admin.dto.response.AdminUserRow;
import com.recirclemart.admin.dto.response.DashboardStatsResponse;
import com.recirclemart.admin.dto.view.CategoryChartPoint;
import com.recirclemart.admin.dto.view.ListingsChartPoint;
import com.recirclemart.admin.dto.view.UsersChartPoint;
import com.recirclemart.admin.dto.view.UsersListingsChartResponse;
import com.recirclemart.admin.dto.view.VisitsChartPoint;
import com.recirclemart.admin.entity.AdminEvent;
import com.recirclemart.admin.repository.AdminEventRepository;
import com.recirclemart.analytics.repository.VisitRepository;
import com.recirclemart.chat.repository.ChatRepository;
import com.recirclemart.listing.entity.Listing;
import com.recirclemart.listing.repository.ListingImageRepository;
import com.recirclemart.listing.repository.ListingRepository;
import com.recirclemart.notification.service.NotificationService;

import com.recirclemart.security.SecurityUtil;
import com.recirclemart.user.dto.response.UsersListResponse;
import com.recirclemart.user.entity.User;
import com.recirclemart.user.repository.UserKeyRepository;
import com.recirclemart.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.sql.Date;
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
    private final UserKeyRepository userKeyRepository;
    private final NotificationService notificationService;
    private final PasswordEncoder passwordEncoder;
    private final ChatRepository chatRepository ; 
    

    

    public DashboardStatsResponse getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalListings = listingRepository.count();
        long totalVisitsToday = visitRepository.countToday(LocalDate.now());
        long todayListings = listingRepository.countToday(LocalDate.now());

        return new DashboardStatsResponse(
                totalUsers,
                totalListings,
                totalVisitsToday,
                todayListings);
    }



    public UsersListingsChartResponse getUsersListingsChart() {
        List<UsersChartPoint> users = userRepository.usersPerDay();
        List<ListingsChartPoint> listings = listingRepository.listingsPerDay();
        return new UsersListingsChartResponse(users, listings);
    }

    
    public List<VisitsChartPoint> getVisitsChart() {
        return visitRepository.visitsPerDayRaw()
                .stream()
                .map(row -> new VisitsChartPoint(
                        ((Date) row[0]).toLocalDate(),
                        ((Number) row[1]).longValue()))
                .toList();
    }

    public List<CategoryChartPoint> getCategoryChart() {
        return listingRepository.categoryCounts();
    }

   

    public List<AdminEventResponse> getAllEvents() {
        return adminEventRepository.findAllByOrderByEventDateAsc()
                .stream()
                .map(AdminEventResponse::from)
                .toList();
    }

    public List<AdminEventResponse> getEventsByDate(String date) {
        LocalDate d = LocalDate.parse(date);
        return adminEventRepository.findByEventDateOrderByCreatedAt(d)
                .stream()
                .map(AdminEventResponse::from)
                .toList();
    }

    public AdminEventResponse addEvent(AdminEventCreateRequest req) {
        if (req.getTitle() == null || req.getTitle().isBlank()
                || req.getEventDate() == null || req.getEventDate().isBlank()) {
            throw new IllegalArgumentException("Title and date are required");
        }

        AdminEvent e = new AdminEvent();
        e.setTitle(req.getTitle());
        e.setEventDate(LocalDate.parse(req.getEventDate()));
        e.setDescription(req.getDescription());

        return AdminEventResponse.from(adminEventRepository.save(e));
    }

    public void deleteEvent(Integer id) {
        adminEventRepository.deleteById(id);
    }

    /* ===================== USERS ===================== */

    public UsersListResponse getAllUsers() {
        List<AdminUserRow> rows = userRepository.adminUsersWithListingCount();
        return new UsersListResponse(rows, rows.size(), 1, 1);
    }

    public void updateUser(Integer id, AdminUserUpdateRequest req) {
        if (req.firstName() == null || req.firstName().isBlank()
                || req.email() == null || req.email().isBlank()) {
            throw new IllegalArgumentException("First name and email are required");
        }

        User u = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        u.setFirstName(req.firstName());
        u.setLastName(req.lastName());
        u.setEmail(req.email());

        if (req.password() != null && !req.password().isBlank()) {
            u.setPassword(passwordEncoder.encode(req.password()));
        }

        if (req.role() != null && !req.role().isBlank()) {
            u.setRole(req.role());
        }

        userRepository.save(u);
    }

    
    @Transactional
    public void deleteUser(Integer id) {

        User currentUser = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (currentUser.getId().equals(id)) {
            throw new IllegalArgumentException("You cannot delete yourself");
        }

//        userKeyRepository.deleteByUserId(id); // 
//        userRepository.deleteById(id); //
        
        User target = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Cant delete this user"));
        
        target.setActive(false);

        

        userRepository.save(currentUser);
    }

    /* ===================== LISTINGS ===================== */

    public List<AdminListingRow> getAllListings() {
        return listingRepository.adminListings();
    }

    
    @Transactional
    public void deleteListing(Integer id) {
    	
        listingImageRepository.deleteByListingId(id);
        listingRepository.deleteById(id);
    }

    public void updateListingStatus(Integer id, String status) {

        if (!List.of("pending", "approved", "rejected").contains(status)) {
            throw new IllegalArgumentException("Invalid status");
        }

        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Listing not found"));

        listingRepository.updateStatus(id, status);

        if ("approved".equals(status)) {
            notificationService.createNotification(
                    listing.getSeller().getId(),
                    "product_approved",
                    status,
                    "Your product " + listing.getTitle() + " has been approved.",
                    listing.getId(),
                    null);
        } else if ("rejected".equals(status)) {
            notificationService.createNotification(
                    listing.getSeller().getId(),
                    "product_rejected",
                    status,
                    "Your product " + listing.getTitle() + " has been rejected.",
                    listing.getId(),
                    null);
        }
    }
}