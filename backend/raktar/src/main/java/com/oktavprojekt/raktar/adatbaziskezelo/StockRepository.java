package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.oktavprojekt.raktar.adatok.Stock;

public interface StockRepository extends JpaRepository<Stock, Integer> {
}
