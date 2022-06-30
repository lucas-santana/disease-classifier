

<h1 align="center">
     :stethoscope: <a href="#" alt="Classificação de Patologias utilizando imagens médicas"> Classificação de Patologias utilizando imagens médicas </a>
</h1>



<h4 align="center">
	🚧   Em andamento 🚧
</h4>

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando o Backend (servidor)](#user-content--rodando-o-backend-servidor)
     * [Rodando a aplicação web (Frontend)](#user-content--rodando-a-aplicação-web-frontend)
<!--te-->


## 💻 Sobre o projeto

:stethoscope:  Aplicação web para classificar patologias utilizando imagens médicas


## 🚀 Como executar o projeto

Este projeto é divido em duas partes:
1. Backend (pasta backend) 
2. Frontend (pasta frontend)

💡 O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone https://github.com/lucas-santana/disease-classifier.git

# Acesse a pasta do projeto no terminal/cmd
$ cd disease-classifier

# Vá para a pasta server
$ cd backend

# Instale as dependências
$ npm install

# Execute a aplicação
$ node index.js

# O servidor inciará na porta:3000 - acesse http://localhost:3000 

```

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone https://github.com/lucas-santana/disease-classifier.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd disease-classifier

# Vá para a pasta da aplicação Front End
$ cd frontend

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run start

# A aplicação será aberta na porta:4200 - acesse http://localhost:4200

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Website**  ([Angular](https://angular.io/)  +  [TypeScript](https://www.typescriptlang.org/))


> Veja o arquivo  [package.json](https://github.com/lucas-santana/disease-classifier/tree/main/frontend/package.json)

#### [](https://github.com/lucas-santana/disease-classifier#server-nodejs)**Server**  ([NodeJS](https://nodejs.org/) )

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[express-fileupload](https://github.com/richardgirges/express-fileupload#readme)**

> Veja o arquivo  [package.json](https://github.com/lucas-santana/disease-classifier/tree/main/backend/package.json)

---

## 🛠 Imagens de Teste

A pasta test_images contém algumas imagens de teste que poderão ser utilizadas para testar a aplicação.

