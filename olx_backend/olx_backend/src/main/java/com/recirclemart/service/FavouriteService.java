package com.recirclemart.service;

import com.recirclemart.entity.*;
import com.recirclemart.repository.FavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouriteService {

    @Autowired private FavouriteRepository favouriteRepository;

    public Favourite addFavourite(User user, Listing listing) {
        if (favouriteRepository.existsByUserAndListing(user, listing)) {
            throw new RuntimeException("Already favourited");
        }

        Favourite fav = Favourite.builder()
                .user(user)
                .listing(listing)
                .build();

        return favouriteRepository.save(fav);
    }

    public void removeFavourite(User user, Listing listing) {
        favouriteRepository.deleteByUserAndListing(user, listing);
    }

    public List<Favourite> getUserFavourites(User user) {
        return favouriteRepository.findByUser(user);
    }
}
