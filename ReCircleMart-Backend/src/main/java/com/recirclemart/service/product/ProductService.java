package com.recirclemart.service.product;

import java.security.Principal;
import java.util.List;

import com.recirclemart.dtos.ProductRequestDTO;
import com.recirclemart.dtos.ProductResponseDTO;

public interface ProductService {

    ProductResponseDTO addProduct(ProductRequestDTO dto, Principal principal);

    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO getProductById(Long id);

    void deleteProduct(Long id);
}
