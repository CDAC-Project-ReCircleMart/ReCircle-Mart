package com.recirclemart.chat.service;

import com.recirclemart.chat.dto.request.EncryptedMessageRequestDTO;
import com.recirclemart.chat.dto.request.SendMessageRequestDTO;
import com.recirclemart.chat.dto.response.ChatListResponseDTO;
import com.recirclemart.chat.dto.response.EncryptedMessageResponseDTO;
import com.recirclemart.chat.dto.response.MessageResponseDTO;
import com.recirclemart.chat.entity.Chat;
import com.recirclemart.chat.entity.Message;
import com.recirclemart.chat.repository.ChatQueryRepository;
import com.recirclemart.chat.repository.ChatRepository;
import com.recirclemart.chat.repository.MessageRepository;

import com.recirclemart.listing.entity.Listing;
import com.recirclemart.listing.repository.ListingRepository;
import com.recirclemart.security.JwtUtil;
import com.recirclemart.security.SecurityUtil;
import com.recirclemart.user.entity.User;
import com.recirclemart.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {
        @Autowired
        private ChatRepository chatRepository;
        private final MessageRepository messageRepository;
        private final ChatQueryRepository chatQueryRepository;

        private final ListingRepository listingRepository;
        private final UserRepository userRepository;
        private final JwtUtil jwtUtil;

        public static Integer getCurrentUserId() {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

                if (authentication == null || authentication.getPrincipal() == null) {
                        return null;
                }

                Object principal = authentication.getPrincipal();

                // Case 1: principal is custom UserDetails
                if (principal instanceof User userDetails) {
                        return userDetails.getId();
                }

                // Case 2: principal is userId stored as String
                if (principal instanceof String userIdStr) {
                        return Integer.parseInt(userIdStr + "");
                }

                return null;
        }

        public Integer startChat(Integer listingId, Integer sellerId) {

                User req_buyer = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                                .orElseThrow(() -> new RuntimeException("Buyer not found"));

                Integer buyerId = req_buyer.getId();

                if (listingId == null || sellerId == null || buyerId == null) {
                        throw new IllegalArgumentException("Missing data");
                }
                if (buyerId.equals(sellerId)) {
                        throw new IllegalArgumentException("You cannot chat with yourself");
                }

                // check existing (both directions)
                Optional<Chat> existing = chatRepository.findExisting(listingId, buyerId, sellerId);
                if (existing.isPresent())
                        return existing.get().getId();

                Listing listing = listingRepository.findById(listingId)
                                .orElseThrow(() -> new RuntimeException("Listing not found"));

                User buyer = userRepository.findById(buyerId)
                                .orElseThrow(() -> new RuntimeException("Buyer not found"));

                User seller = userRepository.findById(sellerId)
                                .orElseThrow(() -> new RuntimeException("Seller not found"));

                Chat chat = Chat.builder()
                                .listing(listing)
                                .buyer(buyer)
                                .seller(seller)
                                .build();

                return chatRepository.save(chat).getId();
        }

        /* -------------------- GET MY CHATS -------------------- */
        public List<ChatListResponseDTO> getMyChats() {
                User req_buyer = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                                .orElseThrow(() -> new RuntimeException("Buyer not found"));

                Integer userId = req_buyer.getId();

                return chatQueryRepository.getMyChats(userId).stream()
                                .map(v -> ChatListResponseDTO.builder()
                                                .id(v.getId())
                                                .listingId(v.getListingId())
                                                .buyerId(v.getBuyerId())
                                                .sellerId(v.getSellerId())
                                                .title(v.getTitle())
                                                .otherId(v.getOtherId())
                                                .otherName(v.getOtherName())
                                                .otherAvatar(v.getOtherAvatar())
                                                .build())
                                .toList();
        }

        /* -------------------- GET MESSAGES -------------------- */
        public List<MessageResponseDTO> getMessages(Integer chatId) {

                // 1) Auth: current user
                String email = SecurityUtil.getCurrentEmail();
                if (email == null)
                        throw new RuntimeException("Unauthorized");

                Integer currentUserId = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"))
                                .getId();

                // 2) Chat exists + authorization (must be buyer or seller)
                Chat chat = chatRepository.findById(chatId)
                                .orElseThrow(() -> new RuntimeException("Chat not found"));

                boolean allowed = chat.getBuyer().getId().equals(currentUserId)
                                || chat.getSeller().getId().equals(currentUserId);

                if (!allowed)
                        throw new SecurityException("Not allowed");

                // 3) Fetch messages + return encrypted payload (server never decrypts)
                return messageRepository.findByChat_IdOrderByIdAsc(chatId)
                                .stream()
                                .map(m -> new MessageResponseDTO(
                                                m.getId(),
                                                m.getChat().getId(),
                                                m.getSender().getId(),
                                                m.getReceiver() != null ? m.getReceiver().getId() : null,

                                                m.getAlg(),
                                                m.getIv(),
                                                m.getCiphertext(),
                                                m.getTag(),
                                                m.getEncKeyForReceiver(),
                                                m.getEncKeyForSender(),

                                                m.getCreatedAt()))
                                .toList();
        }

        /* -------------------- SEND MESSAGE -------------------- */
        public MessageResponseDTO sendMessage(Integer chatId, SendMessageRequestDTO req) {

                // 1) Get current user (sender)
                User sender = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                                .orElseThrow(() -> new RuntimeException("Sender not found"));
                Integer senderId = sender.getId();

                // 2) Basic validation
                if (chatId == null)
                        throw new IllegalArgumentException("chatId missing");
                if (req == null)
                        throw new IllegalArgumentException("Request body missing");

                if (req.getReceiverId() == null)
                        throw new IllegalArgumentException("receiverId missing");

                if (req.getAlg() == null || req.getAlg().isBlank()
                                || req.getIv() == null || req.getIv().isBlank()
                                || req.getCiphertext() == null || req.getCiphertext().isBlank()
                                || req.getTag() == null || req.getTag().isBlank()
                                || req.getEncKeyForReceiver() == null || req.getEncKeyForReceiver().isBlank()) {
                        throw new IllegalArgumentException("Missing encrypted payload fields");
                }

                // 3) Load chat + authorization
                Chat chat = chatRepository.findById(chatId)
                                .orElseThrow(() -> new RuntimeException("Chat not found"));

                boolean allowed = chat.getBuyer().getId().equals(senderId) || chat.getSeller().getId().equals(senderId);
                if (!allowed)
                        throw new SecurityException("Not allowed to send in this chat");

                // 4) Load receiver + validate receiver is the other party
                User receiver = userRepository.findById(req.getReceiverId())
                                .orElseThrow(() -> new RuntimeException("Receiver not found"));

                Integer buyerId = chat.getBuyer().getId();
                Integer sellerId = chat.getSeller().getId();

                boolean receiverValid = (senderId.equals(buyerId) && receiver.getId().equals(sellerId)) ||
                                (senderId.equals(sellerId) && receiver.getId().equals(buyerId));

                if (!receiverValid)
                        throw new SecurityException("Receiver must be the other participant");

                // 5) Save encrypted message (server never decrypts)
                Message saved = messageRepository.save(
                                Message.builder()
                                                .chat(chat)
                                                .sender(sender)
                                                .receiver(receiver)
                                                .message(null) // legacy plaintext not used
                                                .alg(req.getAlg())
                                                .iv(req.getIv())
                                                .ciphertext(req.getCiphertext())
                                                .tag(req.getTag())
                                                .encKeyForReceiver(req.getEncKeyForReceiver())
                                                .encKeyForSender(req.getEncKeyForSender())
                                                .build());

                // 6) Return encrypted response
                return new MessageResponseDTO(
                                saved.getId(),
                                chat.getId(),
                                sender.getId(),
                                receiver.getId(),
                                saved.getAlg(),
                                saved.getIv(),
                                saved.getCiphertext(),
                                saved.getTag(),
                                saved.getEncKeyForReceiver(),
                                saved.getEncKeyForSender(),
                                saved.getCreatedAt());
        }

        /* -------------------- DELETE CHAT -------------------- */
        @Transactional
        public void deleteChat(Integer chatId) {
                Integer userId = getCurrentUserId();

                Chat chat = chatRepository.findById(chatId)
                                .orElseThrow(() -> new RuntimeException("Chat not found"));

                boolean allowed = chat.getBuyer().getId().equals(userId) || chat.getSeller().getId().equals(userId);
                if (!allowed) {
                        throw new SecurityException("Not allowed");
                }

                messageRepository.deleteByChat_Id(chatId);
                chatRepository.deleteById(chatId);
        }

}
