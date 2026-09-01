<?php

// Início da sessão (controle de autenticação do usuário)
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}