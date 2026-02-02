package com.recirclemart.favourite.service;
// service/FavouriteService.java

import com.recirclemart.favourite.repository.FavouriteRepository;
import com.recirclemart.listing.dto.response.FavouriteListingResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavouriteService {

    private final FavouriteRepository favouriteRepository;

    @Transactional
    public void addFavourite(Integer userId, Integer listingId) {
        favouriteRepository.insertIgnore(userId, listingId);
    }

    @Transactional
    public void removeFavourite(Integer userId, Integer listingId) {
        favouriteRepository.deleteByUserAndListing(userId, listingId);
    }

    @Transactional(readOnly = true)
    public List<FavouriteListingResponse> getMyFavourites(Integer userId) {
        return favouriteRepository.findMyFavourites(userId)
                .stream()
                .map(p -> FavouriteListingResponse.builder()
                        .id(p.getId())
                        .title(p.getTitle())
                        .price(p.getPrice())
                        .category(p.getCategory())
                        .subcategory(p.getSubcategory())
                        .location(p.getLocation())
                        .year(p.getYear())
                        .description(p.getDescription())
                        .createdAt(p.getCreatedAt() == null ? null : p.getCreatedAt().toLocalDateTime())
                        .image(p.getImage())
                        .build())
                .toList();
    }
}
