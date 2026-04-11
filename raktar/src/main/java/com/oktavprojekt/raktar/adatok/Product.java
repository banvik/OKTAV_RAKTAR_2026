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
@Table(name = "products") // Megegyezik az adatbázisbeli táblanévvel.
@NoArgsConstructor // Kell a JPA-nak egy üres konstruktor.
@AllArgsConstructor // Jó a teszteléshez.
@Data
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;

    private String product_name         = "Polikarbonát üregkamrás 10mm";
    private Integer category_id         = 1;
    private String product_color        = "Víztiszta";
    private String product_color_code   = "#F0F8FF";
    private String product_size         = "2100x6000";
    private String product_info         = "UV védett, többkamrás";
   
}