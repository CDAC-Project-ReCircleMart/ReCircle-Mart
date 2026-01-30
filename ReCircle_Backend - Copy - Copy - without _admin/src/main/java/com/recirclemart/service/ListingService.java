package com.recirclemart.service;

import com.recirclemart.dtos.*;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.ListingImage;
import com.recirclemart.entity.User;
import com.recirclemart.repository.ListingImageRepository;
import com.recirclemart.repository.ListingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.*;
import java.util.*;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final ListingImageRepository listingImageRepository;

    // ✅ SINGLE STANDARD DIRECTORY
    // uploads/
    private final Path uploadDir = Paths.get("uploads");

    public ListingService(
            ListingRepository listingRepository,
            ListingImageRepository listingImageRepository
    ) {
        this.listingRepository = listingRepository;
        this.listingImageRepository = listingImageRepository;
    }

    // ================= CREATE LISTING =================
    @Transactional
    public CreateListingResponse createListing(
            Listing listing,
            List<MultipartFile> images
    ) throws Exception {

        // 1️⃣ Save listing first
        Listing savedListing = listingRepository.save(listing);

        // 2️⃣ Save images and DB rows
        List<String> imagePaths = storeFiles(images);

        for (String path : imagePaths) {
            ListingImage img = new ListingImage();
            img.setListing(savedListing);
            img.setImagePath(path); // "/uploads/uuid.jpg"
            listingImageRepository.save(img);
        }

        return new CreateListingResponse(
                "Listing created successfully",
                savedListing.getId()
        );
    }

    // ================= HOME PAGE =================
    public List<ListingCardDTO> getAllListingsCards() {
        List<Listing> listings =
                listingRepository.findAllOrderByCreatedAtDesc();

        List<ListingCardDTO> cards = new ArrayList<>();

        for (Listing listing : listings) {
            String firstImage =
                    listingImageRepository.findFirstImagePath(listing.getId());

            cards.add(toCardDTO(listing, firstImage));
        }
        return cards;
    }

    // ================= MY LISTINGS =================
    public List<ListingCardDTO> getMyListings(Integer userId) {
        List<Listing> listings =
                listingRepository.findBySellerIdOrderByCreatedAtDesc(userId);

        List<ListingCardDTO> cards = new ArrayList<>();

        for (Listing listing : listings) {
            String firstImage =
                    listingImageRepository.findFirstImagePath(listing.getId());

            cards.add(toCardDTO(listing, firstImage));
        }
        return cards;
    }

    // ================= SELLER LISTINGS =================
    public List<ListingCardDTO> getUserListingsById(Integer sellerId) {
        return getMyListings(sellerId);
    }

    // ================= PRODUCT DETAIL =================
    public ListingDetailDTO getSingleListing(Integer id) {

        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        List<String> images =
                listingImageRepository.findPathsByListingId(id);

        User seller = listing.getSeller();

        ListingDetailDTO.SellerDTO sellerDTO =
                new ListingDetailDTO.SellerDTO(
                        seller.getId(),
                        seller.getFirstName(),
                        seller.getAvatar()
                );

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
                sellerDTO
        );
    }

    // ================= UPDATE LISTING =================
    @Transactional
    public ApiMessageResponse updateListing(
            Integer listingId,
            Integer userId,
            Listing updated
    ) {

        Listing listing =
                listingRepository.findByIdAndSeller_Id(listingId, userId)
                        .orElseThrow(() ->
                                new RuntimeException("Not allowed to update this listing")
                        );

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

    // ================= DELETE LISTING =================
    @Transactional
    public ApiMessageResponse deleteListing(Integer listingId, Integer userId) {

        Listing listing =
                listingRepository.findByIdAndSeller_Id(listingId, userId)
                        .orElseThrow(() ->
                                new RuntimeException("Not allowed to delete this listing")
                        );

        listingImageRepository.deleteByListingId(listingId);
        listingRepository.delete(listing);

        return new ApiMessageResponse("Listing deleted successfully");
    }

    // ================= SEARCH =================
    public List<Listing> search(String q) {
        return listingRepository.search(q);
    }

    // ================= HELPERS =================
    private ListingCardDTO toCardDTO(Listing listing, String firstImage) {
        return new ListingCardDTO(
                listing.getId(),
                listing.getTitle(),
                listing.getPrice(),
                listing.getCategory(),
                listing.getSubcategory(),
                listing.getLocation(),
                listing.getYear(),
                listing.getDescription(),
                listing.getSeller().getId(),
                listing.getCreatedAt(),
                firstImage // "/uploads/uuid.jpg"
        );
    }

    private List<String> storeFiles(List<MultipartFile> images) throws Exception {

        if (images == null || images.isEmpty()) {
            return Collections.emptyList();
        }

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        List<String> paths = new ArrayList<>();

        for (MultipartFile file : images) {
            if (file == null || file.isEmpty()) continue;

            String safeName =
                    UUID.randomUUID() + "_" +
                            Objects.requireNonNull(file.getOriginalFilename())
                                    .replaceAll("\\s+", "_");

            Path target = uploadDir.resolve(safeName);

            Files.copy(
                    file.getInputStream(),
                    target,
                    StandardCopyOption.REPLACE_EXISTING
            );

            // ✅ EXACT PATH USED EVERYWHERE
            paths.add("/uploads/" + safeName);
        }

        return paths;
    }
}