package com.oktavprojekt.raktar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration;


@SpringBootApplication
// @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class RaktarApplication {

	public static void main(String[] args) {
		SpringApplication.run(RaktarApplication.class, args);
	}
}
