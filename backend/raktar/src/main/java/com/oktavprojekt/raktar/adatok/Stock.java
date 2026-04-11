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
@Table(name = "stock") // Megegyezik az adatbázisbeli táblanévvel.
@NoArgsConstructor // Kell a JPA-nak egy üres konstruktor.
@AllArgsConstructor // Jó a teszteléshez.
@Data
@Getter
@Setter
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stock_id;
    
    private Integer product_id          = 1;
    private Integer warehouse_id        = 1;
    private Integer status_id           = 1;
    private Integer product_quantity    = 1;
       
}