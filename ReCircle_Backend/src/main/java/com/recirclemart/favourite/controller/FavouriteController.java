// controller/FavouriteController.java
package com.recirclemart.favourite.controller;

import com.recirclemart.common.dto.ApiResponse;
import com.recirclemart.favourite.dto.request.FavouriteRequest;
import com.recirclemart.favourite.service.FavouriteService;
import com.recirclemart.listing.dto.response.FavouriteListingResponse;
import com.recirclemart.security.SecurityUtil;
import com.recirclemart.user.entity.User;
import com.recirclemart.user.repository.UserRepository;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favourites")
@RequiredArgsConstructor
public class FavouriteController {

    private final FavouriteService favouriteService;

    private final UserRepository userRepository;

    // POST /api/favourites (heart click)
    @PostMapping
    public ResponseEntity<ApiResponse> addFavourite(@Valid @RequestBody FavouriteRequest req,
            Authentication auth) {
        User req_buyer = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Integer userId = req_buyer.getId();
        favouriteService.addFavourite(userId, req.getListingId());
        return ResponseEntity.ok(new ApiResponse("Added to favourites"));
    }

    // DELETE /api/favourites/{listingId}
    @DeleteMapping("/{listingId}")
    public ResponseEntity<ApiResponse> removeFavourite(@PathVariable Integer listingId,
            Authentication auth) {
        User req_buyer = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Integer userId = req_buyer.getId();
        favouriteService.removeFavourite(userId, listingId);
        return ResponseEntity.ok(new ApiResponse("Removed from favourites"));
    }

    // GET /api/favourites
    @GetMapping
    public ResponseEntity<List<FavouriteListingResponse>> getMyFavourites(Authentication auth) {

        User req_buyer = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        Integer userId = req_buyer.getId();
        return ResponseEntity.ok(favouriteService.getMyFavourites(userId));
    }
}
