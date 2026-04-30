package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
    // A Spring Data JPA automatikusan megírja az SQL-t a név alapján!
}