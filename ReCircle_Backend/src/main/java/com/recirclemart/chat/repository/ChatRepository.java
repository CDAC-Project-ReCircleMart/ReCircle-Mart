package com.recirclemart.chat.repository;

import com.recirclemart.chat.entity.Chat;
import com.recirclemart.listing.entity.Listing;
import com.recirclemart.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Integer> {

	
	Optional<Chat> findByListingAndBuyerAndSeller(Listing listing, User buyer, User seller);

	
	List<Chat> findByBuyerOrSeller(User buyer, User seller);

	
	List<Chat> findByListing(Listing listing);

	@Query("""
			SELECT c FROM Chat c
			WHERE c.listing.id = :listingId
			AND (
			(c.buyer.id = :buyerId AND c.seller.id = :sellerId)
			OR (c.buyer.id = :sellerId AND c.seller.id = :buyerId)
			)
			""")
	Optional<Chat> findExisting(@Param("listingId") Integer listingId,
			@Param("buyerId") Integer buyerId,
			@Param("sellerId") Integer sellerId);

	
	
	@Modifying
	
	void deleteByListingId(@Param("listingId") Integer listingId);
}
