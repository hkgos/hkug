## 關於
  此Project為HKUG的 Client app (Web App和Native Mobile App)

  分為 3 部分:

  * [Core](https://github.com/hkgos/hkug/tree/master/client/core)
    * Core logic (shared between Web & Mobile)
  * [Web](https://github.com/hkgos/hkug/tree/master/client/web)
    * Web App (React)
  * [Mobile](https://github.com/hkgos/hkug/tree/master/client/mobile)
    * Native Mobile App (React Native)

## 事前準備
  Nodejs 8 (Nodejs 6.x 可能有問題) or Docker (Web client only)

  不使用Docker的話強烈建議使用yarn進行install

  特別是run mobile app, 用npm install 會有build不到的問題

  #### 再強調一次：不要使用npm，可能會build不到mobile client

## Build & Run

#### Clone repo:

```bash
$ git clone https://github.com/hkgos/hkug.git
```

#### 用Docker直接 run web client: go to client folder and do the following:

```bash
$ docker build -t hkug .
$ docker run -p 8080:8080 hkug
```
open your browser and go to http://localhost:8080

#### 不使用docker, 首先build core

  * Go to client/core folder and do the following:

  ```bash
  $ yarn install
  $ yarn run compile
  ```

#### 然後build Web / Mobile

* Web: Go to client/web folder and do the following:

  ```bash
  $ yarn install
  ```

  * Run dev sever:

    ```bash
    $ yarn run dev
    ```
    注意：若使用dev server，因為高登API沒有CORS Support，browser 需安裝 [CORS extension](https://chrome.google.com/webstore/search/cors) 才能正常使用，否則會看不到所有高登的post。

    警告：CORS extension用後請關掉，否則會有Security Risk！

    open your browser and go to http://localhost:8080

  * Run production sever:

    ```bash
    $ yarn run build:prod
    $ yarn start
    ```
    open your browser and go to http://localhost:8080

* Mobile: Go to client/mobile folder and do the following:

  ```bash
  $ yarn install
  $ yarn start
  ```
