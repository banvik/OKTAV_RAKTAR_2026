package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.RestController;

import com.oktavprojekt.raktar.adatbaziskezelo.ProductRepository;
import com.oktavprojekt.raktar.adatok.Product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping("/products")
    public List<Product> getAll() {

        return repository.findAll(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }

    @PostMapping("/products")
    public ResponseEntity<Product> addProduct(@RequestBody Product newProduct) {

        Product savedProduct = repository.save(newProduct); // A save() metódus elmenti az adatbázisba és visszaadja a már ID-val rendelkező objektumot
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED); // 201-es kóddal válaszolunk
    }

}
