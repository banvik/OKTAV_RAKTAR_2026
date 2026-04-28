package com.oktavprojekt.raktar.adatbaziskezelo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.oktavprojekt.raktar.adatok.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    // A Spring Data JPA automatikusan megírja az SQL-t a név alapján!
}
