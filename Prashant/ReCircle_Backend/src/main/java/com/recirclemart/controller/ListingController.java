package com.recirclemart.controller;

import com.recirclemart.dtos.*;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;
import com.recirclemart.repository.UserRepository;
import com.recirclemart.service.ListingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/listings")
public class ListingController {

    @Autowired
    private ListingService listingService;

    @Autowired
    private UserRepository userRepository;

    /* ===================== CREATE ===================== */

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<CreateListingResponse> create(
            @ModelAttribute Listing listing,
            @RequestParam(required = false) List<MultipartFile> images,
            Principal principal) throws Exception {

        User seller = userRepository.findByEmail(principal.getName()).orElseThrow();
        listing.setSeller(seller);

        return ResponseEntity.ok(listingService.createListing(listing, images));
    }

    /* ===================== PUBLIC ===================== */

    @GetMapping
    public ResponseEntity<List<ListingCardDTO>> getAll() {
        return ResponseEntity.ok(listingService.getAllListingsCards());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListingDetailDTO> getOne(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.getSingleListing(id));
    }

    /* ===================== SELLER ===================== */

    @GetMapping("/user/me")
    public ResponseEntity<List<ListingCardDTO>> myListings(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return ResponseEntity.ok(listingService.getMyListings(user.getId()));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<ListingCardDTO>> userListings(@PathVariable Integer id) {
        return ResponseEntity.ok(listingService.getUserListingsById(id));
    }

    /* ===================== UPDATE / DELETE ===================== */

    @PutMapping("/{id}")
    public ResponseEntity<ApiMessageResponse> update(
            @PathVariable Integer id,
            @RequestBody Listing updated,
            Principal principal) {

        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return ResponseEntity.ok(listingService.updateListing(id, user.getId(), updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiMessageResponse> delete(
            @PathVariable Integer id,
            Principal principal) {

        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return ResponseEntity.ok(listingService.deleteListing(id, user.getId()));
    }

    /* ===================== SEARCH ===================== */

    @GetMapping("/search")
    public ResponseEntity<List<Listing>> search(@RequestParam String q) {
        return ResponseEntity.ok(listingService.search(q));
    }
}