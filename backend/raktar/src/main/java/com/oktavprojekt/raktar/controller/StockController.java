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
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class StockController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private StockRepository repository;

    public static class IncomingRequest { // Bevételezés segédosztálya
        public Integer productId;
        public Integer quantity;
    }
    
    public static class TransferRequest { // Raktárközi árumozgás segédosztálya
        public Integer productId;
        public Integer fromWarehouseId;
        public Integer toWarehouseId;
        public Integer quantity;
    }

    public static class OutgoingRequest { // Kiadás segédosztálya
        public Integer productId;
        public Integer quantity;
    }

    // ----  READ  műveletek  ----

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

    @GetMapping("/test")
    public String test() {
        return "A szerver fut és látja a kontrollert!";
    }

    // ----  CREATE  műveletek  ----

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

    @PostMapping("/stock/incoming")
        //{ "productId": 1, "productQuantity": 100 }
    @Transactional
    public ResponseEntity<?> incomingStock(@RequestBody IncomingRequest request) {

        if (request.productId == null || request.quantity == null || request.quantity <= 0) {
            return ResponseEntity.badRequest().body("Hibás bemenet!");
        }

        final Integer targetWarehouseId = 1;

        // 1. Product lekérése
        Product product = productRepository.findById(request.productId)
            .orElseThrow(() -> new RuntimeException("Termék nem található!"));

        // 2. Stock keresés vagy létrehozás
        Stock targetStock = repository.findByProduct_ProductIdAndWarehouseId(
                request.productId, targetWarehouseId)
            .orElseGet(() -> {
                Stock newStock = new Stock();
                newStock.setProduct(product);
                newStock.setWarehouseId(targetWarehouseId);
                newStock.setProductQuantity(0);
                return newStock;
            });

        // 3. Növelés
        targetStock.setProductQuantity(
            targetStock.getProductQuantity() + request.quantity
        );

        // 4. Mentés
        repository.save(targetStock);

        return ResponseEntity.ok(targetStock);
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

    // ----  UPDATE  műveletek  ----

    @PutMapping("/stock/{id}")
        //{ "productQuantity": 500, "warehouseId": 2 }
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

}
