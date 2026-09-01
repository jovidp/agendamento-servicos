AGENDAFÁCIL - SISTEMA DE AGENDAMENTO DE SERVIÇOS

Arquivos:
- index.html
- styles.css
- script.js

Como testar:
1. Coloque os três arquivos na mesma pasta.
2. Abra index.html no navegador.
3. Para testar a busca de CEP com ViaCEP, use conexão com internet.
4. Usuário Master de demonstração:
   Login: master
   Senha: adminabc
   2FA (a pergunta é aleatória):
   - Nome da mãe: Maria Administradora
   - Data de nascimento: 01/01/1990
   - CEP: 20000-000

Observações:
- Este pacote é um protótipo Front-End em HTML/CSS/JavaScript.
- Os dados são armazenados em localStorage/sessionStorage apenas para demonstração.
- Em um projeto final com XAMPP, substitua o armazenamento local por PHP + MySQL e sessões PHP.
- A senha é armazenada no protótipo como hash SHA-256 usando Web Crypto, mas no Back-End real use password_hash/password_verify do PHP.
- O botão “Baixar lista em PDF” abre a visualização de impressão do navegador, permitindo Salvar como PDF.
