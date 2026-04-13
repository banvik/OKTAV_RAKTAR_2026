package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.RestController;

import com.oktavprojekt.raktar.adatbaziskezelo.ProductRepository;
import com.oktavprojekt.raktar.adatok.Product;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

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

}
