# chat_app_cp
<p style="display: inline">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">
    <img src ="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB">
    <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101">
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Table of contents
- [Description](#description)
- [Feature](#feature)
- [Usage](#usage)
- [App structure](#app-structure)



## Description
This is chat application for people who attend Atcoder ABC contest. username is generated automatically and choose room by programming language.

Login or registration is not required to help make community larger.

## Feature
1. Group chatting
2. Disable chatting feature during the contest

## Usage
[Chat app link](https://chat-app-cp.onrender.com)

**This is landing page you can choose group to join.**
![alt text](/landing.png)
<br>

**This is how chat room look like**
![alt text](/chatRoom.png)

## App structure
```
chat-app/
├── node_modules/
├── public/
│   ├── chat.html
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   │   └── start.js
├── utils/
│   ├── app.js
│   └── server.js
├── index.js
├── .gitignore
├── package.json
└── README.md
```


