package com.recirclemart.repository;

import com.recirclemart.entity.Favourite;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavouriteRepository extends JpaRepository<Favourite, Integer> {

    // Check if already favourited
    Optional<Favourite> findByUserAndListing(User user, Listing listing);

    boolean existsByUserAndListing(User user, Listing listing);

    // Remove favourite
    void deleteByUserAndListing(User user, Listing listing);

    // Get all favourites of user
    List<Favourite> findByUser(User user);
}
