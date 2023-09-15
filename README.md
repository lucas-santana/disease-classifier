

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

# Instalar o tensorflow
$ npm install @tensorflow/tfjs-node

# Execute a aplicação
$ node index.js

# O servidor inciará na porta:3000 - acesse http://localhost:3000 

```

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Vá para a pasta da aplicação Front End
$ cd ../frontend

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

Veja o arquivo  [package.json](https://github.com/lucas-santana/disease-classifier/tree/main/backend/package.json)

---

## 🛠 Conversão do modelo do formato .keras para um formato compatível com tfjs-node

A função _converterKeras_ no arquivo  [converter_keras_json.ipynb](https://github.com/lucas-santana/disease-classifier/blob/main/converter_keras_json.ipynb) realiza a conversão do modelo no formato .keras para o formato .json a ser utilizado pela aplicação backend.

Chamar a função passando o caminho do arquivo keras: 
```
current_dir = os.path.abspath(os.getcwd())
converterKeras(current_dir+"/keras/keras/20221107_041534.keras")

```
Essa função ira salvar o modelo com os metadados na pasta [conversao](https://github.com/lucas-santana/disease-classifier/tree/main/conversao).

## 🛠 Importando o modelo convertido na aplicação backend (Node.js)

A importação do modelo no backend é realizada no arquivo [index.js](/home/lucas/disease-classifier/backend/index.js) com a função ```tf.loadLayersModel```.

Na pasta [conversao](https://github.com/lucas-santana/disease-classifier/tree/main/conversao) já existe alguns modelos convertidos.


## 🛠 Imagens de Teste

A pasta test_images contém algumas imagens de teste que poderão ser utilizadas para testar a aplicação.



