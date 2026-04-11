USE `oktav_raktarprojekt_02`;

-- 1. Készletek feltöltése
INSERT INTO `stock` (`product_id`, `warehouse_id`, `status_id`, `product_quantity`) VALUES
-- 1. Kategória: Táblák (Alacsonyabb darabszámok)
(1, 2, 1, 12),   -- Polikarbonát, Lemez Depó, Raktáron
(2, 2, 1, 25),   -- Alu-Dibond, Lemez Depó, Raktáron
(3, 2, 2, 8),    -- Plexi, Lemez Depó, Foglalt
(4, 1, 1, 50),   -- Horganyzott lemez, Központi, Raktáron
(5, 1, 4, 3),    -- Alumínium lemez, Központi, Selejt
(6, 2, 1, 40),   -- PVC habosított, Lemez Depó, Raktáron
(7, 3, 1, 15),   -- Kapa mount, Szálanyag Raktár, Raktáron
(8, 2, 3, 20),   -- PET-G, Lemez Depó, Beszerzés alatt
(9, 1, 1, 100),  -- Méhsejt karton, Központi, Raktáron
(10, 2, 1, 10),  -- Alu kompozit, Lemez Depó, Raktáron
(11, 2, 5, 5),   -- Polisztirol, Lemez Depó, Zárolt
(12, 4, 1, 150), -- Mágnesfólia, Aprócikk Raktár, Raktáron
(13, 2, 1, 7),    -- Akril tükör, Lemez Depó, Raktáron
(14, 1, 1, 30),  -- Parafatábla, Központi, Raktáron
(15, 4, 1, 60),  -- Gipszkarton, Kültéri Tároló, Raktáron

-- 2. Kategória: Szálanyagok (Közepes darabszámok)
(16, 3, 1, 120), -- Alu cső, Szálanyag Raktár, Raktáron
(17, 3, 1, 45),  -- Plexi rúd, Szálanyag Raktár, Raktáron
(18, 3, 2, 24),  -- Alu zártszelvény, Szálanyag Raktár, Foglalt
(19, 3, 1, 80),  -- Alu U-profil, Szálanyag Raktár, Raktáron
(20, 3, 4, 2),   -- Plexi cső, Szálanyag Raktár, Selejt
(21, 1, 1, 60),  -- Alu T-profil, Központi, Raktáron
(22, 4, 1, 35),  -- Réz rúd, Aprócikk Raktár, Raktáron
(23, 4, 3, 10),  -- Szénszálas cső, Aprócikk Raktár, Beszerzés alatt
(24, 3, 1, 200), -- PVC cső, Szálanyag Raktár, Raktáron
(25, 3, 1, 95),  -- Alu L-profil, Szálanyag Raktár, Raktáron
(26, 3, 1, 150), -- PC H-profil, Szálanyag Raktár, Raktáron
(27, 3, 1, 300), -- Polikarbonát U, Szálanyag Raktár, Raktáron
(28, 3, 5, 15),  -- Inox köracél, Szálanyag Raktár, Zárolt
(29, 4, 1, 40),  -- LED profil, Aprócikk Raktár, Raktáron
(30, 3, 1, 25),  -- Alu rúd négyzet, Szálanyag Raktár, Raktáron

-- 3. Kategória: Aprócikkek (Magas darabszámok)
(31, 4, 1, 1500), -- M8 Csavar, Aprócikk Raktár, Raktáron
(32, 4, 1, 3000), -- Önfúró csavar, Aprócikk Raktár, Raktáron
(33, 4, 2, 500),  -- Plexi zsanér, Aprócikk Raktár, Foglalt
(34, 4, 1, 250),  -- Távtartó, Aprócikk Raktár, Raktáron
(35, 4, 1, 5000), -- M8 Anya, Aprócikk Raktár, Raktáron
(36, 4, 1, 8000), -- M8 Alátét, Aprócikk Raktár, Raktáron
(37, 4, 1, 2000), -- Pop szegecs, Aprócikk Raktár, Raktáron
(38, 4, 4, 100),  -- Műanyag távtartó, Aprócikk Raktár, Selejt
(39, 4, 1, 45),   -- Acrifix ragasztó, Aprócikk Raktár, Raktáron
(40, 4, 3, 120),  -- Kétoldalas ragasztó, Aprócikk Raktár, Beszerzés alatt
(41, 1, 1, 50),   -- Gumipók, Központi, Raktáron
(42, 4, 1, 400),  -- Sarokvédő, Aprócikk Raktár, Raktáron
(43, 4, 1, 600),  -- Vakfurat dugó, Aprócikk Raktár, Raktáron
(44, 4, 1, 350),  -- Szárnyas anya, Aprócikk Raktár, Raktáron
(45, 4, 1, 1200); -- Rugós alátét, Aprócikk Raktár, Raktáron
