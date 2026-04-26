package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.RestController;
import com.oktavprojekt.raktar.adatbaziskezelo.UserRepository;
import com.oktavprojekt.raktar.adatok.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository repository;

    @GetMapping("/users")
    public List<User> getAll() {

        return repository.findAll(); // Spring automatically converts to JSON
    }
}