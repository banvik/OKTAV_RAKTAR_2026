package com.oktavprojekt.raktar;

import org.springframework.web.bind.annotation.RestController;

import com.oktavprojekt.raktar.adatok.Product;
import com.oktavprojekt.raktar.adatok.Warehouse;
import com.oktavprojekt.raktar.adatok.Category;
import com.oktavprojekt.raktar.adatok.Status;
import com.oktavprojekt.raktar.adatok.Stock;
import com.oktavprojekt.raktar.adatok.Operation;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/products")
    public Product getProduct() {

        return new Product(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }

    @GetMapping("/categories")
    public Category getCategory() {

        return new Category(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }
    
    @GetMapping("/warehouses")
    public Warehouse getWarehouse() {

        return new Warehouse(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }

    @GetMapping("/statuses")
    public Status getStatus() {

        return new Status(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }
    
    @GetMapping("/stock")
    public Stock getStock() {

        return new Stock(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }

    @GetMapping("/operation")
    public Operation getOperation() {

        return new Operation(); // A Spring Boot automatikusan átalakítja JSON-ná!
    }
}
