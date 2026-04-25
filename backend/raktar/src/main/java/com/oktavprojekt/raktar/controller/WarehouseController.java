package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.RestController;

import com.oktavprojekt.raktar.adatbaziskezelo.WarehouseRepository;
import com.oktavprojekt.raktar.adatok.Warehouse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class WarehouseController {

    @Autowired
    private WarehouseRepository repository;

    @GetMapping("/warehouses")
    public List<Warehouse> getAll() {

        return repository.findAll(); // Spring automatically converts to JSON
    }
}