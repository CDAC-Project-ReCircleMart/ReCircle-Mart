package com.recirclemart.repository.product;



import org.springframework.data.jpa.repository.JpaRepository;
import com.recirclemart.entities.product.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
