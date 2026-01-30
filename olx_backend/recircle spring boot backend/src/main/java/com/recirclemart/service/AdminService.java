package com.recirclemart.service;

import com.recirclemart.entity.*;
import com.recirclemart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired private UserRepository userRepository;
    @Autowired private ListingRepository listingRepository;
    @Autowired private VisitRepository visitRepository;
    @Autowired private AdminEventRepository adminEventRepository;

    public Map<String, Object> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.countTotalUsers());
        stats.put("totalListings", listingRepository.countTotalListings());
        stats.put("totalVisitsToday", visitRepository.countTodayVisits());

        return stats;
    }

    public AdminEvent createEvent(AdminEvent event) {
        return adminEventRepository.save(event);
    }

    public List<AdminEvent> getAllEvents() {
        return adminEventRepository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteEvent(Integer id) {
        adminEventRepository.deleteById(id);
    }
}
