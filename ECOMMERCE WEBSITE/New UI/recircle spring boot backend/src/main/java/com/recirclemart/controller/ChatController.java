package com.recirclemart.controller;

import com.recirclemart.entity.*;
import com.recirclemart.service.ChatService;
import com.recirclemart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private ListingRepository listingRepository;
    @Autowired
    private UserRepository userRepository;

    // CREATE CHAT (path style still supported)
    @PostMapping("/{listingId}/{sellerId}")
    public Chat create(@PathVariable Integer listingId,
            @PathVariable Integer sellerId,
            Principal principal) {

        User buyer = userRepository.findByEmail(principal.getName()).orElseThrow();
        User seller = userRepository.findById(sellerId).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();

        return chatService.createChat(listing, buyer, seller);
    }

    // CREATE CHAT (body style: { listingId, sellerId }) — matches frontend
    // /chats/start
    @PostMapping("/start")
    public Map<String, Integer> start(@RequestBody Map<String, Integer> body, Principal principal) {
        Integer listingId = body.get("listingId");
        Integer sellerId = body.get("sellerId");

        User buyer = userRepository.findByEmail(principal.getName()).orElseThrow();
        User seller = userRepository.findById(sellerId).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();

        // Check existing
        java.util.Optional<Chat> existing = chatService.findExistingChat(listing, buyer, seller);
        if (existing.isPresent()) {
            return Map.of("chatId", existing.get().getId());
        }

        Chat c = chatService.createChat(listing, buyer, seller);
        return Map.of("chatId", c.getId());
    }

    // GET MY CHATS — return flattened JSON (same shape as Node API)
    @GetMapping
    public List<Map<String, Object>> myChats(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        List<Chat> chats = chatService.getUserChats(user);

        return chats.stream().map(c -> {
            Map<String, Object> m = new java.util.HashMap<>();
            m.put("id", c.getId());
            m.put("listing_id", c.getListing().getId());
            m.put("buyer_id", c.getBuyer().getId());
            m.put("seller_id", c.getSeller().getId());
            m.put("title", c.getListing().getTitle());

            if (c.getBuyer().getId().equals(user.getId())) {
                m.put("other_id", c.getSeller().getId());
                m.put("other_name", c.getSeller().getFirstName() + " " + c.getSeller().getLastName());
                m.put("other_avatar", c.getSeller().getAvatar());
            } else {
                m.put("other_id", c.getBuyer().getId());
                m.put("other_name", c.getBuyer().getFirstName() + " " + c.getBuyer().getLastName());
                m.put("other_avatar", c.getBuyer().getAvatar());
            }

            return m;
        }).toList();
    }
}
