# 🎬 Cine-Stream — Sprint 10

A modern movie discovery web application built with **Next.js, React, and Redux Toolkit**.

Cine-Stream Sprint 10 focuses on advanced frontend state management using Redux Toolkit, global movie filters, favorites management, theme switching, and React performance optimization.

---

## 🚀 Live Project

🔗 **GitHub Repository:**  
https://github.com/LaibahNaushin/cine-stream-sprint10

---

## 📌 Project Overview

Cine-Stream is a movie discovery platform where users can browse movies, search and filter the movie collection, manage their favorite movies, and switch between dark and light themes.

This Sprint 10 implementation focuses on migrating application-level state into **Redux Toolkit** and creating a scalable global state architecture.

---

## ✨ Features

- 🎬 Movie discovery interface
- 🔎 Global movie search
- 🎭 Genre filtering
- ⭐ Minimum rating filtering
- 📊 Movie sorting
- ❤️ Add/remove favorite movies
- 📌 Dedicated Favorites page
- 🌙 Dark/Light theme toggle
- 💾 Redux state persistence using Local Storage
- ⚡ `useMemo` optimization for movie filtering
- ⚡ `useCallback` optimization for favorite actions
- 📱 Responsive design
- 🧩 Reusable React components
- 🗂️ Global state management with Redux Toolkit

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework |
| React | UI development |
| Redux Toolkit | Global state management |
| React Redux | Connecting React with Redux |
| JavaScript | Application logic |
| CSS | Styling and responsive UI |
| Local Storage | State persistence |
| Git & GitHub | Version control |

---

## 🧠 Redux Architecture

The application uses Redux Toolkit with separate slices for different global states.

```text
redux/
├── store.js
└── slices/
    ├── favoritesSlice.js
    ├── filterSlice.js
<<<<<<< HEAD
    └── themeSlice.js
=======
    └── themeSlice.js
>>>>>>> 33063c91bb43063a30b26dd792f05a5c11f069c4
