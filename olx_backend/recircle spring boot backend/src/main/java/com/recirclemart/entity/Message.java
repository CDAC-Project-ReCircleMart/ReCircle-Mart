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

    @NotBlank
    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
