package com.recirclemart.repository;

import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

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

    @Query(value = "select * from listings", nativeQuery = true)
    List<Listing> getAllId();
    
    
    // Admin dashboard
    @Query("SELECT COUNT(l) FROM Listing l")
    long countTotalListings();
    
    @Query(value = "SELECT * FROM listings ORDER BY created_at DESC", nativeQuery = true)
    List<Listing> findAllOrderByCreatedAtDesc();
    		// Node: ownership check
    		Optional<Listing> findByIdAndSeller_Id(Integer id, Integer sellerId);


    		// Node: getMyListings / seller listings
    		@Query(value = """
    		SELECT l.* FROM listings l
    		WHERE l.seller_id = :sellerId
    		ORDER BY l.created_at DESC
    		""", nativeQuery = true)
    		List<Listing> findBySellerIdOrderByCreatedAtDesc(@Param("sellerId") Integer sellerId);


    		// Optional search like your existing /search
    		@Query("""
    		SELECT l FROM Listing l
    		WHERE lower(l.title) LIKE lower(concat('%', :q, '%'))
    		OR lower(l.category) LIKE lower(concat('%', :q, '%'))
    		OR lower(l.subcategory) LIKE lower(concat('%', :q, '%'))
    		OR lower(l.location) LIKE lower(concat('%', :q, '%'))
    		ORDER BY l.createdAt DESC
    		""")
    		List<Listing> search(@Param("q") String q);
    
    
}
