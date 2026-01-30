package com.recirclemart.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private User receiver;

    // ✅ MUST be nullable for encrypted chat
    @Column(columnDefinition = "TEXT", nullable = true)
    private String message;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // 🔐 Encryption fields
    private String alg; // AES-256-GCM

    @Column(columnDefinition = "TEXT")
    private String iv;

    @Column(columnDefinition = "LONGTEXT")
    private String ciphertext;

    @Column(columnDefinition = "TEXT")
    private String tag;

    @Column(columnDefinition = "LONGTEXT")
    private String encKeyForReceiver;

    @Column(columnDefinition = "LONGTEXT")
    private String encKeyForSender;
}