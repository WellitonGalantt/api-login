# Login API - Projeto de Estudos

Este projeto é uma API simples de autenticação e gerenciamento de usuários, desenvolvida para fins de estudo.

## 🎖️ Objetivo:
- Estudar o funcionamento de um login.
- Estudar o funcionamento de um banco de dados.
- Estudar sobre autennticação.
- Estudar sobre criptografia e segurança.

## 📌 Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- Knex.js (ORM para banco de dados)
- PostgreSQL (Banco de daos relacional)
- bcrypt (para hash de senhas)
- JSON Web Token (JWT para autenticação)
- Yup (validação e criacao de schemas)

## 🚀 Funcionalidades

- Cadastro de usuário
- Login com autenticação JWT
- Proteção de rotas

## 📦 Como Configurar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/WellitonGalantt/api-login
   cd nome-do-repositorio
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto e defina as configurações necessárias, como conexão com o banco de dados.
   ```env
   DATABASE_URL=postgres://usuario:senha@localhost:5432/nome_do_banco
   JWT_SECRET=sua-chave-secreta
   ```

4. **Execute as migrações do banco:**
   ```sh
   npm run knex migrate:latest
   ```

5. **Inicie o servidor:**
   ```sh
   npm run dev
   ```

## 🔥 Rotas da API

### 📌 Autenticação
- `POST /auth/register` - Cadastra um novo usuário
- `POST /auth/login` - Autentica um usuário e retorna um token JWT

### 🔒 Usuários (Requer autenticação)
- `GET /auth/user` - Retorna os dados do usuário autenticado

## 🛠 Melhorias Futuras
- Implementação de atualização dos dados do usuário
- Implementação de recuperação de senha
- Implementação de deletar conta do usuário
- Log de atividades do usuário

---

Este projeto foi desenvolvido para aprendizado e pode ser expandido com novas funcionalidades! 🚀

