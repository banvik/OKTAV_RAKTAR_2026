USE `oktav_raktarprojekt_02`;

-- 1. Készletek feltöltése
INSERT INTO `stock` (`product_id`, `warehouse_id`, `product_quantity`) VALUES
-- 1. Kategória: Táblák (Alacsonyabb darabszámok)
(1, 2, 12),   -- Polikarbonát, Lemez Depó, Raktáron
(2, 2, 25),   -- Alu-Dibond, Lemez Depó, Raktáron
(3, 2, 8),    -- Plexi, Lemez Depó, Foglalt
(4, 1, 50),   -- Horganyzott lemez, Központi, Raktáron
(5, 1, 3),    -- Alumínium lemez, Központi, Selejt
(6, 2, 40),   -- PVC habosított, Lemez Depó, Raktáron
(7, 3, 15),   -- Kapa mount, Szálanyag Raktár, Raktáron
(8, 2, 20),   -- PET-G, Lemez Depó, Beszerzés alatt
(9, 1, 100),  -- Méhsejt karton, Központi, Raktáron
(10, 2, 10),  -- Alu kompozit, Lemez Depó, Raktáron
(11, 2, 5),   -- Polisztirol, Lemez Depó, Zárolt
(12, 4, 150), -- Mágnesfólia, Aprócikk Raktár, Raktáron
(13, 2, 7),    -- Akril tükör, Lemez Depó, Raktáron
(14, 1, 30),  -- Parafatábla, Központi, Raktáron
(15, 4, 60),  -- Gipszkarton, Kültéri Tároló, Raktáron

-- 2. Kategória: Szálanyagok (Közepes darabszámok)
(16, 3, 120), -- Alu cső, Szálanyag Raktár, Raktáron
(17, 3, 45),  -- Plexi rúd, Szálanyag Raktár, Raktáron
(18, 3, 24),  -- Alu zártszelvény, Szálanyag Raktár, Foglalt
(19, 3, 80),  -- Alu U-profil, Szálanyag Raktár, Raktáron
(20, 3, 2),   -- Plexi cső, Szálanyag Raktár, Selejt
(21, 1, 60),  -- Alu T-profil, Központi, Raktáron
(22, 4, 35),  -- Réz rúd, Aprócikk Raktár, Raktáron
(23, 4, 10),  -- Szénszálas cső, Aprócikk Raktár, Beszerzés alatt
(24, 3, 200), -- PVC cső, Szálanyag Raktár, Raktáron
(25, 3, 95),  -- Alu L-profil, Szálanyag Raktár, Raktáron
(26, 3, 150), -- PC H-profil, Szálanyag Raktár, Raktáron
(27, 3, 300), -- Polikarbonát U, Szálanyag Raktár, Raktáron
(28, 3, 15),  -- Inox köracél, Szálanyag Raktár, Zárolt
(29, 4, 40),  -- LED profil, Aprócikk Raktár, Raktáron
(30, 3, 25),  -- Alu rúd négyzet, Szálanyag Raktár, Raktáron

-- 3. Kategória: Aprócikkek (Magas darabszámok)
(31, 4, 1500), -- M8 Csavar, Aprócikk Raktár, Raktáron
(32, 4, 3000), -- Önfúró csavar, Aprócikk Raktár, Raktáron
(33, 4, 500),  -- Plexi zsanér, Aprócikk Raktár, Foglalt
(34, 4, 250),  -- Távtartó, Aprócikk Raktár, Raktáron
(35, 4, 5000), -- M8 Anya, Aprócikk Raktár, Raktáron
(36, 4, 8000), -- M8 Alátét, Aprócikk Raktár, Raktáron
(37, 4, 2000), -- Pop szegecs, Aprócikk Raktár, Raktáron
(38, 4, 100),  -- Műanyag távtartó, Aprócikk Raktár, Selejt
(39, 4, 45),   -- Acrifix ragasztó, Aprócikk Raktár, Raktáron
(40, 4, 120),  -- Kétoldalas ragasztó, Aprócikk Raktár, Beszerzés alatt
(41, 1, 50),   -- Gumipók, Központi, Raktáron
(42, 4, 400),  -- Sarokvédő, Aprócikk Raktár, Raktáron
(43, 4, 600),  -- Vakfurat dugó, Aprócikk Raktár, Raktáron
(44, 4, 350),  -- Szárnyas anya, Aprócikk Raktár, Raktáron
(45, 4, 1200); -- Rugós alátét, Aprócikk Raktár, Raktáron
