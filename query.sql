-- Pembuatan database dan tabel

-- Database apotekku
CREATE DATABASE apotekku;

--Tabel users
CREATE TABLE users (
    ID int NOT NULL PRIMARY KEY,
    Name varchar(255) NOT NULL,
    Email varchar(255) NOT NULL,
    NIP int NOT NULL,
    Passwords varchar(255) NOT NULL,
    Role varchar(255) NOT NULL
);

--Tabel kategori
CREATE TABLE kategori (
    ID int NOT NULL PRIMARY KEY,
    Nama varchar(255) NOT NULL
);

--Tabel penyimpanan
CREATE TABLE penyimpanan (
    ID int NOT NULL PRIMARY KEY,
    Nama varchar(255) NOT NULL
);

--Tabel supplier
CREATE TABLE supplier (
    ID int NOT NULL PRIMARY KEY,
    Nama varchar(255) NOT NULL
    Alamat varchar(255) NOT NULL
);

--Tabel satuan_obat
CREATE TABLE satuan_obat (
    ID int NOT NULL PRIMARY KEY,
    Nama varchar(255) NOT NULL
);

-- Tabel obat
CREATE TABLE Obat (
    ID int NOT NULL PRIMARY KEY,
    Nama varchar(255) NOT NULL,
    ID_kategori int NOT NULL,
    Stock int NOT NULL,
    ID_satuan_obat int NOT NULL,
    ID_penyimpanan int NOT NULL,
    tgl_kadaluarsa date NOT NULL,
    harga_eceran int NOT NULL,
    harga_grosir int NOT NULL,
    harga_beli int NOT NULL,
    ID_supplier int NOT NULL,
    keterangan varchar(255),
    FOREIGN KEY (ID_kategori) REFERENCES kategori(ID),
    FOREIGN KEY (ID_penyimpanan) REFERENCES penyimpanan(ID),
    FOREIGN KEY (ID_satuan_obat) REFERENCES satuan_obat(ID),
    FOREIGN KEY (ID_supplier) REFERENCES supplier(ID)
);

-- Tabel penjualan
CREATE TABLE penjualan (
    ID int NOT NULL PRIMARY KEY,
    customer varchar(255) NOT NULL,
    total int NOT NULL,
    tgl_transaksi date NOT NULL,
    ID_users int NOT NULL,
    FOREIGN KEY (ID_users) REFERENCES users(ID)
);

-- Tabel detail penjualan
CREATE TABLE detail_penjualan (
    ID int NOT NULL PRIMARY KEY,
    ID_penjualan int NOT NULL,
    ID_obat int NOT NULL,
    jumlah_satuan_obat int NOT NULL,
    Subtotal INT NOT NULL,
    FOREIGN KEY (ID_penjualan) REFERENCES penjualan(ID),
    FOREIGN KEY (ID_obat) REFERENCES obat(ID)
); 

-- Tabel pembelian
CREATE TABLE pembelian(
    ID int NOT NULL PRIMARY KEY,
    total int(255) NOT NULL,
    tgl_transaksi date NOT NULL,
    ID_users int NOT NULL,
    FOREIGN KEY (ID_users) REFERENCES users(ID)
);

-- Tabel detail_pembelian
CREATE TABLE detail_pembelian(
    ID int NOT NULL PRIMARY KEY,
    ID_pembelian int NOT NULL, 
    ID_obat int NOT NULL,
    jumlah_satuan_obat int(255) NOT NULL,
    subtotal int(255) NOT NULL,
    FOREIGN KEY (ID_pembelian) REFERENCES pembelian(ID),
    FOREIGN KEY (ID_obat) REFERENCES obat(ID)
);

-- Insert untuk tiap tabel

-- Child table (tabel yang tidak punya foreign key -> bisa diinsert terlebih dahulu)
INSERT INTO kategori (ID, Nama)
VALUES (1, 'obat bebas'), (2, 'obat bebas terbatas');

INSERT INTO satuan_obat (ID, Nama)
VALUES (1, 'butir'), (2, 'botol'), (3, 'tablet'), (4, 'strip');

INSERT INTO supplier (ID, Nama, Alamat)
VALUES (1, 'PT. Glaxo Wellcome Indonesia', 'Jalan Merbabu'), (2, 'Cendo Indonesia', 'Jalan Merapi'), (3, 'Kimia Farma', 'Jalan Semeru');

INSERT INTO users (ID, Name, Email, NIP, Passwords, Role)
VALUES (1, 'Bram', 'bram@gmail.com', 32312312, 'bram123', 'user'),
(2, 'Rizky', 'rizky@gmail.com', 22312312, 'rizky123', 'admin'),
(3, 'Zaki', 'zaki@gmail.com', 12312312, 'zaki123', 'superuser');

INSERT INTO penyimpanan (ID, Nama)
VALUES (1, 'Lemari A-1'), (2, 'Lemari A-2'), (3, 'Lemari A-3');

-- Parent table (tabel yang mempunyai foreign key -> diinsert setelah child)

INSERT INTO obat (ID, Nama, ID_kategori, Stock, ID_satuan_obat, ID_penyimpanan, tgl_kadaluarsa, harga_eceran, harga_grosir, harga_beli, ID_supplier, keterangan) VALUES (1, 'Panadol', 2, 1000, 4, 2, '2024-12-17', 8000, 7000, 5000, 2, 'obat flu generik'), (2, ‘Paracetamol’, 100, 2, 1, ‘2023-12-17’, 12000, 10000, 8000, 3, ‘obat demam’);

INSERT INTO pembelian (ID, total, tgl_transaksi, ID_users)
VALUES (1, 0, '2022-12-17', 1);

INSERT INTO penjualan (ID, customer,  total, tgl_transaksi, ID_users)
VALUES (1,’Agus’, 0, '2022-12-17', 1), (2,’Jabar’’, 0, DATE '2022-11-05', 1);

SET @harga_subtotal = ((SELECT harga_beli FROM obat WHERE obat.ID = 2) * 2);
INSERT INTO detail_pembelian (ID, ID_pembelian, ID_obat, jumlah_satuan_obat, subtotal)
VALUES (1, 1, 2, 2, @harga_subtotal);

– Insert Detail Penjualan dengan harga_eceran obat
SET @harga_subtotal = ((SELECT harga_eceran FROM obat WHERE obat.ID = 1) * 16);
INSERT INTO detail_penjualan (ID, ID_penjualan, ID_obat, jumlah_satuan_obat, Subtotal)
VALUES (3, 2, 1, 16, @harga_subtotal);

-- Trigger
/* Trigger untuk mengupdate total di tabel Penjualan setelah melakukan Insert di Detail Penjualan */

DROP TRIGGER update_penjualan_insert;
DELIMITER $$
CREATE TRIGGER update_penjualan_insert
AFTER INSERT
    ON detail_penjualan 
    FOR EACH ROW
BEGIN
    UPDATE penjualan
    JOIN detail_penjualan ON penjualan.id = detail_penjualan.ID_penjualan
    SET total = total + NEW.subtotal
    WHERE NEW.ID_penjualan = penjualan.ID;
    UPDATE medicene
    SET Stock = Stock - NEW.jumlah_satuan_obat
    WHERE medicene.idMedicene = NEW.ID_obat;
END$$
DELIMITER ;

/* Trigger untuk mengupdate total di tabel Pembelian setelah melakukan Insert di Detail Pembelian */

DROP TRIGGER update_pembelian_insert;

DELIMITER $$
CREATE TRIGGER update_pembelian_insert
AFTER INSERT
    ON detail_pembelian 
    FOR EACH ROW
BEGIN
    UPDATE pembelian
    JOIN detail_pembelian ON pembelian.id = detail_pembelian.ID_pembelian
    SET total = total + NEW.subtotal
    WHERE pembelian.ID = NEW.ID_pembelian;
    UPDATE medicene
    SET Stock = Stock + NEW.jumlah_satuan_obat
    WHERE medicene.idMedicene = NEW.ID_obat;
END$$
DELIMITER ;

SET @PRICE = ((SELECT harga_eceran FROM obat WHERE obat.ID = 1) * 3);
INSERT INTO detail_pembelian (ID, ID_pembelian, ID_obat, jumlah_satuan_obat, subtotal)
VALUES (2, 1, 1, 3, @PRICE);

/* JOIN */

SELECT detail_penjualan.ID, obat.nama, detail_penjualan.jumlah_satuan_obat, detail_penjualan.Subtotal, detail_penjualan.ID_penjualan, (SELECT SUM(detail_penjualan.Subtotal) AS harga_total FROM detail_penjualan) AS harga_total, penjualan.tgl_transaksi
FROM detail_penjualan
JOIN obat
ON detail_penjualan.ID_obat = obat.ID
JOIN penjualan
ON detail_penjualan.ID_penjualan = penjualan.ID
ORDER BY detail_penjualan.ID DESC;