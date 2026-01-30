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

    @Autowired private ListingService listingService;
    @Autowired private UserRepository userRepository;

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
