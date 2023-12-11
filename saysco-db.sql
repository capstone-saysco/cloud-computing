-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 07:41 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saysco-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `essay`
--

CREATE TABLE `essay` (
  `id` int(11) NOT NULL,
  `pack_id` int(11) NOT NULL,
  `student_name` varchar(255) NOT NULL,
  `student_number` int(11) NOT NULL,
  `answer` text NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `essay-pack`
--

CREATE TABLE `essay-pack` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `essay-pack`
--

INSERT INTO `essay-pack` (`id`, `user_id`, `title`, `question`) VALUES
(2, 5, 'The Pack that Used to Give Example', 'That long essay question.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `refresh_token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `refresh_token`) VALUES
(5, 'Alya', 'zakhiralya@gmail.com', '$2b$10$X4fJyxgwEUySfIE4p2QPte7lL7VZymmhZccy7RggYzgGMp/2R20LK', ''),
(6, 'Alya', 'example@mail.com', '$2b$10$IqINIvj23FC7rihzjvc9zugqo0LFEslr6uql/V7cb.0ZMtwa9KZZe', 'refreshTokenSecret');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `essay`
--
ALTER TABLE `essay`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pack_id` (`pack_id`);

--
-- Indexes for table `essay-pack`
--
ALTER TABLE `essay-pack`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `essay`
--
ALTER TABLE `essay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `essay-pack`
--
ALTER TABLE `essay-pack`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `essay`
--
ALTER TABLE `essay`
  ADD CONSTRAINT `pack_id` FOREIGN KEY (`pack_id`) REFERENCES `essay-pack` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `essay-pack`
--
ALTER TABLE `essay-pack`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
