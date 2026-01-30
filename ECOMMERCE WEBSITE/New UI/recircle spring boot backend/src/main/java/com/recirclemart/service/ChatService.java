package com.recirclemart.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recirclemart.entity.Chat;
import com.recirclemart.entity.Listing;
import com.recirclemart.entity.User;
import com.recirclemart.repository.ChatRepository;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public Chat createChat(Listing listing, User buyer, User seller) {

        Optional<Chat> existing = chatRepository
                .findByListingAndBuyerAndSeller(listing, buyer, seller);

        if (existing.isPresent())
            return existing.get();

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

    // Check both directions for an existing chat (listing + buyer + seller OR
    // listing + seller + buyer)
    public Optional<Chat> findExistingChat(Listing listing, User buyer, User seller) {
        Optional<Chat> direct = chatRepository.findByListingAndBuyerAndSeller(listing, buyer, seller);
        if (direct.isPresent())
            return direct;

        Optional<Chat> reverse = chatRepository.findByListingAndBuyerAndSeller(listing, seller, buyer);
        return reverse;
    }

    public void deleteChat(Chat chat) {
        chatRepository.delete(chat);
    }
}
