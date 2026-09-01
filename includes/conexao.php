<?php

// Conexão com o banco de dados MySQL via PDO (prepared statements serão usados nas consultas)
function conectar(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NOME . ';charset=utf8mb4';
        $pdo = new PDO($dsn, DB_USUARIO, DB_SENHA, [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);
    }

    return $pdo;
}