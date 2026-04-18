package com.oktavprojekt.raktar.adatok;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products") // Megegyezik az adatbázisbeli táblanévvel.
@NoArgsConstructor // Kell a JPA-nak egy üres konstruktor.
@AllArgsConstructor // Jó a teszteléshez.
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "product_color")
    private String productColor;

    @Column(name = "product_color_code")
    private String productColorCode;

    @Column(name = "product_size")
    private String productSize;

    @Column(name = "product_info")
    private String productInfo;

    // --- KAPCSOLAT ---
    // Ide jön a @OneToMany, ami a Stock osztályra mutat.
    // A mappedBy értéke az a változónév legyen, ami a Stock osztályban van!
    @OneToMany(mappedBy = "product") 
    @JsonIgnore // Így a termék lekérésekor nem küldi el az összes raktárbejegyzést
    private List<Stock> stocks;
   
}