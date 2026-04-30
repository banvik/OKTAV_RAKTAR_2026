package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.RestController;

import com.oktavprojekt.raktar.adatbaziskezelo.CategoryRepository;
import com.oktavprojekt.raktar.adatok.Category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository repository;

    @GetMapping("/categories")
    public List<Category> getAll() {

        return repository.findAll(); // Spring automatikusan convertál JSON formátumra, ha visszaadunk egy List<Category>-t.
    }
}