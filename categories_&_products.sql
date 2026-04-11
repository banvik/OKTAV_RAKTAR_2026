USE `oktav_raktarprojekt_02`;

-- 1. Kategóriák feltöltése
INSERT INTO `categories` (`category_name`, `category_unit`) VALUES
('lemezáru', 'm2'),
('szálanyag', 'm'),
('darabáru', 'db');

-- 2. Termékek feltöltése (figyelve az ékezetes nevekre és a kategória ID-kra)
-- Tegyük fel: 1=lemezáru, 2=szálanyag, 3=darabáru
INSERT INTO `products` 
(`product_name`, `category_id`, `product_color`, `product_color_code`, `product_size`, `product_info`) 
VALUES
-- 1. Kategória: tábla anyag (m2) - main_size: Szélesség x Hosszúság mm
('Polikarbonát üregkamrás 10mm', 1, 'Víztiszta', '#F0F8FF', '2100x6000', 'UV védett, többkamrás'),
('Alu-Dibond lemez 3mm', 1, 'Ezüst szálcsiszolt', '#C0C0C0', '1500x3050', 'Reklámipari szendvicslemez'),
('Plexi lemez (Extrudált)', 1, 'Opál', '#F8F8FF', '2050x3050', '30% fényáteresztés, világító táblákhoz'),
('Horganyzott acéllemez 0.5mm', 1, 'Ezüst', '#BEBEBE', '1000x2000', 'DX51D minőség, tüzihorganyzott'),
('Alumínium lemez 1.5mm', 1, 'Natúr', '#D3D3D3', '1000x2000', 'AlMg3 ötvözet, dekoratív célra'),
('PVC habosított lemez 5mm', 1, 'Fehér', '#FFFFFF', '2050x3050', 'Könnyű, vágható reklámhordozó'),
('Kapa mount szendvicslemez', 1, 'Fehér', '#FCFCFC', '1400x3000', 'PUR keményhab maggal'),
('PET-G lemez 2mm', 1, 'Víztiszta', '#F0FFFF', '1250x2050', 'Ütésálló, élelmiszerbiztos'),
('Méhsejt karton lemez', 1, 'Barna', '#D2B48C', '1200x2400', 'Környezetbarát display alapanyag'),
('Alumínium kompozit lemez', 1, 'Antracit', '#2F4F4F', '1250x4050', 'PE mag, UV-álló bevonat'),
('Polisztirol lemez 2mm', 1, 'Fekete', '#000000', '1000x2000', 'Fényes felület, vákuumformázható'),
('Mágnesfólia tekercses', 1, 'Sötétszürke', '#333333', '620x10000', 'Gépjármű dekorációhoz, ollóval vágható'),
('Akril tükör lemez', 1, 'Ezüst-Tükör', '#E8E8E8', '2050x3050', 'Könnyű, biztonságos tükörfelület'),
('Parafatábla natúr', 1, 'Barna', '#CD853F', '1000x1500', 'Irodai üzenőfal alap'),
('Gipszkarton építőlemez', 1, 'Szürke', '#DCDCDC', '1200x2000', 'Standard 12.5mm vastagság'),

-- 2. Kategória: szálanyag (m) - main_size: Átmérő/Profil x Szálhossz mm
('Alu cső kerek 20x2', 2, 'Natúr alu', '#E5E4E2', 'D20x6000', 'AlMgSi0.5 ötvözet'),
('Plexi rúd (Öntött)', 2, 'Víztiszta', '#FFFFFF', 'D30x2000', 'Nagy tisztaságú akril rúd'),
('Alu zártszelvény 40x20x2', 2, 'Natúr alu', '#D3D3D3', '40x20x6000', 'Derékszögű üreges profil'),
('Alu U-profil 20x20x2', 2, 'Ezüst eloxált', '#C0C0C0', '20x20x5000', 'Védő és díszítő keret'),
('Plexi cső 50/44', 2, 'Víztiszta', '#F0F8FF', '50/44x2000', '50mm külső, 44mm belső'),
('Alu T-profil 30x30', 2, 'Natúr alu', '#BEBEBE', '30x30x6000', 'T-alakú szerkezeti profil'),
('Réz rúd kör 10mm', 2, 'Sárgaréz', '#B8860B', 'D10x3000', 'Műszaki és dekor célra'),
('Szénszálas cső', 2, 'Fekete', '#1A1A1A', 'D12x1000', 'Carbon-fiber merevítő'),
('PVC cső merev', 2, 'Szürke', '#708090', 'D32x2000', 'Műanyag elektromos védőcső'),
('Alu L-profil 40x40', 2, 'Fehér', '#FFFFFF', '40x40x3000', 'Porszórt RAL9016'),
('PC H-profil 10mm', 2, 'Víztiszta', '#F5F5F5', '10x6000', 'Polikarbonát toldó profil'),
('Polikarbonát U-profil', 2, 'Víztiszta', '#F0F8FF', '10x2100', 'Vízorros lezáró profil'),
('Rozsdamentes köracél', 2, 'Inox', '#A9A9A9', 'D12x4000', 'A2 minőségű rozsdamentes rúd'),
('LED alu profil', 2, 'Fekete', '#000000', '18x2000', 'Hűtőborda LED szalaghoz'),
('Alu rúd négyzet 20x20', 2, 'Natúr alu', '#D3D3D3', '20x20x3000', 'Tömör alumínium szál'),

-- 3. Kategória: darabáru (db) - main_size: Méret jelölése (pl. M8x40)
('Hatlapfejű csavar M8', 3, 'Horganyzott', '#BEBEBE', 'M8x40', 'DIN 933 horganyzott'),
('Önfúró lemezcsavar', 3, 'Ezüst', '#DCDCDC', '5.5x25', 'EPDM gumi alátéttel'),
('Plexi zsanér', 3, 'Víztiszta', '#F0FFFF', '45x45', 'Ragasztható akril zsanér'),
('Távtartó reklámtáblához', 3, 'Inox', '#E0E0E0', '19/25', '19mm átmérő, 25mm távolság'),
('Horganyzott anya', 3, 'Ezüst', '#BEBEBE', 'M8', 'DIN 934 hatlapú anya'),
('Lapos alátét', 3, 'Ezüst', '#BEBEBE', 'M8', 'DIN 125 normál alátét'),
('Pop szegecs', 3, 'Alu', '#C0C0C0', '4x10', 'Húzószegecs normál fejjel'),
('Műanyag távtartó gyűrű', 3, 'Fekete', '#000000', 'D10x5', 'Poliamid szigetelő távtartó'),
('Plexi ragasztó Acrifix', 3, 'Színtelen', '#FFFFFF', '100ml', 'Egykomponensű oldószeres'),
('Kétoldalas ragasztószalag', 3, 'Átlátszó', '#F0F8FF', '19mmx50m', '3M VHB extra erős'),
('Gumipók kampós', 3, 'Piros', '#FF0000', 'D8x1000', 'Rugalmas ponyvarögzítő'),
('Műanyag sarokvédő', 3, 'Fehér', '#FFFFFF', '50x50', 'Élvédő csomagoláshoz'),
('Vakfurat dugó', 3, 'Szürke', '#808080', 'D20', 'Lyukzáró műanyag kupak'),
('Szárnyas anya', 3, 'Horganyzott', '#BEBEBE', 'M6', 'Kézzel húzható csavaranya'),
('Rugós alátét', 3, 'Kékített', '#4682B4', 'M10', 'DIN 127 biztosító alátét');