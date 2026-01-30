package com.recirclemart.repository;

import com.recirclemart.dtos.AdminListingRow;
import com.recirclemart.dtos.CategoryChartPoint;
import com.recirclemart.dtos.ListingsChartPoint;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;

import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
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

	@Query(value = "select * from listings where status = 'approved'", nativeQuery = true)
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

	@Query(value = """
			SELECT COUNT(*) FROM listings WHERE DATE(created_at) = :today
			""", nativeQuery = true)
	long countToday(@Param("today") LocalDate today);

	@Query(value = """
			SELECT DATE(created_at) as date, COUNT(*) as listings
			FROM listings
			GROUP BY DATE(created_at)
			ORDER BY DATE(created_at)
			""", nativeQuery = true)
	List<ListingsChartPoint> listingsPerDay();

	@Query(value = """
			SELECT category as category, COUNT(*) as total
			FROM listings
			GROUP BY category
			""", nativeQuery = true)
	List<CategoryChartPoint> categoryCounts();

	@Query(value = """
			SELECT l.*,
			       CONCAT(u.first_name, ' ', u.last_name) AS sellerName,
			       u.email AS sellerEmail,
			       (SELECT image_path FROM listing_images WHERE listing_id = l.id LIMIT 1) AS image
			FROM listings l
			JOIN users u ON l.seller_id = u.id
			ORDER BY l.created_at DESC
			""", nativeQuery = true)
	List<AdminListingRow> adminListings();

	@Transactional
	@Modifying
	@Query(value = "UPDATE listings SET status = :status WHERE id = :id", nativeQuery = true)
	void updateStatus(@Param("id") Integer id, @Param("status") String status);

}
