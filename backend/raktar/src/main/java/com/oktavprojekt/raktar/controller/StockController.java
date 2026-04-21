package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.*;

import com.oktavprojekt.raktar.adatbaziskezelo.ProductRepository;
import com.oktavprojekt.raktar.adatbaziskezelo.StockRepository;
import com.oktavprojekt.raktar.adatok.Product;
import com.oktavprojekt.raktar.adatok.Stock;

import jakarta.transaction.Transactional;

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

    public static class TransferRequest {
        public Integer productId;
        public Integer fromWarehouseId;
        public Integer toWarehouseId;
        public Integer quantity;
    }

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

    @PostMapping("/stock/transfer")
    @Transactional // Fontos! Ha az egyik mentés sikerül, de a másik nem, vonja vissza az egészet!
    public ResponseEntity<?> transferStock(@RequestBody TransferRequest request) {
        
        // 1. Forrás készlet megkeresése
        Stock sourceStock = repository.findByProduct_ProductIdAndWarehouseId(
            request.productId, request.fromWarehouseId)
            .orElseThrow(() -> new RuntimeException("Forrás készlet nem található!"));

        // 2. Ellenőrzés: Van elég áru?
        if (sourceStock.getProductQuantity() < request.quantity) {
            return ResponseEntity.badRequest().body("Hiba: Nincs elég készlet a forrás raktárban!");
        }

        // 3. Cél készlet megkeresése (vagy létrehozása, ha még nincs abban a raktárban)
        Stock targetStock = repository.findByProduct_ProductIdAndWarehouseId(
            request.productId, request.toWarehouseId)
            .orElseGet(() -> {
                Stock newStock = new Stock();
                newStock.setProduct(sourceStock.getProduct());
                newStock.setWarehouseId(request.toWarehouseId);
                newStock.setProductQuantity(0);
                return newStock;
            });

        // 4. Mennyiségek módosítása
        sourceStock.setProductQuantity(sourceStock.getProductQuantity() - request.quantity);
        targetStock.setProductQuantity(targetStock.getProductQuantity() + request.quantity);

        // 5. Mentés
        repository.save(sourceStock);
        repository.save(targetStock);

        return ResponseEntity.ok("Sikeres átmozgatás!");
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
