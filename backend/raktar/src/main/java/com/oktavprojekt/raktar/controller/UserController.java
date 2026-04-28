package com.oktavprojekt.raktar.controller;

import org.springframework.web.bind.annotation.RestController;
import com.oktavprojekt.raktar.adatbaziskezelo.UserRepository;
import com.oktavprojekt.raktar.adatok.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository repository;

// ----  DTO segédosztályok  ----

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    @Builder
    public static class LoginResponse {
        private String username;
        private String fullName;
        private String roleName;
        private String message;
    }

    @GetMapping("/users")
    public List<User> getAll() {

        return repository.findAll(); // Spring automatically converts to JSON
    }

    @PostMapping("/users/login")
        // JSON minta : { "username": "nev", "password": "jelszó" }
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 1. Validáció
        if (request.username == null || request.password == null || request.password.isBlank()) {
            return ResponseEntity.badRequest().body("Hibás bemenet!");
        }
        // 2. Felhasználó keresése
        User user = repository.findByUsername(request.username);
        if (user == null) {
            return ResponseEntity.status(404).body("Felhasználó nem található!");
        }
        // 3. Jelszó ellenőrzése
        if (!user.getPasswordHash().equals(request.password)) {
            return ResponseEntity.status(401).body("Hibás jelszó!");
        }
        // 4. Sikeres bejelentkezés
        LoginResponse response = LoginResponse.builder()
                .username(user.getUsername())
                .roleName(user.getRoleName())
                .fullName(user.getFullName())
                .message("Sikeres bejelentkezés!")
                .build();
        return ResponseEntity.ok(response);
    }
}