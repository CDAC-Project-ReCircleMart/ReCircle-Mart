package com.recirclemart.listing.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.recirclemart.user.entity.User;

@Entity
@Table(name = "listings")

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@ToString
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotBlank
    private String title;

    @NotNull
    private Double price;

    @NotBlank
    private String category;

    @NotBlank
    private String subcategory;

    @NotBlank
    @Column(columnDefinition = "TEXT")
    private String location;

    private Integer year;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "status")
    private String status = "pending";

    @NotNull
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

}
