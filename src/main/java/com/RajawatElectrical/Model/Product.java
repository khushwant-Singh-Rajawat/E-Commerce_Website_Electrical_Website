package com.RajawatElectrical.Model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(nullable = false)
    private BigDecimal price;
    private BigDecimal oldPrice;

    private String imageUrl;

    @Column(nullable = false)
    private Boolean active=true;

    private LocalDateTime createdAt=LocalDateTime.now();

}
