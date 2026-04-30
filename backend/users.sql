USE `oktav_raktarprojekt_02`;

-- 1. Felhasználók feltöltése
INSERT INTO `users` (username, full_name, password_hash, role_name) VALUES
('kristof', 'Csepei Kristóf', 'password_123', 'admin'),
('miki', 'Pap Miklós', 'password_345', 'raktáros'),
('viktor', 'Bán Viktor', 'password_567', 'raktárvezető'),

