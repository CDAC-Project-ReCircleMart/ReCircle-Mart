package com.recirclemart.controller;

import com.recirclemart.entity.*;
import com.recirclemart.service.FavouriteService;
import com.recirclemart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/favourites")
public class FavouriteController {

    @Autowired private FavouriteService favouriteService;
    @Autowired private UserRepository userRepository;
    @Autowired private ListingRepository listingRepository;

    @PostMapping("/{listingId}")
    public Favourite add(@PathVariable Integer listingId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();
        return favouriteService.addFavourite(user, listing);
    }

    @DeleteMapping("/{listingId}")
    public void remove(@PathVariable Integer listingId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();
        favouriteService.removeFavourite(user, listing);
    }

    @GetMapping
    public List<Favourite> myFavourites(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return favouriteService.getUserFavourites(user);
    }
}
