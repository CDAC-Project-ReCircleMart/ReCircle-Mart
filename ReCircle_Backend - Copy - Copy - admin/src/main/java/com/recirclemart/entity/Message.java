package com.recirclemart.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
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

    @NotNull
    @ManyToOne
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;


    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
    
    
    private String alg;              // "AES-256-GCM"
    @Column(columnDefinition="TEXT")
    private String iv;               // base64
    @Column(columnDefinition="LONGTEXT")
    private String ciphertext;       // base64
    @Column(columnDefinition="TEXT")
    private String tag;              // base64
    @Column(columnDefinition="LONGTEXT")
    private String encKeyForReceiver; // base64 (RSA-OAEP encrypted AES key)

    // optional (helps for debugging / multi receiver)
    @ManyToOne
    @JoinColumn(name="receiver_id")
    private User receiver;
    
    
    @Column(columnDefinition="LONGTEXT")
    private String encKeyForSender; // base64 (RSA-OAEP encrypted AES key for sender)

    
}
