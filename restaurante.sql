-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-05-2020 a las 19:18:57
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

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
  `id_menu` int(11) NOT NULL,
  `nombre_menu` varchar(200) NOT NULL,
  `cantidad` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`id_pedido`, `id_menu`, `nombre_menu`, `cantidad`) VALUES
(36, 66, 'Menú 4', 4),
(37, 63, 'Menú 1', 1),
(37, 64, 'Menú 2', 1),
(38, 66, 'Menú 4', 2),
(39, 65, 'Menú 3', 1),
(40, 63, 'Menú 1', 1),
(40, 64, 'Menú 2', 1),
(40, 66, 'Menú 4', 1),
(41, 63, 'Menú 1', 1),
(41, 65, 'Menú 3', 1);

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
(63, 'Menú 1', 'Descripción del menú 1', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '55', 1),
(64, 'Menú 2', 'Descripción del menú 2', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '50', 1),
(65, 'Menú 3', 'Descripción del menú 3', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '75', 1),
(66, 'Menú 4', 'Descripción del menú 4', 'https://www.zerya.org/wp-content/uploads/2019/03/no-image-found.png', '55', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `direccion` varchar(500) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `email` varchar(150) NOT NULL,
  `forma_pago` varchar(15) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `precio_total` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_cliente`, `fecha`, `direccion`, `telefono`, `email`, `forma_pago`, `estado`, `precio_total`) VALUES
(36, 56, '2020-06-02', 'Calle Archiduque Carlos 12', '652360120', 'bea@cliente.com', 'tarjeta', 'ENTREGADO', '220'),
(37, 56, '2020-06-04', 'Calle Archiduque Carlos 12', '652360120', 'bea@cliente.com', 'tarjeta', 'CANCELADO', '105'),
(38, 56, '2020-06-04', 'Calle Archiduque Carlos 12', '652360120', 'bea@cliente.com', 'tarjeta', 'ACEPTADO', '110'),
(39, 59, '2020-06-03', 'Calle Archiduque Carlos, 12', '652360099', 'clara@couchoud.com', 'efectivo', 'PENDIENTE', '75'),
(40, 59, '2020-07-21', 'Calle Archiduque Carlos, 12', '652360099', 'clara@couchoud.com', 'tarjeta', 'PENDIENTE', '160'),
(41, 60, '2020-07-13', 'Calle de la Reina,27', '634432312', 'mcarmen@moreno.com', 'tarjeta', 'ACEPTADO', '130');

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
(20, 'Entrante 1', NULL, '7', 'ENTRANTE', 1),
(21, 'Entrante 2', NULL, '10', 'ENTRANTE', 1),
(22, 'Entrante 3', NULL, '8', 'ENTRANTE', 1),
(23, 'Arroz 1', NULL, '15', 'ARROZ', 1),
(24, 'Arroz 2', NULL, '14', 'ARROZ', 1),
(25, 'Arroz 3', NULL, '13', 'ARROZ', 1),
(26, 'Carne 1', NULL, '18', 'CARNE', 1),
(27, 'Carne 2', NULL, '25', 'CARNE', 1),
(28, 'Carne 3', NULL, '44', 'CARNE', 1),
(29, 'Pescado 1', NULL, '20', 'PESCADO', 1),
(30, 'Pescado 2', NULL, '28', 'PESCADO', 1),
(31, 'Pescado 3', NULL, '21', 'PESCADO', 1),
(32, 'Postre 1', NULL, '6', 'POSTRE', 1),
(33, 'Postre 2', NULL, '7', 'POSTRE', 1),
(34, 'Postre 3', NULL, '6', 'POSTRE', 1);

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
(63, 20),
(63, 21),
(63, 24),
(63, 29),
(63, 33),
(64, 22),
(64, 24),
(64, 27),
(64, 32),
(65, 21),
(65, 23),
(65, 28),
(65, 33),
(66, 21),
(66, 22),
(66, 24),
(66, 29),
(66, 32);

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
  `password` varchar(300) NOT NULL,
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
(56, 'Bea', 'Couchoud', '$2b$04$Ru2DHUjFdya3lkridUz3eudLf1Lw/6gXOe8uPRzfYOfJI/hzpe7Be', 'bea@cliente.com', '652360120', 'Calle Archiduque Carlos 12', 1, 1),
(57, 'Bea', 'Couchoud', '$2b$04$Y2IWfYut8JTCTsmXCRwqt.Eul32d9.f11cS.6B2LWd9w90NwXvqXS', 'bea@empleado.com', '652360120', 'Calle Archiduque Carlos 12', 2, 1),
(58, 'Bea', 'Couchoud', '$2b$04$usoohMYbJwbyHYClr114PeCU7muWIEOYqmM0ChvkomkTR99WrnqKG', 'bea@admin.com', '652360120', 'Calle Archiduque Carlos 12', 3, 1),
(59, 'Clara', 'Couchoud', '$2b$04$7n4Na67X2PLIFqOScCOGNO/YZcNtDhLqUH3LJt8jQpkS.G54J8ykm', 'clara@couchoud.com', '652360099', 'Calle Archiduque Carlos, 12', 1, 1),
(60, 'Carmen', 'Moreno', '$2b$04$hJqVa4ZwfUt7qNqQUaM90Oz1Ao88fvrj2GT4OHw6O3kPW4c/wIBPa', 'mcarmen@moreno.com', '634432312', 'Calle de la Reina,27', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`id_pedido`,`id_menu`) USING BTREE,
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
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `plato`
--
ALTER TABLE `plato`
  MODIFY `id_plato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `platos_menu`
--
ALTER TABLE `platos_menu`
  ADD CONSTRAINT `platos_menu_ibfk_1` FOREIGN KEY (`id_plato`) REFERENCES `plato` (`id_plato`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `platos_menu_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`nivel`) REFERENCES `rol` (`nivel`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
