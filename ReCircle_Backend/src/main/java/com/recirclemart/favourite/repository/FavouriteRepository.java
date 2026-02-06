// repository/FavouriteRepository.java
package com.recirclemart.favourite.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.recirclemart.favourite.entity.Favourite;

import java.util.List;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {

    
    @Modifying
    @Query(value = "INSERT IGNORE INTO favourites (user_id, listing_id) VALUES (:userId, :listingId)", nativeQuery = true)
    int insertIgnore(@Param("userId") Integer userId, @Param("listingId") Integer listingId);

    @Modifying
    @Query(value = "DELETE FROM favourites WHERE user_id = :userId AND listing_id = :listingId", nativeQuery = true)
    int deleteByUserAndListing(@Param("userId") Integer userId, @Param("listingId") Integer listingId);

    @Query(value = """
            SELECT
              l.id as id,
              l.title as title,
              l.price as price,
              l.category as category,
              l.subcategory as subcategory,
              l.location as location,
              l.year as year,
              l.description as description,
              l.created_at as createdAt,
              (SELECT li.image_path
               FROM listing_images li
               WHERE li.listing_id = l.id
               LIMIT 1) as image
            FROM favourites f
            JOIN listings l ON f.listing_id = l.id
            WHERE f.user_id = :userId
            """, nativeQuery = true)
    List<FavouriteListingProjection> findMyFavourites(@Param("userId") Integer userId);

    
    interface FavouriteListingProjection {
        Integer getId();

        String getTitle();

        Double getPrice();

        String getCategory();

        String getSubcategory();

        String getLocation();

        Integer getYear();

        String getDescription();

        java.sql.Timestamp getCreatedAt();

        String getImage();
    }
}
