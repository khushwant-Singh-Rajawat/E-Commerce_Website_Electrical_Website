package com.RajawatElectrical.Service;

import com.RajawatElectrical.Model.Product;
import com.RajawatElectrical.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService
{
    @Autowired
    private ProductRepository productRepository;

    // ✅ FIX: getAllActiveProducts method
    public List<Product> getAllActiveProducts() {
        return productRepository.findByActiveTrue();
    }

    // ✅ FIX: getProductById method
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }
}