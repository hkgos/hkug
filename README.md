[![Build Status](https://travis-ci.org/hkgos/hkug.svg?branch=master)](https://travis-ci.org/hkgos/hkug)

<p align="center">
<img src="https://raw.githubusercontent.com/hkgos/hkug/master/logo/logo@2x-100.jpg" alt="HKUG logo" width="120" />
</p>

# 什麼是 HKUG?
![HKUG](https://raw.githubusercontent.com/hkgos/hkug/master/logo/cover.jpg)
HKG ＋ LIHKG ＝ HKUG

[Demo](https://hkug.arukascloud.io/)

## 目標
建立一個可以同時觀看高登及連登的討論區，方便兩登都想留意的用家。

## 採用技術
* react
* react native
* node.js

## Source
* [Nodejs Backend](https://github.com/hkgos/hkug/tree/master/hkug-backend-node) - 收集兩登 data 輸出一個 REST API 的 backend。
* ~~[React Frontend](https://github.com/hkgos/hkug/tree/master/hkug-frontend-react)~~ - (Deprecated: 已和Mobile client合併到Client) Web client。 直接fetch 兩登 API 觀看。
* [Client](https://github.com/hkgos/hkug/tree/master/client) - Web / Mobile client。直接 fetch 兩登 API 觀看

## Roadmap
- ~~召集人手~~
- ~~收集並結合兩登 data~~
- ~~建立適合同時觀看兩登的界面~~
- Mobile Native App
- 可以分別登入兩登帳號並留言
