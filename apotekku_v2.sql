-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Nov 2022 pada 02.44
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `apotekku_v2`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `nameCategory` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`categoryId`, `nameCategory`) VALUES
(10, 'Obat Keras'),
(20, 'Obat Narkotika');

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_pembelian`
--

CREATE TABLE `detail_pembelian` (
  `ID` int(11) NOT NULL,
  `ID_pembelian` int(11) NOT NULL,
  `ID_obat` int(11) NOT NULL,
  `jumlah_satuan_obat` int(255) NOT NULL,
  `subtotal` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_pembelian`
--

INSERT INTO `detail_pembelian` (`ID`, `ID_pembelian`, `ID_obat`, `jumlah_satuan_obat`, `subtotal`) VALUES
(1, 1, 10, 3, 33000),
(2, 1, 20, 2, 22000);

--
-- Trigger `detail_pembelian`
--
DELIMITER $$
CREATE TRIGGER `update_pembelian_insert` AFTER INSERT ON `detail_pembelian` FOR EACH ROW BEGIN
    UPDATE pembelian
    JOIN detail_pembelian ON pembelian.id = detail_pembelian.ID_pembelian
    SET total = total + NEW.subtotal
    WHERE pembelian.ID = NEW.ID_pembelian;
    UPDATE medicene
    SET Stock = Stock + NEW.jumlah_satuan_obat
    WHERE medicene.idMedicene = NEW.ID_obat;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `detail_penjualan`
--

CREATE TABLE `detail_penjualan` (
  `ID` int(11) NOT NULL,
  `ID_penjualan` int(11) NOT NULL,
  `ID_obat` int(11) NOT NULL,
  `jumlah_satuan_obat` int(11) NOT NULL,
  `Subtotal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `detail_penjualan`
--

INSERT INTO `detail_penjualan` (`ID`, `ID_penjualan`, `ID_obat`, `jumlah_satuan_obat`, `Subtotal`) VALUES
(1, 1, 10, 3, 33000),
(2, 1, 20, 2, 22000);

--
-- Trigger `detail_penjualan`
--
DELIMITER $$
CREATE TRIGGER `update_penjualan_insert` AFTER INSERT ON `detail_penjualan` FOR EACH ROW BEGIN
    UPDATE penjualan
    JOIN detail_penjualan ON penjualan.id = detail_penjualan.ID_penjualan
    SET total = total + NEW.subtotal
    WHERE NEW.ID_penjualan = penjualan.ID;
    UPDATE medicene
    SET Stock = Stock - NEW.jumlah_satuan_obat
    WHERE medicene.idMedicene = NEW.ID_obat;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktur dari tabel `medicene`
--

CREATE TABLE `medicene` (
  `idMedicene` int(11) NOT NULL,
  `namaObat` varchar(50) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `unitId` int(11) NOT NULL,
  `storageId` int(11) NOT NULL,
  `tglKadaluarsa` date NOT NULL,
  `hargaBeli` int(11) NOT NULL,
  `supplierId` int(11) NOT NULL,
  `hargaJual` int(11) NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `medicene`
--

INSERT INTO `medicene` (`idMedicene`, `namaObat`, `categoryId`, `stock`, `unitId`, `storageId`, `tglKadaluarsa`, `hargaBeli`, `supplierId`, `hargaJual`, `keterangan`) VALUES
(10, 'Amoxcilin', 10, 100, 10, 10, '2023-11-15', 10000, 10, 11000, 'Obat Baru'),
(20, 'Paracetamol', 10, 200, 20, 20, '2023-11-15', 10000, 20, 11000, 'Obat Paracetamol');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembelian`
--

CREATE TABLE `pembelian` (
  `ID` int(11) NOT NULL,
  `total` int(255) NOT NULL,
  `tgl_transaksi` date NOT NULL,
  `ID_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `pembelian`
--

INSERT INTO `pembelian` (`ID`, `total`, `tgl_transaksi`, `ID_users`) VALUES
(1, 55000, '2022-11-20', 1001);

-- --------------------------------------------------------

--
-- Struktur dari tabel `penjualan`
--

CREATE TABLE `penjualan` (
  `ID` int(11) NOT NULL,
  `customer` varchar(255) NOT NULL,
  `total` int(11) NOT NULL,
  `tgl_transaksi` date NOT NULL,
  `ID_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `penjualan`
--

INSERT INTO `penjualan` (`ID`, `customer`, `total`, `tgl_transaksi`, `ID_users`) VALUES
(1, 'Bram', 55000, '2022-11-20', 1001);

-- --------------------------------------------------------

--
-- Struktur dari tabel `storage`
--

CREATE TABLE `storage` (
  `storageId` int(11) NOT NULL,
  `nameStorage` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `storage`
--

INSERT INTO `storage` (`storageId`, `nameStorage`) VALUES
(10, 'Rak 1'),
(20, 'Gudang 1');

-- --------------------------------------------------------

--
-- Struktur dari tabel `supplier`
--

CREATE TABLE `supplier` (
  `supplierId` int(11) NOT NULL,
  `nameSupplier` varchar(50) NOT NULL,
  `alamatSupplier` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `supplier`
--

INSERT INTO `supplier` (`supplierId`, `nameSupplier`, `alamatSupplier`) VALUES
(10, 'PT. Kimia Farma', 'Jl. Ahmad Yani'),
(20, 'PT. Sanbe Farma', 'Jl. Jakarta');

-- --------------------------------------------------------

--
-- Struktur dari tabel `unit`
--

CREATE TABLE `unit` (
  `unitId` int(11) NOT NULL,
  `nameUnit` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `unit`
--

INSERT INTO `unit` (`unitId`, `nameUnit`) VALUES
(10, 'Kapsul'),
(20, 'Tablet');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `NIP` int(11) NOT NULL,
  `Passwords` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`ID`, `Name`, `Email`, `NIP`, `Passwords`, `Role`) VALUES
(1001, 'Rizky', 'rizky@gmail.com', 30079944, '$2a$10$ZiPrGWFoNQ/b4rerwfEEIuy3TT6QHiHNNhob8ZcY.y452GH9Ha2Wm', 'user'),
(1002, 'Bram', 'bram@gmail.com', 140744300, '$2a$10$h53vYFFZ8ZhSek42uqZ2oug032Z0VT0YndOOmsuuSb1BiyeNtXRLu', 'superuser');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indeks untuk tabel `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_pembelian` (`ID_pembelian`),
  ADD KEY `ID_obat` (`ID_obat`);

--
-- Indeks untuk tabel `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_penjualan` (`ID_penjualan`),
  ADD KEY `ID_obat` (`ID_obat`);

--
-- Indeks untuk tabel `medicene`
--
ALTER TABLE `medicene`
  ADD PRIMARY KEY (`idMedicene`);

--
-- Indeks untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_users` (`ID_users`);

--
-- Indeks untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_users` (`ID_users`);

--
-- Indeks untuk tabel `storage`
--
ALTER TABLE `storage`
  ADD PRIMARY KEY (`storageId`);

--
-- Indeks untuk tabel `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplierId`);

--
-- Indeks untuk tabel `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`unitId`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `detail_pembelian`
--
ALTER TABLE `detail_pembelian`
  ADD CONSTRAINT `detail_pembelian_ibfk_1` FOREIGN KEY (`ID_pembelian`) REFERENCES `pembelian` (`ID`),
  ADD CONSTRAINT `detail_pembelian_ibfk_2` FOREIGN KEY (`ID_obat`) REFERENCES `medicene` (`idMedicene`);

--
-- Ketidakleluasaan untuk tabel `detail_penjualan`
--
ALTER TABLE `detail_penjualan`
  ADD CONSTRAINT `detail_penjualan_ibfk_1` FOREIGN KEY (`ID_penjualan`) REFERENCES `penjualan` (`ID`),
  ADD CONSTRAINT `detail_penjualan_ibfk_2` FOREIGN KEY (`ID_obat`) REFERENCES `medicene` (`idMedicene`);

--
-- Ketidakleluasaan untuk tabel `pembelian`
--
ALTER TABLE `pembelian`
  ADD CONSTRAINT `pembelian_ibfk_1` FOREIGN KEY (`ID_users`) REFERENCES `users` (`ID`);

--
-- Ketidakleluasaan untuk tabel `penjualan`
--
ALTER TABLE `penjualan`
  ADD CONSTRAINT `penjualan_ibfk_1` FOREIGN KEY (`ID_users`) REFERENCES `users` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
