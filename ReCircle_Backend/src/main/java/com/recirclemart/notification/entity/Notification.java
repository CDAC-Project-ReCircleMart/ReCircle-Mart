package com.recirclemart.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    private String type;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(name = "listing_id")
    private Integer listingId;

    
    @Column(name = "related_user_id")
    private Integer relatedUserId;

    @Column(name = "is_read")
    @JsonProperty("is_read")
    private Boolean isRead = false;

    @CreationTimestamp
    @JsonProperty("created_at")
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
