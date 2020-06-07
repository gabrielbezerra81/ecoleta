<p align="center">
  <img src="/web/src/assets/logo.svg">
</p>
<p align="center">
  Projeto ecológico desenvolvido na Next Level Week da Rocketseat
</p>
<p align="center">
  <img src="/NLW.jpeg">
</p>

<p align="justify">
  O Ecoleta é uma aplicação que faz a conexão entre usuários e empresas ou entidades que coletam resíduos orgânicos e inorgânicos, como pilhas, baterias e lâmpadas.
</p>

## Como funciona?

<p align="justify">O Ecoleta está dividido em 3 aplicações: web, mobile e back-end. Através da aplicação web, as empresas ou entidades fazem os registros dos pontos de coleta. Na aplicação mobile, os usuários buscam pontos de coletas nas suas cidades filtrando pelo itens de coletados.
</p>

## Layout utilizado
[Ecoleta - Figma](https://www.figma.com/file/9TlOcj6l7D05fZhU12xWT3/Ecoleta-(Booster)?node-id=0%3A1)

## Resultado final

##### Web:

##### Mobile:
<p align="centern">
  <img   src="/projectScreenshots/mobileScreenshot.jpg">
</p>

## Tecnologias utilizadas

* [React JS](https://pt-br.reactjs.org/)
* [React Native](https://reactnative.dev/)
* [Node.js](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)

## Como utilizar

Veja as instruções para instalar as dependências de cada aplicação e executar testes locais.

### Pré-requisitos

* [Node.js - versão LTS](https://nodejs.org/en/download/)
* [Expo](https://expo.io/learn)

### Executando projetos

#### Back-end

Instalando dependências:
```
cd server
npm install
```

Altere o [serverURL](/server/src/server.ts) para o endereço local da sua máquina:
```
const portNumber = 3333;
export const serverURL = `http://SeuIPAqui:${portNumber}`;
```

Configurando banco de dados:
```
npm run knex:migrate
npm run knex:seed
```

Iniciando o servidor:
```
npm run dev
```

#### Web

Instalando dependências:
```
cd web
npm install
```

Iniciando aplicação web:
```
npm start
```

#### Mobile

Altere a [baseURL](/mobile/src/api/api.ts) da API para o endereço local da sua máquina:
```
const api = axios.create({
  baseURL: "http://SeuIPAqui:3333",
});
```

Instalando dependências:
```
cd mobile
npm install
```

Iniciando app mobile:
```
expo start
```

## Endpoints:

* **GET**: `/items` - Listagem dos itens coletados
* **POST**: `/points` - Cadastro de um ponto de coleta
* **GET**: `/points` - Listagem dos pontos de coleta filtrados por UF, cidade e itens coletados
* **GET**: `/points/id` - Mostrar um ponto de coleta específico
