package com.oktavprojekt.raktar.adatok;

import jakarta.persistence.*;
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
   
}