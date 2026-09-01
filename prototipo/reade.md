# RELATÓRIO DO SISTEMA DE AGENDAMENTO DE SERVIÇOS

## 1. Introdução

O sistema desenvolvido tem como objetivo facilitar e organizar o processo de **agendamento de serviços entre estabelecimentos e clientes**, oferecendo uma plataforma digital onde o estabelecimento pode disponibilizar seus serviços e onde os clientes podem realizar seus agendamentos de maneira simples, rápida e organizada.

A proposta do sistema surgiu da necessidade de substituir ou reduzir processos manuais de marcação de horários, como agendamentos realizados presencialmente, por telefone ou por aplicativos de mensagens. Com o sistema, todas as informações relacionadas aos serviços, clientes, horários e agendamentos ficam concentradas em um único ambiente.

O sistema pode ser utilizado por diferentes tipos de estabelecimentos que trabalham com atendimento mediante horário marcado, como salões de beleza, barbearias, clínicas, oficinas, profissionais autônomos, serviços de manutenção, estética e diversos outros segmentos.

---

## 2. Objetivo do Sistema

O principal objetivo do sistema é permitir que um estabelecimento disponibilize seus serviços para agendamento através de uma plataforma online.

O estabelecimento poderá cadastrar suas informações e organizar os serviços oferecidos. Já o cliente poderá acessar o sistema, realizar seu cadastro, informar seus dados pessoais, consultar os serviços disponíveis, selecionar o serviço desejado, escolher uma data e horário disponíveis e confirmar o agendamento.

Dessa forma, o sistema proporciona maior organização para o estabelecimento e maior praticidade para o cliente.

Entre os principais objetivos estão:

* Facilitar o agendamento de serviços;
* Reduzir a necessidade de agendamentos realizados manualmente;
* Organizar os horários disponíveis do estabelecimento;
* Evitar conflitos de horários;
* Manter um registro dos clientes cadastrados;
* Permitir o acompanhamento dos agendamentos;
* Melhorar a comunicação entre cliente e estabelecimento;
* Oferecer maior controle administrativo sobre os atendimentos;
* Tornar o processo de agendamento mais rápido e acessível.

---

## 3. Público-Alvo

O sistema foi desenvolvido pensando em dois principais tipos de usuários:

### 3.1 Cliente

O cliente é o usuário que deseja contratar ou agendar um determinado serviço.

Para utilizar todas as funcionalidades do sistema, o cliente deverá realizar um cadastro contendo suas informações pessoais e seus dados de acesso.

Após realizar o login, poderá consultar os serviços disponíveis, selecionar um serviço, escolher uma data e horário e efetuar seu agendamento.

O cliente também poderá acompanhar seus próprios agendamentos e realizar o cancelamento quando necessário.

### 3.2 Estabelecimento / Administrador

O estabelecimento será responsável pelo gerenciamento das informações cadastradas no sistema.

Por meio de um perfil administrativo, denominado **Master**, será possível possuir um nível de acesso superior ao usuário comum.

O administrador poderá acompanhar os agendamentos realizados, consultar usuários, verificar registros do sistema e realizar determinadas operações administrativas.

---

## 4. Funcionamento Geral

O funcionamento do sistema é baseado na interação entre o estabelecimento e seus clientes.

Inicialmente, o estabelecimento cadastra suas informações e os serviços que estarão disponíveis para agendamento.

Cada serviço poderá possuir informações necessárias para sua identificação, permitindo que o cliente saiba exatamente qual serviço está selecionando.

O cliente acessará a plataforma e poderá visualizar as opções disponíveis.

Para realizar um agendamento, será necessário possuir uma conta no sistema.

O processo básico será:

1. O cliente acessa o site;
2. Realiza seu cadastro;
3. Informa seus dados pessoais;
4. Cria suas credenciais de acesso;
5. Realiza o login;
6. Consulta os serviços disponíveis;
7. Seleciona o serviço desejado;
8. Escolhe uma data;
9. Seleciona um horário disponível;
10. Confirma o agendamento;
11. O sistema registra o agendamento;
12. O cliente poderá posteriormente consultar ou cancelar o agendamento.

Esse processo permite que todas as etapas sejam realizadas digitalmente, sem a necessidade de contato direto com o estabelecimento para marcar o horário.

---

# 5. Cadastro de Usuários

O sistema possui uma área destinada ao cadastro de novos usuários.

Durante o cadastro, são solicitadas informações necessárias para identificar corretamente o cliente e permitir posteriormente sua autenticação.

Entre os dados previstos no sistema estão informações como:

* Nome;
* CPF;
* E-mail;
* Login;
* Senha;
* Confirmação de senha;
* Dados utilizados para autenticação e segurança.

O sistema também possui validações para evitar o preenchimento incorreto de determinados campos.

O cadastro realizado através da área pública cria um usuário com perfil **Comum**, destinado aos clientes da plataforma.

Dessa forma, usuários comuns não recebem automaticamente privilégios administrativos.

---

# 6. Login e Autenticação

Após realizar o cadastro, o usuário poderá utilizar suas credenciais para entrar no sistema.

A autenticação é responsável por verificar se as informações fornecidas correspondem a um usuário cadastrado.

O sistema possui regras de validação para os campos de acesso, evitando entradas incompatíveis com os requisitos definidos.

Após a autenticação, as funcionalidades exibidas poderão variar de acordo com o perfil do usuário.

Existem dois principais níveis:

### Perfil Comum

Destinado aos clientes.

Possui acesso principalmente às funcionalidades relacionadas aos próprios dados, serviços e agendamentos.

### Perfil Master

Destinado à administração do sistema.

Possui permissões adicionais relacionadas ao gerenciamento e acompanhamento da plataforma.

Essa separação melhora a segurança e impede que usuários comuns acessem funções administrativas.

---

# 7. Autenticação em Duas Etapas – 2FA

O sistema também prevê a utilização de **autenticação em duas etapas, conhecida como 2FA**.

Essa funcionalidade adiciona uma camada extra de segurança ao processo de login.

Após informar corretamente o login e a senha, o usuário poderá precisar fornecer um código adicional de autenticação.

O sistema possui controle de tentativas para essa verificação, permitindo até um determinado limite antes de impedir novas tentativas naquele processo.

Essa funcionalidade é importante porque reduz o risco de acesso indevido mesmo quando alguém obtém a senha do usuário.

---

# 8. Cadastro e Consulta de Serviços

Os serviços disponibilizados pelo estabelecimento são uma das principais informações do sistema.

O cliente poderá consultar os serviços cadastrados e selecionar aquele que deseja realizar.

Um estabelecimento poderá, por exemplo, cadastrar serviços como:

* Corte de cabelo;
* Manicure;
* Manutenção;
* Consulta;
* Instalação;
* Limpeza;
* Atendimento técnico;
* Entre outros.

O sistema não fica limitado a um único tipo de negócio. A estrutura permite sua adaptação para diferentes estabelecimentos que necessitem trabalhar com reservas de horários.

---

# 9. Processo de Agendamento

O agendamento representa a principal funcionalidade do sistema.

Após realizar o login, o cliente seleciona o serviço desejado e informa a data e o horário em que pretende ser atendido.

Antes de confirmar, o sistema realiza verificações para garantir que as informações necessárias estejam preenchidas corretamente.

Entre as validações previstas estão:

* Verificação do serviço;
* Verificação da data;
* Verificação do horário;
* Bloqueio de horários anteriores ao momento atual;
* Verificação da disponibilidade;
* Prevenção contra dois agendamentos confirmados para o mesmo horário.

Caso já exista um agendamento confirmado naquela mesma data e horário, o sistema não permite que outro agendamento seja realizado naquele período.

Essa regra é essencial para evitar conflitos de agenda e dois clientes marcados para o mesmo horário.

---

# 10. Informações do Agendamento

Cada agendamento deverá possuir informações suficientes para permitir seu gerenciamento.

Entre as informações registradas podem estar:

* Identificação do cliente;
* Identificação do serviço;
* Data;
* Horário;
* Observações;
* Status;
* Data de criação do registro.

Com essas informações, o estabelecimento consegue identificar quem realizou o agendamento, qual serviço será realizado e quando o atendimento deverá acontecer.

---

# 11. Status dos Agendamentos

Os agendamentos possuem um status que permite identificar sua situação dentro do sistema.

Um agendamento poderá, por exemplo, ser identificado como:

* Confirmado;
* Cancelado;
* Concluído;
* Pendente, dependendo da regra utilizada pelo estabelecimento.

O uso de status facilita a organização da agenda e permite um melhor acompanhamento dos atendimentos.

---

# 12. Consulta de Agendamentos

Cada usuário comum poderá visualizar os seus próprios agendamentos.

Essa restrição é importante para garantir a privacidade das informações, evitando que um cliente tenha acesso aos agendamentos realizados por outros clientes.

Já o perfil **Master** possui uma visão mais ampla e poderá consultar os agendamentos registrados no sistema.

Com isso, o estabelecimento terá maior controle sobre sua agenda diária e poderá acompanhar os serviços programados.

---

# 13. Cancelamento de Agendamentos

O sistema também oferece a possibilidade de cancelamento de um agendamento.

O cliente poderá consultar seus agendamentos e cancelar uma reserva quando necessário.

O administrador também poderá possuir permissão para realizar o cancelamento.

Após o cancelamento, o sistema poderá atualizar o status do agendamento, permitindo que o histórico continue armazenado para controle.

Essa forma de funcionamento é mais adequada do que simplesmente excluir o registro, pois mantém informações importantes sobre operações realizadas anteriormente.

---

# 14. Gerenciamento de Usuários

O perfil administrativo possui funcionalidades adicionais para gerenciamento dos usuários cadastrados.

Entre essas funcionalidades estão:

* Consulta de usuários;
* Pesquisa de usuários;
* Visualização de informações cadastradas;
* Exclusão de usuários comuns, quando permitido;
* Identificação do perfil de acesso.

Essas funcionalidades auxiliam na administração da plataforma e permitem que o estabelecimento mantenha maior controle sobre os usuários registrados.

---

# 15. Registro de Logs

Outra funcionalidade prevista é o armazenamento de **logs de autenticação**.

Os logs representam registros das ações relacionadas ao acesso ao sistema.

Podem ser armazenadas informações sobre tentativas ou eventos de autenticação.

O objetivo é permitir maior rastreabilidade das ações realizadas dentro da aplicação.

Em uma aplicação utilizada em ambiente real, os logs podem auxiliar na:

* Identificação de tentativas de acesso;
* Auditoria;
* Segurança;
* Investigação de erros;
* Verificação de atividades suspeitas.

---

# 16. Alteração de Senha

O sistema possui ainda funcionalidade destinada à alteração de senha.

Essa funcionalidade permite que o usuário atualize suas credenciais de acesso quando necessário.

O processo deve possuir validações para garantir que a nova senha respeite as regras determinadas pelo sistema.

Em uma implementação definitiva, as senhas não devem ser armazenadas diretamente no banco de dados em formato de texto.

O recomendado é utilizar técnicas de **hash de senha**, aumentando a segurança das informações dos usuários.

---

# 17. Banco de Dados

Para a implementação completa do projeto, as informações deverão ser armazenadas em um banco de dados.

A estrutura prevista apresenta entidades importantes como:

### USUÁRIO

Responsável por armazenar os dados dos usuários cadastrados.

Exemplos de informações:

* ID do usuário;
* Nome;
* CPF;
* E-mail;
* Login;
* Senha protegida por hash;
* Perfil;
* Dados de autenticação em duas etapas.

### SERVIÇO

Responsável por armazenar os serviços disponibilizados pelo estabelecimento.

### AGENDAMENTO

Relaciona o cliente ao serviço selecionado, armazenando informações como:

* Usuário;
* Serviço;
* Data;
* Horário;
* Observações;
* Status;
* Data de criação.

### LOG

Responsável pelo armazenamento de registros relacionados à utilização e autenticação do sistema.

A utilização dessas tabelas permite organizar os dados e estabelecer relacionamentos entre clientes, serviços e agendamentos.

---

# 18. Tecnologias Utilizadas

O protótipo atual do sistema foi desenvolvido utilizando tecnologias voltadas para aplicações web.

### HTML

Utilizado para estruturar as páginas e os elementos da interface.

### CSS

Responsável pela aparência visual da aplicação, incluindo cores, posicionamento, tabelas, formulários e adaptação da interface.

A proposta visual do sistema utiliza uma aparência clara e profissional, evitando fundos excessivamente escuros e elementos com bordas muito arredondadas.

### JavaScript

Responsável pelas funcionalidades e interações realizadas diretamente no navegador.

No protótipo, o JavaScript também realiza diversas validações e simula operações relacionadas ao cadastro, login e agendamento.

### PHP

Para a versão completa do projeto, o PHP poderá ser utilizado no back-end, sendo responsável pela comunicação entre as páginas do sistema e o banco de dados.

Também poderá ser responsável por:

* Autenticação;
* Sessões;
* Cadastro;
* Consulta;
* Alteração;
* Exclusão;
* Controle de agendamentos;
* Validação dos dados no servidor.

### MySQL

Será utilizado para armazenamento permanente dos dados da aplicação.

A comunicação entre PHP e MySQL permitirá que as informações permaneçam registradas mesmo quando o navegador for fechado ou quando o sistema for acessado por diferentes computadores.

---

# 19. Protótipo e Versão Final

Na versão atual de protótipo, algumas informações são armazenadas utilizando recursos do próprio navegador, como **localStorage e sessionStorage**.

Essa estratégia é adequada para demonstrações e desenvolvimento inicial do funcionamento da interface.

Entretanto, para a implementação definitiva, esses dados deverão ser transferidos para o servidor utilizando **PHP e MySQL**.

Também será necessário utilizar sessões PHP para controlar os usuários autenticados.

As senhas deverão ser protegidas no back-end utilizando recursos como:

* `password_hash()`;
* `password_verify()`.

Isso proporcionará uma aplicação mais segura e adequada para utilização real.

---

# 20. Segurança

A segurança representa um aspecto importante do projeto, especialmente porque o sistema trabalhará com informações pessoais dos clientes.

Entre os recursos utilizados ou previstos estão:

* Login individual;
* Controle de sessão;
* Perfis de acesso;
* Autenticação em duas etapas;
* Limite de tentativas de autenticação;
* Senhas armazenadas através de hash;
* Validação dos dados informados;
* Separação entre funções de usuário comum e administrador;
* Registro de logs;
* Restrição de acesso aos agendamentos de outros usuários.

Essas medidas ajudam a reduzir riscos e garantir maior proteção das informações armazenadas.

---

# 21. Acessibilidade

O sistema também considera aspectos de acessibilidade.

O objetivo é proporcionar uma interface que possa ser utilizada pelo maior número possível de pessoas.

Para isso, a interface deve possuir:

* Informações organizadas;
* Campos devidamente identificados;
* Botões de fácil compreensão;
* Contraste adequado;
* Navegação simples;
* Textos legíveis;
* Estrutura visual consistente.

A preocupação com acessibilidade contribui para melhorar não somente o acesso de pessoas com necessidades específicas, mas também a experiência geral de todos os usuários.

---

# 22. Responsividade

O sistema foi planejado para possuir uma interface responsiva.

Isso significa que as páginas devem conseguir se adaptar a diferentes tamanhos de tela.

O usuário poderá acessar o sistema através de dispositivos como:

* Computador;
* Notebook;
* Tablet;
* Smartphone.

Os componentes da página devem se reorganizar conforme o espaço disponível, mantendo a utilização do sistema simples independentemente do equipamento utilizado.

---

# 23. Interface do Sistema

A interface foi pensada para possuir uma aparência profissional e semelhante a sistemas comerciais utilizados no cotidiano.

Por esse motivo, o projeto evita elementos visuais exagerados.

A identidade visual utiliza:

* Fundo predominantemente claro;
* Cores discretas;
* Campos de formulário organizados;
* Bordas com pouco arredondamento;
* Tabelas para visualização dos registros;
* Botões de fácil identificação;
* Menu de navegação organizado;
* Separação clara entre as funcionalidades.

Essa escolha permite que o sistema mantenha um visual simples, objetivo e adequado para ambientes comerciais.

---

# 24. Benefícios para o Cliente

A utilização do sistema proporciona diferentes vantagens para o cliente.

Entre elas:

* Possibilidade de realizar agendamentos pela internet;
* Maior facilidade para consultar serviços;
* Escolha de datas e horários disponíveis;
* Menor necessidade de entrar em contato diretamente com o estabelecimento;
* Consulta dos próprios agendamentos;
* Possibilidade de cancelamento;
* Maior rapidez no atendimento;
* Acesso através de diferentes dispositivos.

---

# 25. Benefícios para o Estabelecimento

Para o estabelecimento, o sistema também oferece diversos benefícios.

Entre eles:

* Centralização dos agendamentos;
* Maior organização dos horários;
* Redução de conflitos de agenda;
* Cadastro organizado de clientes;
* Registro dos serviços;
* Controle sobre os atendimentos;
* Acompanhamento dos agendamentos;
* Maior facilidade administrativa;
* Possibilidade de consulta dos registros;
* Redução de processos realizados manualmente.

Além disso, com os dados armazenados de maneira estruturada, futuramente poderão ser implementados relatórios administrativos e indicadores relacionados ao funcionamento do estabelecimento.

---

# 26. Possibilidades de Evolução

O sistema foi desenvolvido de maneira que novas funcionalidades possam ser implementadas futuramente.

Entre possíveis melhorias estão:

* Envio de confirmação por e-mail;
* Notificações de agendamento;
* Lembretes automáticos;
* Recuperação de senha;
* Cadastro de funcionários;
* Associação de serviços a profissionais;
* Controle individual da agenda de cada profissional;
* Definição de horários de funcionamento;
* Bloqueio de datas;
* Cadastro de feriados;
* Relatórios de atendimento;
* Histórico completo dos clientes;
* Dashboard administrativo;
* Controle financeiro;
* Formas de pagamento;
* Avaliação dos serviços;
* Geração de comprovante de agendamento.

Essas funcionalidades podem transformar o sistema em uma plataforma ainda mais completa para gerenciamento de estabelecimentos prestadores de serviços.

---

# 27. Conclusão

O Sistema de Agendamento de Serviços foi desenvolvido com o propósito de tornar o processo de marcação de atendimentos mais simples, organizado e eficiente.

Através da plataforma, o estabelecimento poderá disponibilizar seus serviços e gerenciar os agendamentos realizados pelos clientes.

O cliente, por sua vez, terá a possibilidade de realizar seu cadastro, acessar sua conta, consultar os serviços oferecidos, escolher uma data e horário e confirmar o agendamento através do próprio site.

Além da funcionalidade principal de agendamento, o projeto também contempla recursos relacionados à autenticação, segurança, diferentes níveis de acesso, autenticação em duas etapas, gerenciamento de usuários, logs, cancelamento de reservas, acessibilidade e responsividade.

O protótipo desenvolvido em HTML, CSS e JavaScript permite demonstrar o funcionamento e a interface da aplicação, enquanto a implementação de PHP e MySQL permitirá transformar o projeto em um sistema completo, com armazenamento permanente das informações e processamento realizado no servidor.

Dessa maneira, o projeto atende à proposta de desenvolver uma solução web capaz de conectar clientes e estabelecimentos, proporcionando praticidade ao usuário e maior controle e organização para os responsáveis pela prestação dos serviços.
