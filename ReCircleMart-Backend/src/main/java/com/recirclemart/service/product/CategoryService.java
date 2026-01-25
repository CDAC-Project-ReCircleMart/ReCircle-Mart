package com.recirclemart.service.product;



import java.util.List;

import org.springframework.stereotype.Service;

import com.recirclemart.entities.product.Category;
import com.recirclemart.repository.product.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // create category (optional)
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
}
