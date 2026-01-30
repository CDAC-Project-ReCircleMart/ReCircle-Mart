package com.recirclemart.service;

import com.recirclemart.entity.*;
import com.recirclemart.repository.*;
import com.recirclemart.util.FileUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ListingService {

    @Autowired private ListingRepository listingRepository;
    @Autowired private ListingImageRepository imageRepository;
    @Autowired private FileUtil fileUtil;

    public Listing createListing(Listing listing, List<MultipartFile> files) throws Exception {

        Listing saved = listingRepository.save(listing);

        if (files != null) {
            for (MultipartFile file : files) {
                String path = fileUtil.saveFile(file);

                ListingImage img = ListingImage.builder()
                        .listing(saved)
                        .imagePath(path)
                        .build();

                imageRepository.save(img);
            }
        }

        return saved;
    }

    public List<Listing> getAllListings() {
        return listingRepository.findAllByOrderByCreatedAtDesc();
    }

    public Listing getListing(Integer id) {
        return listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));
    }

    public List<Listing> getBySeller(User seller) {
        return listingRepository.findBySeller(seller);
    }

    public List<Listing> search(String keyword) {
        return listingRepository.findByTitleContainingIgnoreCase(keyword);
    }

    public void deleteListing(Integer id) {
        Listing listing = getListing(id);
        imageRepository.deleteByListing(listing);
        listingRepository.delete(listing);
    }
}
