<?php

// Configurações gerais do sistema - AgendaFácil
define('APP_NOME', 'AgendaFácil');
define('APP_DESCRICAO', 'Sistema de Agendamento de Serviços');

// Conexão com o banco de dados (MySQL/MariaDB)
define('DB_HOST', '127.0.0.1');
define('DB_NOME', 'agendamento');
define('DB_USUARIO', 'root');
define('DB_SENHA', '');

// URL base do sistema
define('BASE_URL', 'http://localhost/agendamento');

// Arquivo de inclusão usado em todas as páginas
require_once __DIR__ . '/conexao.php';
require_once __DIR__ . '/sessao.php';
require_once __DIR__ . '/funcoes.php';
require_once __DIR__ . '/autenticacao.php';