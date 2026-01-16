-- 0. CORRECCIÓN DE ESQUEMA (HOTFIX)
-- La tabla salas le falta la columna user_id requerida por el backend
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='salas' AND column_name='user_id') THEN 
        ALTER TABLE salas ADD COLUMN user_id BIGINT;
        ALTER TABLE salas ADD CONSTRAINT fk_salas_user FOREIGN KEY (user_id) REFERENCES users(id);
    END IF; 
END $$;

-- Limpiar datos existentes
TRUNCATE TABLE plants_has_events, plant_events, plantas, cepas, salas, users CASCADE;

-- 1. USUARIOS
INSERT INTO users (id, username, password, rol, nombre, apellido, fecha_registro) VALUES
(1, 'nahuelbarbero00@gmail.com', '$2a$10$T1KqLz02B3nO2E.Z4H3A9.u8D8w0H8s0s0s0s0s0s0s0s0s0s0s0s0s0s0s0s0s', 'ROLE_GROWER', 'Nahuel', 'Barbero', '2025-01-01 10:00:00');

-- 2. SALAS
-- Ahora sí podemos insertar user_id
INSERT INTO salas (id, nombre, descripcion, user_id, horas_luz, humedad, temperatura_ambiente) VALUES
(1, 'Sala A (Vegetativo)', 'LED 300W - Crecimiento', 1, '18', 60.0, 24.0),
(2, 'Sala B (Floración)', 'Sodio 600W - Flora', 1, '12', 45.0, 25.0),
(3, 'Sala C (Madres)', 'Bajo consumo - Mantenimiento', 1, '18', 65.0, 22.0),
(4, 'Sala D (Secado)', 'Oscura y ventilada', 1, '0', 50.0, 20.0);

-- 3. CEPAS
INSERT INTO cepas (id, genetica_parental, dominancia, aroma_sabor, thc, cbd, detalle, user_id) VALUES
(1, 'Gelato #41', 'Híbrida', 'Dulce, Cremoso', '24%', '0.1%', 'Fenotipo seleccionado', 1),
(2, 'Amnesia Haze', 'Sativa', 'Cítrico, Incienso', '22%', '0.0%', 'Floración larga', 1),
(3, 'Bubba Kush', 'Indica', 'Tierra, Café', '18%', '1.5%', 'Efecto sedante', 1);

-- 4. PLANTAS
INSERT INTO plantas (id, nombre, etapa, is_public, fecha_creacion, produccion, ubicacion, sala_id, cepa_id, user_id) VALUES
(101, 'GEL-001', 'VEGETACION', false, '2025-10-15', 0, 'A-01', 1, 1, 1),
(102, 'AMN-001', 'VEGETACION', false, '2025-10-20', 0, 'A-02', 1, 2, 1),
(103, 'BUB-001', 'PLANTIN', false, '2025-11-01', 0, 'A-03', 1, 3, 1),
(105, 'AMN-FL-01', 'FLORACION', false, '2025-09-01', 0, 'B-01', 2, 2, 1),
(106, 'GEL-FL-01', 'FLORACION', false, '2025-09-15', 0, 'B-02', 2, 1, 1),
(109, 'MADRE-GEL', 'VEGETACION', false, '2025-06-01', 0, 'M-01', 3, 1, 1),
(111, 'BUB-COS-01', 'COSECHADA', true, '2025-08-15', 45, 'S-01', 4, 3, 1);

-- 5. EVENTOS
INSERT INTO plant_events (id, event_type, fecha, ph_agua, ec_agua, temp_agua) VALUES
(2001, 'WATERING', '2025-10-16', 6.0, 0.8, 20.0),
(2002, 'WATERING', '2025-10-20', 6.1, 0.9, 20.5),
(2003, 'WATERING', '2025-11-05', 6.2, 1.2, 21.0),
(3001, 'WATERING', '2025-09-05', 6.3, 1.5, 22.0),
(3002, 'WATERING', '2025-09-20', 6.4, 1.8, 22.5);

-- 6. RELACIÓN
INSERT INTO plants_has_events (planta_id, events_id) VALUES
(101, 2001),
(101, 2002),
(101, 2003),
(105, 3001),
(105, 3002);

-- Secuencias
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('salas_id_seq', (SELECT MAX(id) FROM salas));
SELECT setval('cepas_id_seq', (SELECT MAX(id) FROM cepas));
SELECT setval('plantas_id_seq', (SELECT MAX(id) FROM plantas));
SELECT setval('plant_events_id_seq', (SELECT MAX(id) FROM plant_events));