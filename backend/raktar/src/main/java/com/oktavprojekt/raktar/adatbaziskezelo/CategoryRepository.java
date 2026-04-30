package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    // A Spring Data JPA automatikusan megírja az SQL-t a név alapján!
}
