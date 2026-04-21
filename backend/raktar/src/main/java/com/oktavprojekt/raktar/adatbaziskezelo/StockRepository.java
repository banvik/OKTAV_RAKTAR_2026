package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.Stock;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Integer> {
    // A Spring Data JPA automatikusan megírja az SQL-t a név alapján!
    Optional<Stock> findByProduct_ProductIdAndWarehouseId(Integer productId, Integer warehouseId);
}
