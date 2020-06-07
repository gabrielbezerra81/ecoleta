<p align="center">
  <img src="/web/src/assets/logo.svg">
</p>
<p align="center">
  Projeto ecológico desenvolvido na Next Level Week da Rocketseat
</p>
<p align="center">
  <img src="/NLW.jpeg">
</p>

O Ecoleta é uma aplicação que faz a conexão entre usuários e empresas ou entidades que coletam resíduos orgânicos e inorgânicos, como pilhas, baterias e lâmpadas.

## Como funciona?

O Ecoleta está dividido em 3 aplicações: web, mobile e back-end. Através da aplicação web, as empresas ou entidades fazem o registros dos pontos de coleta. Na aplicação mobile, os usuários buscam pontos de coletas nas suas cidades filtrando pelo itens de coletados.

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
npm install ou yarn
```

Altere o [serverURL](/server/src/server.ts) para o endereço local da sua máquina:
```
const portNumber = 3333;
export const serverURL = `http://SeuIPAqui:${portNumber}`;
```

Configurando banco de dados:
```
npm run knex:migrate ou yarn knex:migrate
npm run knex:seed ou yarn knex:seed
```

Iniciando o servidor:
```
npm run dev ou yarn dev
```

#### Web

Instalando dependências:
```
cd web
npm install ou yarn
```

Iniciando aplicação web:
```
npm start ou yarn start
```

#### Mobile

Instalando dependências:
```
cd mobile
npm install ou yarn
```

Iniciando app mobile:

```expo start```  ou ```yarn start```


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

