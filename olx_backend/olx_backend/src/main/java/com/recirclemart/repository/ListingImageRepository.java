package com.recirclemart.repository;

import com.recirclemart.entity.Listing;
import com.recirclemart.entity.ListingImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ListingImageRepository extends JpaRepository<ListingImage, Integer> {

    // Get all images for listing
    List<ListingImage> findByListing(Listing listing);

    // Delete when listing deleted
    void deleteByListing(Listing listing);
}
