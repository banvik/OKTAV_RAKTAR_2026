USE `oktav_raktarprojekt_02`;

-- 1. Raktárak feltöltése
INSERT INTO `warehouses` (`warehouse_name`) VALUES
('főraktár'),
('átmeneti raktár'),
('zárolt raktár'),
('selejt raktár');

-- 2. Státuszok feltöltése
INSERT INTO `statuses` (`status_type`, `status_info`) VALUES
('Raktáron', 'Szabadon felhasználható, kiadható készlet'),
('Foglalt', 'Konkrét vevői vagy gyártási megrendeléshez befoglalt tétel'),
('Beszerzés alatt', 'Beszállítótól megrendelve, várható beérkezés folyamatban'),
('Zárolt készlet', 'Minőségellenőrzés vagy leltár miatt átmenetileg zárolva'),
('Selejt / Sérült', 'Szállításban vagy tárolásban megsérült, nem kiadható anyag');
