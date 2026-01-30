package com.recirclemart.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "listing_images")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ListingImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "listing_id", nullable = false)
    private Listing listing;

    @NotBlank
    @Column(name = "image_path", columnDefinition = "TEXT", nullable = false)
    private String imagePath;

    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
