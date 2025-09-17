-- Inserts para a tabela usuario
INSERT INTO usuario (nome_usuario, email, senha, status_usuario) VALUES 
('João Silva', 'joao.silva@example.com', crypt('senha123', gen_salt('bf')), 1),
('Maria Oliveira', 'maria.oliveira@example.com', crypt('senha123', gen_salt('bf')), 1),
('Pedro Santos', 'pedro.santos@example.com', crypt('senha123', gen_salt('bf')), 1),
('Ana Costa', 'ana.costa@example.com', crypt('senha123', gen_salt('bf')), 1),
('Lucas Pereira', 'lucas.pereira@example.com', crypt('senha123', gen_salt('bf')), 1);

-- Inserts para a tabela comanda
INSERT INTO comanda (id_dono, nome_comanda, data_hora, status_comanda, senha_comanda) VALUES 
(1, 'Comanda 1', '2024-10-22 12:00:00', 1, 'comanda1'),
(2, 'Comanda 2', '2024-10-22 12:30:00', 1, 'comanda2'),
(3, 'Comanda 3', '2024-10-22 13:00:00', 1, 'comanda3'),
(4, 'Comanda 4', '2024-10-22 13:30:00', 1, 'comanda4');

-- Inserts para a tabela item
INSERT INTO item (id_comanda, nome_item, quantidade, preco) VALUES 
(1, 'Item 1A', 2, 10.00),
(1, 'Item 1B', 3, 15.00),
(1, 'Item 1C', 1, 20.00),
(1, 'Item 1D', 5, 8.50),
(1, 'Item 1E', 4, 12.00),

(2, 'Item 2A', 1, 7.00),
(2, 'Item 2B', 2, 9.50),
(2, 'Item 2C', 3, 14.00),
(2, 'Item 2D', 4, 11.00),
(2, 'Item 2E', 2, 6.00),

(3, 'Item 3A', 2, 10.50),
(3, 'Item 3B', 3, 16.00),
(3, 'Item 3C', 1, 12.00),
(3, 'Item 3D', 5, 9.00),
(3, 'Item 3E', 4, 13.00),

(4, 'Item 4A', 1, 5.00),
(4, 'Item 4B', 2, 8.00),
(4, 'Item 4C', 3, 10.00),
(4, 'Item 4D', 4, 15.00),
(4, 'Item 4E', 2, 11.00);

-- Inserts para a tabela part_comanda
INSERT INTO part_comanda (id_comanda, id_usuario) VALUES 
(1, 1),
(1, 2),
(1, 3),

(2, 2),
(2, 3),
(2, 4),
(2, 5),

(3, 1),
(3, 4),
(3, 5),

(4, 2),
(4, 3);

-- Inserts para a tabela part_item
INSERT INTO part_item (id_item, id_usuario) VALUES 
(1, 1),
(1, 2),
(1, 3),

(2, 2),
(2, 3),
(2, 4),

(3, 1),
(3, 4),

(4, 2),
(4, 3),
(4, 5),

(5, 1),
(5, 2),

(6, 2),
(6, 4),

(7, 3),
(7, 5),

(8, 1),
(8, 4),

(9, 2),
(9, 3),
(9, 5),

(10, 1),
(10, 3);
