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
@AllArgsConstructor // Kényelmes konstruktor minden mezővel.
@Data   // Lombok annotáció, ami automatikusan generál gettereket, settereket, equals-t, hashCode-t és toString-et.
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    @com.fasterxml.jackson.annotation.JsonProperty("productId") 
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
    
    @OneToMany(mappedBy = "product") // A mappedBy értéke az a változónév legyen, ami a Stock osztályban van!
    @JsonIgnore // Így a termék lekérésekor nem küldi el az összes raktárbejegyzést, nem lesz végtelen ciklus a JSON-ban.
    private List<Stock> stocks;
   
}