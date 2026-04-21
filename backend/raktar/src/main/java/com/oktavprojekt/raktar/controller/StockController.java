package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.*;

import com.oktavprojekt.raktar.adatbaziskezelo.ProductRepository;
import com.oktavprojekt.raktar.adatbaziskezelo.StockRepository;
import com.oktavprojekt.raktar.adatok.Product;
import com.oktavprojekt.raktar.adatok.Stock;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class StockController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StockRepository repository;

    @GetMapping("/stock")
    public List<Stock> getAll() {

        return repository.findAll(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }

    @GetMapping("/stock/{id}")
    public ResponseEntity<Stock> getStockById(@PathVariable Integer id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/stock")
    public ResponseEntity<?> addStock(@RequestBody Stock stock) {
        // 1. Megnézzük, jött-e termék azonosító
        if (stock.getProduct() == null || stock.getProduct().getProductId() == null) {
            return ResponseEntity.badRequest().body("Hiba: Hiányzik a termék azonosítója!");
        }

        Integer productId = stock.getProduct().getProductId();

        // 2. Megkeressük a valódi terméket
        Optional<Product> optionalProduct = productRepository.findById(productId);

        if (optionalProduct.isPresent()) {
            // Ha létezik, összekötjük a kettőt
            stock.setProduct(optionalProduct.get());
            
            // 3. Mentés (Itt figyeld a változónevet!)
            Stock saved = repository.save(stock);
            return ResponseEntity.ok(saved);
        } else {
            // Ha nem létezik a termék
            return ResponseEntity.status(404).body("Hiba: A " + productId + " azonosítójú termék nem található!");
        }
    }

    @PutMapping("/stock/{id}")
    public ResponseEntity<?> updateStock(@PathVariable Integer id, @RequestBody Stock stockDetails) {
        Optional<Stock> stockData = repository.findById(id);

        if (stockData.isPresent()) {
            Stock stock = stockData.get();
            stock.setProductQuantity(stockDetails.getProductQuantity());
            if (stockDetails.getWarehouseId() != null) {
                stock.setWarehouseId(stockDetails.getWarehouseId());
            }
            return ResponseEntity.ok(repository.save(stock));
        } else {
            return ResponseEntity.status(404).body("Hiba: Nincs ilyen ID.");
        }
    }

    @DeleteMapping("/stock/{id}") // Figyelj, hogy /stock legyen, ne /products!
    public ResponseEntity<Void> deleteStock(@PathVariable Integer id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/test")
    public String test() {
        return "A szerver fut és látja a kontrollert!";
}
}
