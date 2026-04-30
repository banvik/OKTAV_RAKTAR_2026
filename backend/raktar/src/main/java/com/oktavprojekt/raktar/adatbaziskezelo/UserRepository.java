package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    // A Spring Data JPA automatikusan megírja az SQL-t a név alapján!

    User findByUsername(String username);
}
