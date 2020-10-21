-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.22 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para no_pain_no_gain
DROP DATABASE IF EXISTS `no_pain_no_gain`;
CREATE DATABASE IF NOT EXISTS `no_pain_no_gain` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_swedish_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `no_pain_no_gain`;

-- Volcando estructura para tabla no_pain_no_gain.ciudad
DROP TABLE IF EXISTS `ciudad`;
CREATE TABLE IF NOT EXISTS `ciudad` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`codigo`),
  UNIQUE KEY `UNIQUE_NOMBRE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- Volcando datos para la tabla no_pain_no_gain.ciudad: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `ciudad` DISABLE KEYS */;
INSERT IGNORE INTO `ciudad` (`codigo`, `nombre`) VALUES
	(1, 'Bogotá'),
	(2, 'Bucaramanga'),
	(4, 'Cali');
/*!40000 ALTER TABLE `ciudad` ENABLE KEYS */;

-- Volcando estructura para tabla no_pain_no_gain.nivel
DROP TABLE IF EXISTS `nivel`;
CREATE TABLE IF NOT EXISTS `nivel` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- Volcando datos para la tabla no_pain_no_gain.nivel: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `nivel` DISABLE KEYS */;
INSERT IGNORE INTO `nivel` (`codigo`, `nombre`) VALUES
	(1, 'administrador'),
	(2, 'usuario');
/*!40000 ALTER TABLE `nivel` ENABLE KEYS */;

-- Volcando estructura para tabla no_pain_no_gain.sede
DROP TABLE IF EXISTS `sede`;
CREATE TABLE IF NOT EXISTS `sede` (
  `codigo` int NOT NULL AUTO_INCREMENT,
  `codigo_ciudad` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `direccion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`codigo`),
  KEY `FK_SEDE_CIUDAD` (`codigo_ciudad`),
  CONSTRAINT `FK_SEDE_CIUDAD` FOREIGN KEY (`codigo_ciudad`) REFERENCES `ciudad` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- Volcando datos para la tabla no_pain_no_gain.sede: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sede` DISABLE KEYS */;
INSERT IGNORE INTO `sede` (`codigo`, `codigo_ciudad`, `nombre`, `direccion`) VALUES
	(1, 1, 'administracion', 'none'),
	(2, 1, 'Sede Principal', 'Cll 123 #1-1');
/*!40000 ALTER TABLE `sede` ENABLE KEYS */;

-- Volcando estructura para tabla no_pain_no_gain.token
DROP TABLE IF EXISTS `token`;
CREATE TABLE IF NOT EXISTS `token` (
  `dni_usuario` int NOT NULL,
  `token` varchar(65) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`dni_usuario`,`token`),
  KEY `FK_TOKEN_USUARIO` (`dni_usuario`),
  CONSTRAINT `FK_TOKEN_USUARIO` FOREIGN KEY (`dni_usuario`) REFERENCES `usuario` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- Volcando datos para la tabla no_pain_no_gain.token: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT IGNORE INTO `token` (`dni_usuario`, `token`, `fecha`) VALUES
	(1000000000, '625206308ddf94833a380d31c8dc9c5b0bf7544dd766c432b488fe6f7ed66851', '2020-10-21 08:29:44'),
	(1000000000, '70b0570e0f38433cabc41d03f8ae61204c0964227cad87758f49247f6d10e116', '2020-10-21 10:29:33'),
	(1000000000, 'ca7dec787805f63378d876ebf8e4353cf762f7ca09fcdc6906f2b76aec26dc1d', '2020-10-21 10:29:42');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;

-- Volcando estructura para tabla no_pain_no_gain.usuario
DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `dni` int NOT NULL,
  `codigo_nivel` int NOT NULL,
  `codigo_sede` int NOT NULL,
  `alias` varchar(50) COLLATE utf8_swedish_ci NOT NULL DEFAULT '',
  `nombre` varchar(50) COLLATE utf8_swedish_ci NOT NULL DEFAULT '',
  `apellido` varchar(50) COLLATE utf8_swedish_ci NOT NULL DEFAULT '',
  `pass` varbinary(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`dni`),
  KEY `FK_USUARIO_SEDE` (`codigo_sede`) USING BTREE,
  KEY `FK_USUARIO_NIVEL` (`codigo_nivel`),
  CONSTRAINT `FK_USUARIO_NIVEL` FOREIGN KEY (`codigo_nivel`) REFERENCES `nivel` (`codigo`),
  CONSTRAINT `FK_USUARIO_SEDE` FOREIGN KEY (`codigo_sede`) REFERENCES `sede` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

-- Volcando datos para la tabla no_pain_no_gain.usuario: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT IGNORE INTO `usuario` (`dni`, `codigo_nivel`, `codigo_sede`, `alias`, `nombre`, `apellido`, `pass`) VALUES
	(1000000000, 1, 1, 'velka', 'admin', 'admin', _binary 0x6159D0EDF88C60DE70313A4402E040C2),
	(1000000001, 2, 2, 'usr1', 'Usuario', 'Primero', _binary 0xE4079AC91EFADE68D7D672DF08649189);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
