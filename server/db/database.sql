CREATE DATABASE divide_ai_db;

\c divide_ai_db

DROP TABLE IF EXISTS part_comanda;
DROP TABLE IF EXISTS part_item;
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS comanda;
DROP TABLE IF EXISTS usuario;
CREATE EXTENSION pgcrypto;


CREATE TABLE usuario (
    id_usuario SERIAL,
    nome_usuario VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    senha VARCHAR NOT NULL,
    status_usuario INTEGER NOT NULL,
    CONSTRAINT pk_id_usuario PRIMARY KEY (id_usuario),
    CONSTRAINT uk_email UNIQUE (email)
);

CREATE TABLE comanda (
    id_comanda SERIAL,
    id_dono INTEGER NOT NULL,
    nome_comanda VARCHAR NOT NULL,
    data_hora TIMESTAMP NOT NULL,
    status_comanda INTEGER NOT NULL,
    senha_comanda VARCHAR NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id_comanda),
    CONSTRAINT fk_id_dono FOREIGN KEY (id_dono) REFERENCES usuario(id_usuario)
);


CREATE TABLE part_comanda (
    id_comanda INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    total MONEY,
    CONSTRAINT fk_id_comanda FOREIGN KEY (id_comanda) REFERENCES comanda(id_comanda),
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT pk_part_comanda PRIMARY KEY (id_comanda, id_usuario)
);

CREATE TABLE item (
    id_item SERIAL,
    id_comanda INTEGER NOT NULL,
    nome_item VARCHAR NOT NULL,
    quantidade INTEGER NOT NULL,
    quantidade_cada INTEGER,
    preco MONEY NOT NULL,
    CONSTRAINT fk_id_comanda FOREIGN KEY (id_comanda) REFERENCES comanda(id_comanda) ON DELETE CASCADE,
    CONSTRAINT pk_id_item PRIMARY KEY (id_item)
);

CREATE TABLE part_item (
    id_item INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    CONSTRAINT fk_id_item FOREIGN KEY (id_item) REFERENCES item(id_item) ON DELETE CASCADE,
    CONSTRAINT fk_id_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    CONSTRAINT pk_part_item PRIMARY KEY (id_item, id_usuario)
);

CREATE VIEW valorIndividual AS SELECT i.*, ((i.preco * i.quantidade) / COUNT(pi.id_usuario)) as valorIndividual FROM item i NATURAL JOIN part_item pi GROUP BY i.id_item;