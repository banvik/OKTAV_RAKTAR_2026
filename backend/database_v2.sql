-- ADATBAZIS LETREHOZASA

CREATE DATABASE IF NOT EXISTS `oktav_raktarprojekt_02`
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_hungarian_ci;
USE `oktav_raktarprojekt_02`;

-- ADATTABLA LETREHOZASA 1. / CATEGORIES /

USE `oktav_raktarprojekt_02`;
CREATE TABLE `categories` (
	category_id INT AUTO_INCREMENT PRIMARY KEY,
	category_name VARCHAR(50) NOT NULL,
	category_unit VARCHAR(20) NOT NULL
	)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- ADATTABLA LETREHOZASA 2. / PRODUCTS /

USE `oktav_raktarprojekt_02`;
CREATE TABLE `products` (
	product_id INT AUTO_INCREMENT PRIMARY KEY,
	product_name VARCHAR(50) NOT NULL,
	category_id INT NOT NULL,
	product_color VARCHAR(50),
	product_color_code VARCHAR(20),
	product_size VARCHAR(20),
	product_info VARCHAR(100),
	CONSTRAINT fk_category
	FOREIGN KEY (category_id) 
	REFERENCES categories(category_id)
	ON DELETE RESTRICT
	ON UPDATE CASCADE	
	)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- ADATTABLA LETREHOZASA 3. / WAREHOUSES /

USE `oktav_raktarprojekt_02`;
CREATE TABLE `warehouses` (
	warehouse_id INT AUTO_INCREMENT PRIMARY KEY,
	warehouse_name VARCHAR(50) NOT NULL	
	)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- ADATTABLA LETREHOZASA 4. / STATUSES /

USE `oktav_raktarprojekt_02`;
CREATE TABLE `statuses` (
	status_id INT AUTO_INCREMENT PRIMARY KEY,
	status_type VARCHAR(50) NOT NULL,
	status_info VARCHAR(100) NOT NULL
	)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- ADATTABLA LETREHOZASA 5. / STOCK /

USE `oktav_raktarprojekt_02`;
CREATE TABLE `stock` (
	stock_id INT AUTO_INCREMENT PRIMARY KEY,
	product_id INT NOT NULL,
	warehouse_id INT NOT NULL,
	status_id INT NOT NULL,
	product_quantity INT DEFAULT 0 CHECK (product_quantity >= 0),
	CONSTRAINT fk_product
	FOREIGN KEY (product_id) 
	REFERENCES products(product_id)
	ON DELETE RESTRICT
	ON UPDATE CASCADE,
	CONSTRAINT fk_warehouse
	FOREIGN KEY (warehouse_id) 
	REFERENCES warehouses(warehouse_id)
	ON DELETE RESTRICT
	ON UPDATE CASCADE,
	CONSTRAINT fk_status
	FOREIGN KEY (status_id) 
	REFERENCES statuses(status_id)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
	)
	ENGINE=InnoDB
	DEFAULT CHARSET=utf8mb4
	COLLATE=utf8mb4_hungarian_ci;

-- ADATTABLA LETREHOZASA 6. / USERS /

USE `oktav_raktarprojekt_02`;
CREATE TABLE `users` (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	role_name ENUM('admin', 'raktáros', 'raktárvezető', 'beszerző') DEFAULT 'raktáros'
	)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;

-- ADATTABLA LETREHOZASA 7. / OPERATIONS /

USE `oktav_raktarprojekt_02`;
CREATE TABLE `operations` (
	operation_id INT AUTO_INCREMENT PRIMARY KEY,
	stock_id INT NOT NULL,
	user_id INT NOT NULL,
	operation_quantity INT NOT NULL,
	operation__info VARCHAR(100) NOT NULL,
	operation_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_stock
	FOREIGN KEY (stock_id) 
	REFERENCES stock(stock_id)
	ON DELETE RESTRICT
	ON UPDATE CASCADE,
	CONSTRAINT fk_user
	FOREIGN KEY (user_id) 
	REFERENCES users(user_id)
	ON DELETE RESTRICT
	ON UPDATE CASCADE
	)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_hungarian_ci;