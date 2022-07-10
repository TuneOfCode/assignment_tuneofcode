-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 10, 2022 at 03:11 PM
-- Server version: 5.7.33
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assignment_tuneofcode`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `date_start` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subject` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'None',
  `leader_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `date_start`, `subject`, `leader_id`, `created_at`, `updated_at`) VALUES
(1, 'ReactJS', '2022-07-03 15:16:21', 'It\'s a JavaScript library for building user interfaces', 2, '2022-07-04 10:08:55', '2022-07-04 10:08:55'),
(2, 'AngurlarJS', '2022-07-03 15:18:14', 'It\'s a development platform, built on TypeScript', 4, '2022-07-04 10:08:55', '2022-07-04 10:08:55'),
(3, 'NodeJS', '2022-07-05 12:41:06', 'It is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.', 6, '2022-07-05 12:41:06', '2022-07-05 12:45:14'),
(4, 'Lararvel', '2022-07-05 12:43:18', 'It is a web application framework with expressive, elegant syntax', 6, '2022-07-05 12:43:18', '2022-07-05 12:43:18'),
(5, 'NestJS', '2022-07-05 18:36:41', 'It is a framework for building efficient, scalable Node.js web applications.', 2, '2022-07-05 18:36:41', '2022-07-10 03:52:49'),
(6, 'VueJS', '2022-07-10 10:38:20', 'An approachable, performant and versatile framework for building web user interfaces.', 4, '2022-07-10 10:38:20', '2022-07-10 10:38:20');

-- --------------------------------------------------------

--
-- Table structure for table `groups_users`
--

CREATE TABLE `groups_users` (
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_vietnamese_ci NOT NULL,
  `email` varchar(200) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `sex` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `is_leader` tinyint(4) NOT NULL DEFAULT '0',
  `birth_place` varchar(50) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT 'https://www.w3schools.com/howto/img_avatar.png',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `sex`, `is_leader`, `birth_place`, `birth_date`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'Lem Sabbatier', 'lsabbatier0@dailymotion.com', 'Male', 0, '1 8th Drive', '1997-03-20', 'https://robohash.org/accusantiumestmagnam.png?size=50x50&set=set1', '2022-07-04 02:12:53', '2022-07-04 02:12:53'),
(2, 'Kylynn Clowton', 'kclowton1@macromedia.com', 'Female', 1, '833 Buell Parkway', '2015-07-08', 'https://robohash.org/nemovelitsunt.png?size=50x50&set=set1', '2022-07-04 09:13:21', '2022-07-05 17:18:24'),
(3, 'Doug Elsby', 'delsby2@clickbank.net', 'Female', 0, '48168 Pennsylvania Plaza', '1999-04-20', 'https://robohash.org/minimasequinulla.png?size=50x50&set=set1', '2022-07-04 09:13:21', '2022-07-09 09:16:57'),
(4, 'Meredithe Biasi', 'mbiasi3@chron.com', 'Genderfluid', 1, '4861 Weeping Birch Parkway', '2019-03-11', 'https://robohash.org/sintautest.png?size=50x50&set=set1', '2022-07-04 09:13:21', '2022-07-04 09:13:21'),
(5, 'Stacee Sperski', 'ssperski4@dot.gov', 'Female', 0, '5142 Dwight Way', '1982-02-21', 'https://robohash.org/nihileumqui.png?size=50x50&set=set1', '2022-07-04 09:13:21', '2022-07-04 09:13:21'),
(6, 'Trần Thanh Tú', 'kingproup1111@gmail.com', 'Male', 1, 'Phú Lộc, Huế', '2002-08-22', 'https://www.w3schools.com/howto/img_avatar.png', '2022-07-05 12:39:43', '2022-07-08 03:27:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `fk_leader_id` (`leader_id`);

--
-- Indexes for table `groups_users`
--
ALTER TABLE `groups_users`
  ADD PRIMARY KEY (`user_id`,`group_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `group_id` (`group_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`leader_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `groups_users`
--
ALTER TABLE `groups_users`
  ADD CONSTRAINT `groups_users_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`),
  ADD CONSTRAINT `groups_users_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
