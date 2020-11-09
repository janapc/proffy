<h1 align="center">
  <img alt="icon" src="./mobile/assets/icon.png">
  <br>
  Proffy
</h1>

<p align="center">
  <img alt="Last commit" src="https://img.shields.io/github/last-commit/janapc/proffy"/>
  <img alt="License" src="https://img.shields.io/github/license/janapc/proffy"/>
  <img alt="Language count" src="https://img.shields.io/github/languages/count/janapc/proffy"/>
  <img alt="Language top" src="https://img.shields.io/github/languages/top/janapc/proffy"/>
    <img alt="Repo size" src="https://img.shields.io/github/repo-size/janapc/proffy"/>
</p>

<h4 align="center">
  This project was created in NLW of <a href="https://rocketseat.com.br">Rocketseat</a> with the purpose of connecting the teachers with the students, where the student can choose a subject, day of the week, and hour available and search teachers available.
</h4>


<p align="center">
  <a href="#key-environment-variables">Environment variables</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#arrowdown-installations">Installations</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-demo">Demo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#boom-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#page_facing_up-license">License</a>
</p>

***
## :key: environment variables:
In the folder server create a file .env with these configurations:
- **SECRET** = the variable secret to jwt
- **MAILERHOST** = the host of send mail
- **MAILERPORT** = the port of send mail
- **MAILERUSER** = the user of send mail
- **MAILERPASS** = the password of send mail
- **POSTGRESURL** = the url of postgres
- **EMAIL** = the email of owner

In the folder web create a file .env with these configurations:
- **REACT_APP_BASE_URL** = the url of server

In the folder mobile inside of src/utils/environment:
- **apiUrl** = the url of server
***

## :arrow_down: Installations:
To installations dependencies, follow the steps below inside folders:
```
  yarn or npm i
```
to run the folders, follow the steps below inside folders:
```
  yarn start or npm run start
```

***

## :fire: Demo
### Web
![web](./screenshot/web.gif)
### Mobile
![mobile](./screenshot/mobile.gif)


***

## :boom: Technologies

This project contains those technologies:

- [ReactJS](https://reactjs.org/)
- [Typescript][ts]
- [React-Router-Dom](https://github.com/ReactTraining/react-router)
- [Postgresql](https://www.postgresql.org/)
- [React-Native](https://github.com/facebook/react-native)
- [React-Navigation](https://reactnavigation.org/docs/use-route/)
- [Expo](https://github.com/expo/expo)
- [Node](https://nodejs.org/en/)
- [Knex](http://knexjs.org/)
- [VS Code][vscode] 


***

## :page_facing_up: License

This project is MIT licensed, as found in the [LICENSE](https://github.com/janapc/proffy/blob/main/LICENSE) file.


***

<br>

Made by Janapc :metal: [Get in touch!](https://www.linkedin.com/in/janaina-pedrina/)

[ts]: https://www.typescriptlang.org
[vscode]: https://code.visualstudio.com/
[yarn]: https://yarnpkg.com/