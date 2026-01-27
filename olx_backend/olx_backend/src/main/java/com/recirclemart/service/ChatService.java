package com.recirclemart.service;

import com.recirclemart.entity.*;
import com.recirclemart.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatService {

    @Autowired private ChatRepository chatRepository;

    public Chat createChat(Listing listing, User buyer, User seller) {

        Optional<Chat> existing = chatRepository
                .findByListingAndBuyerAndSeller(listing, buyer, seller);

        if (existing.isPresent()) return existing.get();

        Chat chat = Chat.builder()
                .listing(listing)
                .buyer(buyer)
                .seller(seller)
                .build();

        return chatRepository.save(chat);
    }

    public List<Chat> getUserChats(User user) {
        return chatRepository.findByBuyerOrSeller(user, user);
    }
}
