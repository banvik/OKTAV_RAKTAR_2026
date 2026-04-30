package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    // A Spring Data JPA automatikusan megírja az SQL-t a név alapján!
}
