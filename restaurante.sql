-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-05-2020 a las 17:07:12
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `nombre_menu` varchar(200) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `imagen` varchar(300) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `habilitado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `menu`
--

INSERT INTO `menu` (`id_menu`, `nombre_menu`, `descripcion`, `imagen`, `precio`, `habilitado`) VALUES
(34, 'Menú 1', 'Este es un menú de prueba', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '25', 1),
(35, 'Menú 2', 'Este es un menú de prueba también', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '40', 1),
(36, 'Menú 3', 'Este es un tercer menú de prueba ', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '35', 1),
(37, 'Menú 4', 'Este es un menú de prueba deshabilitado', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '40', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `direccion` varchar(500) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `precio_total` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plato`
--

CREATE TABLE `plato` (
  `id_plato` int(11) NOT NULL,
  `nombre_plato` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,0) NOT NULL,
  `tipo` varchar(150) NOT NULL,
  `habilitado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `plato`
--

INSERT INTO `plato` (`id_plato`, `nombre_plato`, `descripcion`, `precio`, `tipo`, `habilitado`) VALUES
(1, 'prueba', NULL, '12', 'ENTRANTE', 1),
(10, 'prueba2', NULL, '15', 'ENTRANTE', 1),
(13, 'prueba3', NULL, '10', 'ARROZ', 1),
(15, 'prueba4', NULL, '2', 'ENTRANTE', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platos_menu`
--

CREATE TABLE `platos_menu` (
  `id_menu` int(11) NOT NULL,
  `id_plato` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `platos_menu`
--

INSERT INTO `platos_menu` (`id_menu`, `id_plato`) VALUES
(34, 1),
(34, 10),
(35, 1),
(35, 10),
(35, 13),
(36, 1),
(36, 10),
(36, 13),
(36, 15),
(37, 1),
(37, 10),
(37, 13),
(37, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `nivel` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `tipo`, `nivel`) VALUES
(1, 'usuario', 0),
(2, 'cliente', 1),
(3, 'empleado', 2),
(4, 'administrador', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `direccion` varchar(300) NOT NULL,
  `nivel` int(11) NOT NULL,
  `habilitado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `password`, `email`, `telefono`, `direccion`, `nivel`, `habilitado`) VALUES
(4, 'bea', 'couchoud', '12345678', 'bea@couchoud', '123456789', 'direccion', 1, 1),
(27, 'asd', 'asd', 'asdasdasd', 'bea@couchoud.com', '123123123', 'qweqweqwe', 1, 1),
(29, 'asd', 'asd', 'aqasdasdasd', 'bea@couchoud2', '123123123', 'asdasdas', 1, 1),
(30, 'asdad', 'asdasd', 'asdasdasd', 'bea@couchoud3', '123123123', 'asdasdsd', 1, 1),
(44, 'bea', 'couchoud', 'asdasdasd', 'bea@admin', '12345678', 'asdfasdf', 3, 1),
(45, 'bea', 'couchoud', 'asdasdasd', 'bea@emple', '12345678', 'asdasdasd', 2, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_pedido`,`id_menu`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`) USING BTREE,
  ADD UNIQUE KEY `nombre_menu` (`nombre_menu`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `plato`
--
ALTER TABLE `plato`
  ADD PRIMARY KEY (`id_plato`) USING BTREE,
  ADD UNIQUE KEY `nombre_plato` (`nombre_plato`),
  ADD KEY `id_plato` (`id_plato`);

--
-- Indices de la tabla `platos_menu`
--
ALTER TABLE `platos_menu`
  ADD PRIMARY KEY (`id_menu`,`id_plato`),
  ADD KEY `platos_menu_ibfk_1` (`id_plato`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`nivel`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`) USING BTREE,
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_cliente` (`id_usuario`),
  ADD KEY `nivel` (`nivel`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plato`
--
ALTER TABLE `plato`
  MODIFY `id_plato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `plato` (`id_plato`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `platos_menu`
--
ALTER TABLE `platos_menu`
  ADD CONSTRAINT `platos_menu_ibfk_1` FOREIGN KEY (`id_plato`) REFERENCES `plato` (`id_plato`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `platos_menu_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`nivel`) REFERENCES `rol` (`nivel`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
