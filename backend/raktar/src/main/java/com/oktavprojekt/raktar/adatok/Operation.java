package com.oktavprojekt.raktar.adatok;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
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
@Table(name = "operations") // Megegyezik az adatbázisbeli táblanévvel.
@NoArgsConstructor // Kell a JPA-nak egy üres konstruktor.
@AllArgsConstructor // Jó a teszteléshez.
@Data
@Getter
@Setter
public class Operation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "operation_id")
    private Integer operationId;
    
    @Column(name = "operation_name")
    private String operationName       = "bevételezés";

    @Column(name = "stock_id")
    private Integer stockId            = 1;

    @Column(name = "user_id")
    private Integer userId             = 1;

    @Column(name = "operation_quantity")
    private Integer operationQuantity  = 1;
    
    @Column(name = "operation_timestamp")
    private LocalDateTime operationTimestamp = null;
    
   
}