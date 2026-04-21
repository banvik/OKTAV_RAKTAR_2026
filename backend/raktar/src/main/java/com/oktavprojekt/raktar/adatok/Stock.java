package com.oktavprojekt.raktar.adatok;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stock") // Megegyezik az adatbázisbeli táblanévvel.
@Data
@NoArgsConstructor // Kell a JPA-nak egy üres konstruktor.
@AllArgsConstructor // Jó a teszteléshez.
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "stock_id")
    private Integer stockId;
    
    @ManyToOne // több készlettétel tartozik egy termékhez
    @JoinColumn(name = "product_id", nullable = false) // ez az oszlopnév az adatbázisban
    private Product product;
    
    @Column(name = "warehouse_id")
    private Integer warehouseId        = 1;

    @Column(name = "product_quantity")
    private Integer productQuantity    = 1;
       
}