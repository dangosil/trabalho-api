# API de Revisão de Endpoints HTTP

Este projeto é um material didático para aprender e consolidar os fundamentos do desenvolvimento de APIs REST com Node.js, Express e TypeScript. O objetivo foi seguir um roteiro prático para entender os principais conceitos do protocolo HTTP e as boas práticas de arquitetura de software.

## Tecnologias Utilizadas

* **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript no servidor.
* **[TypeScript](https://www.typescriptlang.org/)**: Para tipagem estática e maior robustez.
* **[Express](https://expressjs.com/)**: Framework para construção da API HTTP.
* **Git & GitHub**: Controle de versão e hospedagem do código-fonte.

## Como Executar o Projeto

### Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/dangosil/trabalho-api.git
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd trabalho-api
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```

### Execução

Para iniciar o servidor em modo de desenvolvimento (com reinicialização automática), use:
```bash
npm run dev

O servidor estará rodando em http://localhost:3003.

# API - Usuários e Posts

Este projeto implementa uma API simples para gerenciamento de **usuários** e **posts**.

---

## Endpoints da API

A seguir, a lista de todos os endpoints disponíveis.

---

### Usuários

#### `GET /users`
- **Descrição:** Lista todos os usuários.

#### `GET /users/:id`
- **Descrição:** Busca um usuário pelo seu ID.  
- **Parâmetros:** `id` na rota (exemplo: `/users/1`).

#### `GET /users/search`
- **Descrição:** Busca usuários por nome.  
- **Parâmetros:** Query Param `name` (exemplo: `?name=alice`).

#### `GET /users/age-range`
- **Descrição:** Filtra usuários por faixa de idade.  
- **Parâmetros:** Query Params `min` e `max` (exemplo: `?min=20&max=35`).

#### `POST /users`
- **Descrição:** Cria um novo usuário.  
- **Body (JSON):**
    
    ```json
    {
      "id": 5,
      "name": "Fulano",
      "email": "fulano@email.com",
      "role": "user",
      "age": 25
    }
    ```

#### `PUT /users/:id`
- **Descrição:** Atualiza **completamente** um usuário. Todos os campos são obrigatórios.  
- **Parâmetros:** `id` na rota.  
- **Body (JSON):**
    
    ```json
    {
      "name": "Fulano Atualizado",
      "email": "novoemail@email.com",
      "role": "user",
      "age": 26
    }
    ```

#### `DELETE /users/cleanup-inactive`
- **Descrição:** Deleta usuários inativos (sem posts e que não são admins).  
- **Parâmetros:** Query Param `confirm=true` (obrigatório).

---

### Posts

#### `GET /posts`
- **Descrição:** Lista todos os posts.

#### `POST /posts`
- **Descrição:** Cria um novo post.  
- **Body (JSON):**
    
    ```json
    {
      "title": "Meu primeiro post",
      "content": "Este é o conteúdo do post.",
      "authorId": 1
    }
    ```

#### `PATCH /posts/:id`
- **Descrição:** Atualiza **parcialmente** um post (apenas os campos enviados).  
- **Parâmetros:** `id` na rota.  
- **Body (JSON):**
    
    ```json
    {
      "title": "Novo Título"
    }
    ```

#### `DELETE /posts/:id`
- **Descrição:** Deleta um post. Requer autorização via header.  
- **Parâmetros:** `id` na rota.  
- **Header:** `user-id: 1`

---

## Observações
- Para requisições **DELETE**, confirme os parâmetros e headers obrigatórios.  
- Todos os endpoints retornam respostas em **JSON**.
