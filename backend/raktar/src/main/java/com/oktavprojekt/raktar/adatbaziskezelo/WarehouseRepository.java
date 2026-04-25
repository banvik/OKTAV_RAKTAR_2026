package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.Warehouse;

public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
}