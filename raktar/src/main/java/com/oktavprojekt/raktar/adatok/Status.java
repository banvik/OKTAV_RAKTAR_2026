package com.oktavprojekt.raktar.adatok;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "statuses") // Megegyezik az adatbázisbeli táblanévvel.
@NoArgsConstructor // Kell a JPA-nak egy üres konstruktor.
@AllArgsConstructor // Jó a teszteléshez.
@Data
@Getter
@Setter
public class Status {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer status_id;
    
    private String status_type    = "raktáron";
    private String status_info    = "elérhető raktári készlet";
       
}