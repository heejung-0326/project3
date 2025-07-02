-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 25-06-20 10:53
-- 서버 버전: 10.4.32-MariaDB
-- PHP 버전: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `kdt`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `rego_user`
--

CREATE TABLE `rego_user` (
  `no` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `userid` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `datetime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- 테이블의 덤프 데이터 `rego_user`
--

INSERT INTO `rego_user` (`no`, `userid`, `password`, `nickname`, `email`, `datetime`) VALUES
(1, '1234', '$2b$10$EGc4ZlvPOYbzJ2pCJvaQvukGHmWNDcUvcLGty3oJIpI4ISVomV5ve', '1234', 'test@naver.com', '2025-06-16 08:26:26'),
(2, 'hee1', '$2b$10$nw7fx6Th4PcgrVvFT5U45urk8O0edpUSNNs.FWNkKnXDX2tM0wIC6', 'dd', 'test@naver.com', '2025-06-17 05:58:04'),
(3, 'hee2', '$2b$10$Bl3tteALL65l1uNvn7EBKeahN03Eq1WA0PrDrVmyQtl6Jv.QGiWDS', 'ee', 'test@naver.com', '2025-06-17 06:57:44'),
(4, 'hee3', '$2b$10$7ZCBwmqAwGL1B88zHGxbG.q1Yftdy4mTLYwlvPnwUHfnnok.q1392', 'ddd', 'test@naver.com', '2025-06-17 07:43:37');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `rego_user`
--
ALTER TABLE `rego_user`
  ADD PRIMARY KEY (`no`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `rego_user`
--
ALTER TABLE `rego_user`
  MODIFY `no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
