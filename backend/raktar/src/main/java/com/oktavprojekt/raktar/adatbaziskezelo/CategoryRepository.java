package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
