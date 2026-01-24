package com.recirclemart.repository.product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.recirclemart.entities.product.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findBySoldFalse();
}
