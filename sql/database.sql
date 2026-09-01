-- Script de criação do banco de dados - AgendaFácil
-- Definir aqui: tabela de usuários (com dados para autenticação e 2FA), serviços/produtos,
-- agendamentos, logs de autenticação e o usuário Master (inserido via SQL).

CREATE DATABASE IF NOT EXISTS agendamento
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE agendamento;

-- Tabelas e usuário Master: implementar na próxima etapa.