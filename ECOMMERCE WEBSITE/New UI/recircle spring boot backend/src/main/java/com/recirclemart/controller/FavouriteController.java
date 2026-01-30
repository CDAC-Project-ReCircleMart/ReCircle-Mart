package com.recirclemart.controller;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recirclemart.entity.Favourite;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.ListingImage;
import com.recirclemart.entity.User;
import com.recirclemart.repository.ListingImageRepository;
import com.recirclemart.repository.ListingRepository;
import com.recirclemart.repository.UserRepository;
import com.recirclemart.service.FavouriteService;

@RestController
@RequestMapping("/api/favourites")
public class FavouriteController {

    @Autowired
    private FavouriteService favouriteService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private ListingImageRepository listingImageRepository;

    // POST /favourites with path variable (existing)
    @PostMapping("/{listingId}")
    public Favourite add(@PathVariable Integer listingId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();
        return favouriteService.addFavourite(user, listing);
    }

    // POST /favourites with JSON body { listingId }
    @PostMapping
    public Map<String, String> addByBody(@RequestBody Map<String, Integer> body, Principal principal) {
        Integer listingId = body.get("listingId");
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();
        favouriteService.addFavourite(user, listing);
        return Map.of("message", "Added to favourites");
    }

    @DeleteMapping("/{listingId}")
    public Map<String, String> remove(@PathVariable Integer listingId, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();
        favouriteService.removeFavourite(user, listing);
        return Map.of("message", "Removed from favourites");
    }

    // Return flattened listings (like Node: include first image as 'image')
    @GetMapping
    public List<Map<String, Object>> myFavourites(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Favourite> favs = favouriteService.getUserFavourites(user);

        return favs.stream().map(f -> {
            Listing l = f.getListing();
            Map<String, Object> m = new java.util.HashMap<>();
            m.put("id", l.getId());
            m.put("title", l.getTitle());
            m.put("price", l.getPrice());
            m.put("category", l.getCategory());
            m.put("subcategory", l.getSubcategory());
            m.put("location", l.getLocation());
            m.put("year", l.getYear());
            m.put("description", l.getDescription());
            m.put("seller_id", l.getSeller().getId());
            m.put("created_at", l.getCreatedAt() == null ? null : l.getCreatedAt().toString());

            List<ListingImage> imgs = listingImageRepository.findByListing(l);
            m.put("image", imgs.isEmpty() ? null : imgs.get(0).getImagePath());

            return m;
        }).toList();
    }
}
