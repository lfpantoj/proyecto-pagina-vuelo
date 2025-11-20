-- =================================================================
-- QUERIES PARA POBLAR LA BASE DE DATOS 'vueloscolombia'
-- =================================================================

-- NOTA IMPORTANTE SOBRE LAS CONTRASEÑAS:
-- La aplicación backend utiliza un sistema de encriptación para las contraseñas (BCrypt).
-- Las contraseñas 'admin123' y '123456' insertadas aquí NO funcionarán para iniciar sesión
-- porque no están encriptadas.
--
-- Se RECOMIENDA AMPLIAMENTE no ejecutar las inserciones de 'usuarios' y 'usuario_roles'
-- y en su lugar, dejar que la aplicación de Spring Boot (el backend) los cree
-- automáticamente al arrancar. El backend se encargará de encriptar las contraseñas
-- correctamente. Si las tablas de usuarios y vuelos están vacías, el backend las
-- llenará con estos mismos datos de ejemplo.

-- =================================================================
-- 1. Inserción de Usuarios y Roles
-- (Recuerda la nota sobre las contraseñas)
-- =================================================================

-- Insertar el usuario administrador
INSERT INTO usuarios (id, username, password) VALUES (1, 'admin@vueloscolombia.com', 'admin123');
INSERT INTO usuario_roles (usuario_id, rol) VALUES (1, 'ROLE_ADMIN');

-- Insertar el usuario cliente
INSERT INTO usuarios (id, username, password) VALUES (2, 'pepito@gmail.com', '123456');
INSERT INTO usuario_roles (usuario_id, rol) VALUES (2, 'ROLE_USER');


-- =================================================================
-- 2. Inserción de Vuelos de Ejemplo
-- =================================================================

INSERT INTO vuelo (origen, destino, precio, hora_salida, hora_llegada, disponibles, fecha) VALUES
('Bogotá', 'Medellín', 350000, '07:00', '08:00', 12, '2025-11-15'),
('Bogotá', 'Medellín', 320000, '14:30', '15:30', 8, '2025-11-15'),
('Bogotá', 'Medellín', 280000, '18:45', '19:45', 5, '2025-11-15'),
('Medellín', 'Cartagena', 420000, '06:15', '07:45', 15, '2025-11-16'),
('Medellín', 'Cartagena', 380000, '12:00', '13:30', 3, '2025-11-16'),
('Cali', 'Bogotá', 290000, '09:20', '10:20', 20, '2025-11-17'),
('Cartagena', 'Santa Marta', 180000, '08:30', '09:00', 10, '2025-11-18'),
('Bogotá', 'Barranquilla', 310000, '16:45', '18:15', 7, '2025-11-19'),
('Medellín', 'Cali', 270000, '11:10', '12:10', 4, '2025-11-20'),
('Santa Marta', 'Bogotá', 390000, '13:25', '14:55', 18, '2025-11-21');


-- =================================================================
-- 3. Inserción de Reservas de Ejemplo (Pasajeros)
-- =================================================================

-- Crear una reserva para el usuario 'pepito@gmail.com' (ID 2) en el primer vuelo a Medellín (ID 1)
-- Asumimos que los IDs de vuelo se autoincrementan desde 1.
INSERT INTO reservas (usuario_id, vuelo_id, cantidad, estado) VALUES (2, 1, 2, 'CONFIRMADA');

-- Crear otra reserva para el mismo usuario en el vuelo de Cali a Bogotá (ID 6)
INSERT INTO reservas (usuario_id, vuelo_id, cantidad, estado) VALUES (2, 6, 1, 'PENDIENTE');

