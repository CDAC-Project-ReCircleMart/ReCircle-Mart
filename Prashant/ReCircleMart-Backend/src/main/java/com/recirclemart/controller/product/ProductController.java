package com.recirclemart.controller.product;

import java.security.Principal;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.recirclemart.dtos.ProductRequestDTO;
import com.recirclemart.dtos.ProductResponseDTO;
import com.recirclemart.service.product.ProductService;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService productService;

    // Constructor Injection
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ================= ADD PRODUCT =================
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(
            @Valid @RequestBody ProductRequestDTO dto,
            Principal principal) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.addProduct(dto, principal));
    }

    // ================= GET ALL UNSOLD PRODUCTS =================
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ================= GET PRODUCT BY ID =================
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // ================= DELETE PRODUCT =================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
