package com.recirclemart.repository;

import com.recirclemart.entity.Chat;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

    // Prevent duplicate chat for same listing + buyer + seller
    Optional<Chat> findByListingAndBuyerAndSeller(Listing listing, User buyer, User seller);

    // Get all chats of a user (buyer or seller)
    List<Chat> findByBuyerOrSeller(User buyer, User seller);

    // Admin / debug
    List<Chat> findByListing(Listing listing);
}
