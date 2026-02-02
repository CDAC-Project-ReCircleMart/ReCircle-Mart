package com.recirclemart.listing.service;

import com.recirclemart.common.dto.ApiMessageResponse;

import com.recirclemart.listing.dto.response.CreateListingResponse;
import com.recirclemart.listing.dto.response.ListingCardDTO;
import com.recirclemart.listing.dto.response.ListingDetailDTO;
import com.recirclemart.listing.entity.Listing;
import com.recirclemart.listing.entity.ListingImage;
import com.recirclemart.listing.repository.ListingImageRepository;
import com.recirclemart.listing.repository.ListingRepository;
import com.recirclemart.user.entity.User;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.*;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final ListingImageRepository listingImageRepository;

    private final Path uploadDir = Paths.get("uploads");

    public ListingService(ListingRepository listingRepository,
            ListingImageRepository listingImageRepository) {
        this.listingRepository = listingRepository;
        this.listingImageRepository = listingImageRepository;
    }

    /* ===================== CREATE ===================== */

    @Transactional
    public CreateListingResponse createListing(Listing listing, List<MultipartFile> images) throws Exception {
        Listing saved = listingRepository.save(listing);

        List<String> imagePaths = storeFiles(images);
        for (String path : imagePaths) {
            ListingImage li = new ListingImage();
            li.setListing(saved);
            li.setImagePath(path);
            listingImageRepository.save(li);
        }

        return new CreateListingResponse("Listing created successfully", saved.getId());
    }

    /* ===================== PUBLIC (APPROVED ONLY) ===================== */

    public List<ListingCardDTO> getAllListingsCards() {
        List<Listing> listings = listingRepository.findApprovedListings();
        List<ListingCardDTO> out = new ArrayList<>();

        for (Listing l : listings) {
            String firstImage = listingImageRepository.findFirstImagePath(l.getId());
            out.add(toCardDTO(l, firstImage));
        }
        return out;
    }

    /* ===================== SELLER ===================== */

    public List<ListingCardDTO> getMyListings(Integer userId) {
        List<Listing> listings = listingRepository.findBySellerIdOrderByCreatedAtDesc(userId);
        List<ListingCardDTO> out = new ArrayList<>();

        for (Listing l : listings) {
            String firstImage = listingImageRepository.findFirstImagePath(l.getId());
            out.add(toCardDTO(l, firstImage));
        }
        return out;
    }

    public List<ListingCardDTO> getUserListingsById(Integer sellerId) {
        return getMyListings(sellerId);
    }

    /* ===================== DETAILS ===================== */

    public ListingDetailDTO getSingleListing(Integer id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        List<String> images = listingImageRepository.findPathsByListingId(id);
        User seller = listing.getSeller();

        return new ListingDetailDTO(
                listing.getId(),
                listing.getTitle(),
                listing.getPrice(),
                listing.getCategory(),
                listing.getSubcategory(),
                listing.getLocation(),
                listing.getYear(),
                listing.getDescription(),
                seller.getId(),
                listing.getCreatedAt(),
                images,
                new ListingDetailDTO.SellerDTO(
                        seller.getId(),
                        seller.getFirstName(),
                        seller.getAvatar()));
    }

    /* ===================== UPDATE ===================== */

    @Transactional
    public ApiMessageResponse updateListing(Integer listingId, Integer userId, Listing updated) {
        Listing listing = listingRepository.findByIdAndSeller_Id(listingId, userId)
                .orElseThrow(() -> new RuntimeException("Not allowed"));

        listing.setTitle(updated.getTitle());
        listing.setPrice(updated.getPrice());
        listing.setCategory(updated.getCategory());
        listing.setSubcategory(updated.getSubcategory());
        listing.setLocation(updated.getLocation());
        listing.setYear(updated.getYear());
        listing.setDescription(updated.getDescription());

        listingRepository.save(listing);
        return new ApiMessageResponse("Listing updated successfully");
    }

    /* ===================== DELETE ===================== */

    @Transactional
    public ApiMessageResponse deleteListing(Integer listingId, Integer userId) {
        Listing listing = listingRepository.findByIdAndSeller_Id(listingId, userId)
                .orElseThrow(() -> new RuntimeException("Not allowed"));

        listingImageRepository.deleteByListingId(listingId);
        listingRepository.delete(listing);

        return new ApiMessageResponse("Listing deleted successfully");
    }

    /* ===================== SEARCH ===================== */

    public List<Listing> search(String q) {
        return listingRepository.search(q);
    }

    /* ===================== HELPERS ===================== */

    private ListingCardDTO toCardDTO(Listing l, String firstImage) {
        return new ListingCardDTO(
                l.getId(),
                l.getTitle(),
                l.getPrice(),
                l.getCategory(),
                l.getSubcategory(),
                l.getLocation(),
                l.getYear(),
                l.getDescription(),
                l.getSeller().getId(),
                l.getCreatedAt(),
                firstImage);
    }

    private List<String> storeFiles(List<MultipartFile> images) throws Exception {
        if (images == null || images.isEmpty())
            return Collections.emptyList();

        if (!Files.exists(uploadDir))
            Files.createDirectories(uploadDir);

        List<String> paths = new ArrayList<>();
        for (MultipartFile file : images) {
            if (file == null || file.isEmpty())
                continue;

            String safeName = UUID.randomUUID() + "_" +
                    Objects.requireNonNull(file.getOriginalFilename()).replaceAll("\\s+", "_");

            Path target = uploadDir.resolve(safeName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            paths.add("/uploads/" + safeName);
        }
        return paths;
    }
}