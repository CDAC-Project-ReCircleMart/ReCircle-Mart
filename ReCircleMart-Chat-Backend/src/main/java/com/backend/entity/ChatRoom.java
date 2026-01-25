package com.backend.entity;

import java.time.LocalDateTime;

import com.backend.enums.ResourceType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
    name = "chat_room",
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"resource_type", "resource_id"}
    )
)
@Getter
@Setter
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @Enumerated(EnumType.STRING)
    @Column(name = "resource_type", nullable = false)
    private ResourceType resourceType;

    @Column(name = "resource_id", nullable = false)
    private Long resourceId;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}