package com.recirclemart.repository;

import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ListingRepository extends JpaRepository<Listing, Integer> {

    // Home page listings
    List<Listing> findAllByOrderByCreatedAtDesc();

    // By seller
    List<Listing> findBySeller(User seller);

    // By category / subcategory
    List<Listing> findByCategory(String category);
    List<Listing> findByCategoryAndSubcategory(String category, String subcategory);

    // Search (title LIKE %keyword%)
    List<Listing> findByTitleContainingIgnoreCase(String keyword);

    // Admin dashboard
    @Query("SELECT COUNT(l) FROM Listing l")
    long countTotalListings();
}
