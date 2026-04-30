package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.*;

import com.oktavprojekt.raktar.adatbaziskezelo.ProductRepository;
import com.oktavprojekt.raktar.adatok.Product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping("/products")
    public List<Product> getAll() {

        return repository.findAll(); // Spring automatikusan convertál JSON formátumra, ha visszaadunk egy List<Category>-t.
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product newProduct) {

        Product savedProduct = repository.save(newProduct); // A save() metódus elmenti az adatbázisba és visszaadja a már ID-val rendelkező objektumot
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Integer id,
            @RequestBody Product updatedProduct) {

        return repository.findById(id)
                .map(existing -> {
                    existing.setProductName(updatedProduct.getProductName());
                    existing.setCategoryId(updatedProduct.getCategoryId());
                    existing.setProductSize(updatedProduct.getProductSize());
                    existing.setProductColor(updatedProduct.getProductColor());
                    existing.setProductColorCode(updatedProduct.getProductColorCode());
                    existing.setProductInfo(updatedProduct.getProductInfo());

                    Product saved = repository.save(existing);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }

}
