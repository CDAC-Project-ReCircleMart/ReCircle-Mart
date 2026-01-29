package com.recirclemart.repository;

import com.recirclemart.entity.Listing;
import com.recirclemart.entity.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

//
//public interface ListingImageRepository extends JpaRepository<ListingImage, Integer> {
//
//    // Get all images for listing
//    List<ListingImage> findByListing(Listing listing);
//
//    // Delete when listing deleted
//    void deleteByListing(Listing listing);
//}
public interface ListingImageRepository extends JpaRepository<ListingImage, Integer> {

	@Query(value = """
			SELECT image_path FROM listing_images
			WHERE listing_id = :listingId
			""", nativeQuery = true)
	List<String> findPathsByListingId(@Param("listingId") Integer listingId);

	@Query(value = """
			SELECT image_path FROM listing_images
			WHERE listing_id = :listingId
			LIMIT 1
			""", nativeQuery = true)
	String findFirstImagePath(@Param("listingId") Integer listingId);

	@Modifying
	@Query(value = "DELETE FROM listing_images WHERE listing_id = :listingId", nativeQuery = true)
	void deleteByListingId(@Param("listingId") Integer listingId);
}