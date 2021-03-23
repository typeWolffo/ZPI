-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: mysql-db
-- Czas generowania: 23 Mar 2021, 18:20
-- Wersja serwera: 5.7.33
-- Wersja PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `workshop_app`
--
CREATE DATABASE IF NOT EXISTS `workshop_app` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `workshop_app`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `customers`
--

CREATE TABLE IF NOT EXISTS `customers`
(
    `id`      int(255)                                              NOT NULL AUTO_INCREMENT,
    `name`    text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `surname` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `employees`
--

CREATE TABLE IF NOT EXISTS `employees`
(
    `id`      int(11)                                                    NOT NULL AUTO_INCREMENT,
    `name`    char(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `surname` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `history`
--

CREATE TABLE IF NOT EXISTS `history`
(
    `id`                int(255)                                                   NOT NULL AUTO_INCREMENT,
    `customer_comments` char(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `repairs`           char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `repair_order`      int(225)                                                   NOT NULL,
    `vin`               char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`id`),
    KEY `vin` (`vin`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `vehicles`
--

CREATE TABLE IF NOT EXISTS `vehicles`
(
    `id`         int(11)                                                    NOT NULL,
    `make`       text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci      NOT NULL,
    `model`      char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `reg_number` char(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `vin`        char(225) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (`vin`),
    KEY `id` (`id`)
) ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `history`
--
ALTER TABLE `history`
    ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`vin`) REFERENCES `vehicles` (`vin`);

--
-- Ograniczenia dla tabeli `vehicles`
--
ALTER TABLE `vehicles`
    ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`id`) REFERENCES `customers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;