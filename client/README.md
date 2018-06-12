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

  React Native bundler not follow symlinks created by npm [#1](https://github.com/facebook/metro/issues/1)

## Build & Run

#### Clone repo:

```bash
$ git clone https://github.com/hkgos/hkug.git
```

#### 用Docker直接 run web client: go to client folder and do the following:

  * Build the image:

  ```bash
  $ docker build -t hkug .
  ```

  * Run the image:

  ```bash
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

  * Run dev server:

    ```bash
    $ yarn run dev
    ```

    open your browser and go to http://localhost:8080

  * Run production server:

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
