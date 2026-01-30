package com.recirclemart.controller;

import com.recirclemart.entity.*;
import com.recirclemart.service.ChatService;
import com.recirclemart.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired private ChatService chatService;
    @Autowired private ListingRepository listingRepository;
    @Autowired private UserRepository userRepository;

    @PostMapping("/{listingId}/{sellerId}")
    public Chat create(@PathVariable Integer listingId,
                       @PathVariable Integer sellerId,
                       Principal principal) {

        User buyer = userRepository.findByEmail(principal.getName()).orElseThrow();
        User seller = userRepository.findById(sellerId).orElseThrow();
        Listing listing = listingRepository.findById(listingId).orElseThrow();

        return chatService.createChat(listing, buyer, seller);
    }

    @GetMapping
    public List<Chat> myChats(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        return chatService.getUserChats(user);
    }
}
