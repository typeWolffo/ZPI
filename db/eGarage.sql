-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Czas generowania: 25 Maj 2021, 19:05
-- Wersja serwera: 5.7.33
-- Wersja PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `eGarage`
--
CREATE DATABASE IF NOT EXISTS `eGarage` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `eGarage`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Customer`
--

CREATE TABLE IF NOT EXISTS `Customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Surname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Phone` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Mail` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Employee`
--

CREATE TABLE IF NOT EXISTS `Employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Surname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Orders`
--

CREATE TABLE IF NOT EXISTS `Orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `VehicleID` int(11) NOT NULL,
  `CustomerID` int(11) NOT NULL,
  `Comments` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Repairs` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Orders_VehicleID` (`VehicleID`),
  KEY `fk_Orders_CustomerID` (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `OrdersEmployees`
--

CREATE TABLE IF NOT EXISTS `OrdersEmployees` (
  `OrderID` int(11) NOT NULL,
  `EmployeeID` int(11) NOT NULL,
  KEY `fk_OrdersEmployees_OrderID` (`OrderID`),
  KEY `fk_OrdersEmployees_EmployeeID` (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `Vehicle`
--

CREATE TABLE IF NOT EXISTS `Vehicle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `RegNumber` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Vin` varchar(17) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `fk_Orders_CustomerID` FOREIGN KEY (`CustomerID`) REFERENCES `Customer` (`id`),
  ADD CONSTRAINT `fk_Orders_VehicleID` FOREIGN KEY (`VehicleID`) REFERENCES `Vehicle` (`id`);

--
-- Ograniczenia dla tabeli `OrdersEmployees`
--
ALTER TABLE `OrdersEmployees`
  ADD CONSTRAINT `fk_OrdersEmployees_EmployeeID` FOREIGN KEY (`EmployeeID`) REFERENCES `Employee` (`id`),
  ADD CONSTRAINT `fk_OrdersEmployees_OrderID` FOREIGN KEY (`OrderID`) REFERENCES `Orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
