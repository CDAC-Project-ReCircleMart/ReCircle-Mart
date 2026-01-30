package com.recirclemart.service;

import com.recirclemart.dtos.ChatListResponseDTO;
import com.recirclemart.dtos.MessageResponseDTO;
import com.recirclemart.dtos.SendMessageRequestDTO;
import com.recirclemart.entity.*;
import com.recirclemart.repository.*;
import com.recirclemart.security.SecurityUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final ChatQueryRepository chatQueryRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    // ✅ ADD THIS
    private final NotificationService notificationService;

    /* -------------------- CURRENT USER -------------------- */
    public static Integer getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getPrincipal() == null) return null;

        Object principal = auth.getPrincipal();
        if (principal instanceof User user) return user.getId();
        if (principal instanceof String str) return Integer.parseInt(str);

        return null;
    }

    /* -------------------- START CHAT -------------------- */
    public Integer startChat(Integer listingId, Integer sellerId) {

        User buyer = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        if (buyer.getId().equals(sellerId))
            throw new IllegalArgumentException("Cannot chat with yourself");

        Optional<Chat> existing =
                chatRepository.findExisting(listingId, buyer.getId(), sellerId);

        if (existing.isPresent()) return existing.get().getId();

        Listing listing = listingRepository.findById(listingId)
                .orElseThrow(() -> new RuntimeException("Listing not found"));

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

        User me = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return chatQueryRepository.getMyChats(me.getId())
                .stream()
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

        User me = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("Unauthorized"));

        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        if (!chat.getBuyer().getId().equals(me.getId())
                && !chat.getSeller().getId().equals(me.getId())) {
            throw new SecurityException("Not allowed");
        }

        return messageRepository.findByChat_IdOrderByIdAsc(chatId)
                .stream()
                .map(m -> new MessageResponseDTO(
                        m.getId(),
                        chatId,
                        m.getSender().getId(),
                        m.getReceiver() != null ? m.getReceiver().getId() : null,
                        m.getAlg(),
                        m.getIv(),
                        m.getCiphertext(),
                        m.getTag(),
                        m.getEncKeyForReceiver(),
                        m.getEncKeyForSender(),
                        m.getCreatedAt()
                ))
                .toList();
    }

    /* -------------------- SEND MESSAGE -------------------- */
    public MessageResponseDTO sendMessage(Integer chatId, SendMessageRequestDTO req) {

        User sender = userRepository.findByEmail(SecurityUtil.getCurrentEmail())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        if (req == null || req.getReceiverId() == null)
            throw new IllegalArgumentException("Invalid request");

        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        if (!chat.getBuyer().getId().equals(sender.getId())
                && !chat.getSeller().getId().equals(sender.getId())) {
            throw new SecurityException("Not allowed");
        }

        User receiver = userRepository.findById(req.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message saved = messageRepository.save(
                Message.builder()
                        .chat(chat)
                        .sender(sender)
                        .receiver(receiver)
                        .message(null) // encrypted content
                        .alg(req.getAlg())
                        .iv(req.getIv())
                        .ciphertext(req.getCiphertext())
                        .tag(req.getTag())
                        .encKeyForReceiver(req.getEncKeyForReceiver())
                        .encKeyForSender(req.getEncKeyForSender())
                        .build()
        );

        // 🔔 ✅ THIS FIXES YOUR ISSUE
        notificationService.createNotification(
                receiver.getId(),                 // who gets notification
                "CHAT",                            // type
                "New Message",                     // title
                "New message from " + sender.getEmail(),
                chat.getListing().getId(),         // listing reference
                sender.getId()                     // related user
        );

        return new MessageResponseDTO(
                saved.getId(),
                chatId,
                sender.getId(),
                receiver.getId(),
                saved.getAlg(),
                saved.getIv(),
                saved.getCiphertext(),
                saved.getTag(),
                saved.getEncKeyForReceiver(),
                saved.getEncKeyForSender(),
                saved.getCreatedAt()
        );
    }

    /* -------------------- DELETE CHAT -------------------- */
    @Transactional
    public void deleteChat(Integer chatId) {

        Integer userId = getCurrentUserId();

        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found"));

        if (!chat.getBuyer().getId().equals(userId)
                && !chat.getSeller().getId().equals(userId)) {
            throw new SecurityException("Not allowed");
        }

        messageRepository.deleteByChat_Id(chatId);
        chatRepository.deleteById(chatId);
    }
}