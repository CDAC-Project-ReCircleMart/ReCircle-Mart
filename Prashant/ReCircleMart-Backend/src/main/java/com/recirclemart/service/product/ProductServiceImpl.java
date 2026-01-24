package com.recirclemart.service.product;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.recirclemart.dtos.ProductRequestDTO;
import com.recirclemart.dtos.ProductResponseDTO;
import com.recirclemart.entities.product.Category;
import com.recirclemart.entities.product.Product;
import com.recirclemart.entities.user.Users;
import com.recirclemart.repository.product.CategoryRepository;
import com.recirclemart.repository.product.ProductRepository;
import com.recirclemart.repository.user.UsersRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final UsersRepository usersRepository;
    private final CategoryRepository categoryRepository;

    public ProductServiceImpl(
            ProductRepository productRepository,
            UsersRepository usersRepository,
            CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.usersRepository = usersRepository;
        this.categoryRepository = categoryRepository;
    }

    // ✅ CREATE PRODUCT
    @Override
    public ProductResponseDTO addProduct(ProductRequestDTO dto, Principal principal) {

        String email = principal.getName();

        Users user = usersRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Product product = new Product();
        product.setTitle(dto.getTitle());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setLocation(dto.getLocation());
        product.setSold(false);
        product.setSeller(user);
        product.setCategory(category);

        Product saved = productRepository.save(product);

        return mapToResponse(saved);
    }

    // ✅ GET ALL PRODUCTS
    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findBySoldFalse()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ✅ GET PRODUCT BY ID
    @Override
    public ProductResponseDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return mapToResponse(product);
    }

    // ✅ DELETE PRODUCT
    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // 🔹 ENTITY → DTO MAPPER (VERY IMPORTANT)
    private ProductResponseDTO mapToResponse(Product product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setProductId(product.getProductId());
        dto.setTitle(product.getTitle());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setLocation(product.getLocation());
        dto.setSold(product.isSold());
        dto.setSellerEmail(product.getSeller().getEmail());
        dto.setCategoryName(product.getCategory().getCategoryName());
        return dto;
    }
}
