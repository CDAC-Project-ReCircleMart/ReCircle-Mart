//package com.recirclemart.service;
//
//import com.recirclemart.entity.*;
//import com.recirclemart.repository.*;
//import com.recirclemart.util.FileUtil;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//
//@Service
//public class ListingService {
//
//    @Autowired private ListingRepository listingRepository;
//    @Autowired private ListingImageRepository imageRepository;
//    @Autowired private FileUtil fileUtil;
//
//    public Listing createListing(Listing listing, List<MultipartFile> files) throws Exception {
//
//        Listing saved = listingRepository.save(listing);
//
//        if (files != null) {
//            for (MultipartFile file : files) {
//                String path = fileUtil.saveFile(file);
//
//                ListingImage img = ListingImage.builder()
//                        .listing(saved)
//                        .imagePath(path)
//                        .build();
//
//                imageRepository.save(img);
//            }
//        }
//
//        return saved;
//    }
//
//    public List<Listing> getAllListings() {
//        return listingRepository.findAllByOrderByCreatedAtDesc();
//    }
//
//    public Listing getListing(Integer id) {
//        return listingRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Listing not found"));
//    }
//
//    public List<Listing> getBySeller(User seller) {
//        return listingRepository.findBySeller(seller);
//    }
//
//    public List<Listing> search(String keyword) {
//        return listingRepository.findByTitleContainingIgnoreCase(keyword);
//    }
//
//    public void deleteListing(Integer id) {
//        Listing listing = getListing(id);
//        imageRepository.deleteByListing(listing);
//        listingRepository.delete(listing);
//    }
//}
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

    // Change this path if you want
    private final Path uploadDir = Paths.get("uploads");

    public ListingService(ListingRepository listingRepository, ListingImageRepository listingImageRepository) {
        this.listingRepository = listingRepository;
        this.listingImageRepository = listingImageRepository;
    }

    @Transactional
    public CreateListingResponse createListing(Listing listing, List<MultipartFile> images) throws Exception {
        // 1) Save listing first (like Node insert)
        Listing saved = listingRepository.save(listing);

        // 2) Save images paths (same as Node: "/uploads/filename")
        List<String> imagePaths = storeFiles(images);

        for (String path : imagePaths) {
            ListingImage li = new ListingImage();
            li.setListing(saved);
            li.setImagePath(path);
            listingImageRepository.save(li);
        }

        return new CreateListingResponse("Listing created successfully", saved.getId());
    }
    
    public List<Listing> getAllIdsRepo(){
    	List<Listing> ans = listingRepository.getAllId();
    	
    	
    	return ans; 
    }

    // HOME PAGE: return list rows with "image" field
    public List<ListingCardDTO> getAllListingsCards() {
        List<Listing> listings = listingRepository.findAllOrderByCreatedAtDesc();
        
        List<ListingCardDTO> out = new ArrayList<>();

        for (Listing l : listings) {
        	System.out.println(l);
            String firstImage = listingImageRepository.findFirstImagePath(l.getId());
            out.add(toCardDTO(l, firstImage));
        }
        return out;
    }

    // PROFILE PAGE: my listings with first image
    public List<ListingCardDTO> getMyListings(Integer userId) {
        List<Listing> listings = listingRepository.findBySellerIdOrderByCreatedAtDesc(userId);
        List<ListingCardDTO> out = new ArrayList<>();

        for (Listing l : listings) {
            String firstImage = listingImageRepository.findFirstImagePath(l.getId());
            out.add(toCardDTO(l, firstImage));
        }
        return out;
    }

    // SELLER LISTINGS BY ID: same as my listings (Node getUserListingsById)
    public List<ListingCardDTO> getUserListingsById(Integer sellerId) {
        return getMyListings(sellerId);
    }

    // PRODUCT DETAIL: listing + images[] + seller object
    public ListingDetailDTO getSingleListing(Integer id) {
        Listing listing = listingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

        List<String> images = listingImageRepository.findPathsByListingId(id);

        User seller = listing.getSeller();

        ListingDetailDTO.SellerDTO sellerDTO =
                new ListingDetailDTO.SellerDTO(
                        seller.getId(),
                        seller.getFirstName(), // Node uses first_name as name
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

    // UPDATE: ownership check + update fields + return message
    @Transactional
    public ApiMessageResponse updateListing(Integer listingId, Integer userId, Listing updated) {
        Listing listing = listingRepository.findByIdAndSeller_Id(listingId, userId)
                .orElseThrow(() -> new RuntimeException("Not allowed to update this listing"));

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

    // DELETE: ownership check + delete images + delete listing + return message
    @Transactional
    public ApiMessageResponse deleteListing(Integer listingId, Integer userId) {
        Listing listing = listingRepository.findByIdAndSeller_Id(listingId, userId)
                .orElseThrow(() -> new RuntimeException("Not allowed to delete this listing"));

        listingImageRepository.deleteByListingId(listingId);
        listingRepository.delete(listing);

        return new ApiMessageResponse("Listing deleted successfully");
    }

    public List<Listing> search(String q) {
        return listingRepository.search(q);
    }

    // ---------- helpers ----------
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
                firstImage
        );
    }

    private List<String> storeFiles(List<MultipartFile> images) throws Exception {
        if (images == null || images.isEmpty()) return Collections.emptyList();

        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }

        List<String> paths = new ArrayList<>();
        for (MultipartFile file : images) {
            if (file == null || file.isEmpty()) continue;

            String safeName = UUID.randomUUID() + "_" + Objects.requireNonNull(file.getOriginalFilename())
                    .replaceAll("\\s+", "_");

            Path target = uploadDir.resolve(safeName);
            Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

            // Node stores: `/uploads/<filename>`
            paths.add("/uploads/" + safeName);
        }
        return paths;
    }
}