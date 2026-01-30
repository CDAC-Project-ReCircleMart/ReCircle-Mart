package com.recirclemart.controller;

import com.recirclemart.entity.*;
import com.recirclemart.service.ListingService;
import com.recirclemart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping
    public Listing create(@ModelAttribute Listing listing,
            @RequestParam(required = false) List<MultipartFile> images,
            Principal principal) throws Exception {

        User seller = userRepository.findByEmail(principal.getName()).orElseThrow();
        listing.setSeller(seller);

        return listingService.createListing(listing, images);
    }

    @GetMapping
    public List<Listing> getAll() {
        return listingService.getAllListings();
    }

    @GetMapping("/{id}")
    public Listing getOne(@PathVariable Integer id) {
        return listingService.getListing(id);
    }

    // Get my listings (frontend expects /listings/my)
    @GetMapping("/my")
    public List<Listing> myListings(Principal principal) {
        User seller = userRepository.findByEmail(principal.getName()).orElseThrow();
        return listingService.getBySeller(seller);
    }

    // Public: get listings of seller by id (frontend uses /listings/user/:id)
    @GetMapping("/user/{id}")
    public List<Listing> userListings(@PathVariable Integer id) {
        User seller = userRepository.findById(id).orElseThrow();
        return listingService.getBySeller(seller);
    }

    // Convenience: /listings/user/me to get logged in user's listings
    @GetMapping("/user/me")
    public List<Listing> myListingsAlias(Principal principal) {
        User seller = userRepository.findByEmail(principal.getName()).orElseThrow();
        return listingService.getBySeller(seller);
    }

    @GetMapping("/seller/{sellerId}")
    public List<Listing> bySeller(@PathVariable Integer sellerId) {
        User seller = userRepository.findById(sellerId).orElseThrow();
        return listingService.getBySeller(seller);
    }

    @GetMapping("/search")
    public List<Listing> search(@RequestParam String q) {
        return listingService.search(q);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        listingService.deleteListing(id);
    }
}
