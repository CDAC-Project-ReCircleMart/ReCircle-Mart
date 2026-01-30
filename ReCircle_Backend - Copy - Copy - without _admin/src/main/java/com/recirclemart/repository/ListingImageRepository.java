package com.recirclemart.repository;

import com.recirclemart.entity.ListingImage;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ListingImageRepository extends JpaRepository<ListingImage, Integer> {

    @Query(value = """
        SELECT image_path
        FROM listing_images
        WHERE listing_id = :listingId
        ORDER BY id ASC
        LIMIT 1
    """, nativeQuery = true)
    String findFirstImagePath(@Param("listingId") Integer listingId);

    @Query(value = """
        SELECT image_path
        FROM listing_images
        WHERE listing_id = :listingId
    """, nativeQuery = true)
    List<String> findPathsByListingId(@Param("listingId") Integer listingId);

    @Modifying
    @Query("DELETE FROM ListingImage li WHERE li.listing.id = :listingId")
    void deleteByListingId(@Param("listingId") Integer listingId);
}