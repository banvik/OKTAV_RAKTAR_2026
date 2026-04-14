package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oktavprojekt.raktar.adatok.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
}
