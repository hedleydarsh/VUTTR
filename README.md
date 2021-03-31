# VUTTR
Api foi desenvolvida para o challenge BossaBox. Trata-se de uma aplicação para gerenciar ferramentas com seus respectivos nomes, links, descrições e tags.

### Features

- [x] CRUD de ferramentas
- [x] Pesquisa de ferramenta por tag
- [x] CRUD de usuários
- [x] Autenticação de usuários com JWT
- [ ] Autenticação de usuários com OAuth2
- [ ] Testes unitários
- [x] Documentação com Blueprint

### Pré-requisitos
Esta api foi desenvolvida pensando em um ambiente nodejs com um banco de dados relacional (MYSQL / MariaDB).
Portanto antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git] (https://git-scm.com), 
[Node.js] (https://nodejs.org/en/). 
[MYSQL] (https://www.mysql.com/downloads/)

Minha sugestão de editor de texto seria o [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone <https://www.mysql.com/downloads/>

# Acesse a pasta do projeto no terminal/cmd
$ cd VUTTR

# Instale as dependências
$ npm install

# Crie um banco de dados MYSQL ou MariaDB com o seu SGBD favorito ou por meu de linha de comando
$ CREATE DATABASE vuttr CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Por padrão o usuário do banco de dados é "root" e sem senha
# Caso necessário você poderá alterar estas credenciais no arquivo .env

# Depois de criado o banco de dados rode o seguinte comando para iniciar as migrações
npx sequelize db:migrate

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse <http://localhost:3000>

### As rotas do desafio não precisão de autenticação, são elas:
## GET  - localhost:3000/tools -> Lista todas as ferramentas.
## POST - localhost:3000/tools -> Cria uma nova ferramenta.
   Deverá utilizar por exemplo:
   header: Content-Type: application/json
   body: {
          "title": "hotel",
          "link": "https://github.com/typicode/hotel",
          "tags": [
              "node",
              "organizing",
              "webapps",
              "domain",
              "developer",
              "https",
              "proxy"
          ]
    }
    
## GET - localhost:3000/tools/{id} -> Lista uma ferramenta por id.
## GET - localhost:3000/tools?tag="texto" -> Lista ferramentas por tags.
## DELETE - localhost:3000/tools/{id} -> Deleta uma ferramenta por id.
## PUT - localhost:3000/tools/{id} -> atualiza a ferramenta, utilize os atributos mostrados no método post.

# As rotas de usuário possuem autenticação, então você precisará registrar um usuário, use a rota
## GET - localhost:3000/auth/register -> Para registrar seu usuário.

# Para saber como testar as rotas de usuário abra a documentação que se encontra no arquivo doc_api.html

```
