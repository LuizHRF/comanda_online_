CREATE IF NOT EXISTS DATABASE my_app_pgp;
\c my_app_pgp;

CREATE TABLE IF NOT EXISTS usuarios(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    age INT    
);

INSERT INTO usuarios(nome, age) VALUES('João', 20);
INSERT INTO usuarios(nome, age) VALUES('Maria', 30);