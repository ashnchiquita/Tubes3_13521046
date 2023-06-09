# C3GPT - Lite version of ChatGPT

Tugas Besar III IF2211 Strategi Algoritma
<br />

## Table of Contents
- [C3GPT - Lite version of ChatGPT](#c3gpt---lite-version-of-chatgpt)
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Tampilan Program](#tampilan-program)
  - [Prerequisites](#prerequisites)
  - [How to Run](#how-to-run)
  - [Features](#features)
  - [Programming Languange](#programming-languange)
  - [Project Structure](#project-structure)
  - [Our Website](#our-website)
  - [Credits](#credits)

## General Information
Web application mirip ChatGPT sederhana yang dapat menampilkan jawaban sesuai pertanyaan user jika pertanyaan tersebut telah ada di database. Web application ini juga menyediakan fitur untuk menambahkan pertanyaan ke database dan menghapus pertanyaan dari database.

## Tampilan Program
> ![Main View](./screenshot/main.png)

## Prerequisites

- NodeJS
- npm

## How to Run

- Install the dependencies

```bash
npm ci
```

- Run the development server

```bash
npm run dev
```

## Features
- Calculator Feature
- Day Name Generator Feature (Use format: DD/MM/YYYY)
- Ask Question Feature
- Add Question to Database Feature (Use format: "Tambahkan pertanyaan xxx dengan jawaban xxx)
- Delete Question from Database Feature (Use format: "Hapus pertanyaan xxx)

## Programming Languange
* JavaScript

## Project Structure
```bash
Tubes3_13521046
│
├───backend
│    ├── db
│    │    └── db.js
│    ├── handlers
│    │    ├── chat.js
│    │    ├── history.js
│    │    └── qna.js
│    ├── lib
│    │    ├── bm.js
│    │    ├── calculator.js
│    │    ├── date.js
│    │    ├── kmp.js
│    │    ├── regex.js
│    │    ├── search.js
│    │    └── similarity.js
│    └── models
│         ├── ChatSchema.js
│         ├── HistorySchema.js
│         └── QnASchema.js
│
├───components
│    ├── chat-history-bar.js
│    └── chat.jsx
│
├───pages
│    ├── api
│    │    ├── chat.js
│    │    ├── history.js
│    │    └── qna.js
│    ├── _app.js
│    ├── _document.js
│    └── index.js
│
├───public
│    ├── bot_avatar.svg
│    └── user_avatar.svg
│
├───screenshot
│    └── main.png
│
├───services
│    ├── chat.js
│    ├── history.js
│    └── qna.js
│
├───styles
│    ├── Home.module.css
│    └── globals.css
│
├───doc
│   └── C3GPT.pdf
│
└───README.md
```
## Our Website
Please kindly visit our website at [c3gpt.vercel.app.com](http://c3gpt.vercel.app.com)!!

## Credits
<h3 align="center">Made with love by...</h3>
<h1 align="center">C3GPT Team!!</h1>

![FotoKelompok](./screenshot/stima.png)

This project was implemented by:
1. Jeffrey Chow (13521046)
2. Bill Clinton (13521064)
3. Chiquita Ahsanunnisa (13521129)
