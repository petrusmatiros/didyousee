<p align="center">
<img width="128px" src="src/assets/didyousee.svg" alt="didyousee logo. an owl holding a binocular, looking for the next movie/series" width=32 style="vertical-align:middle">
<h1 align="center">didyousee</h1>
</p>


## Table of Contents
  - [Website URL](#website-url)
  - [Project description](#project-description)
  - [APIs](#apis)
  - [Background](#background)
  - [Progress (what we have done so far)](#progress-what-we-have-done-so-far)
  - [Planning (what we still plan to do)](#planning-what-we-still-plan-to-do)
  - [Files](#files)
    - [File structure](#file-structure)
    - [File descriptions](#file-descriptions)
  - [Installation](#installation)
  - [Dependencies](#dependencies)
  - [Developers](#developers)

## Website URL
TBD (Firebase)
## Project description
An intuitive and modern web app where you can discover, share and organize your favourite movies and TV series. Personal lists (likes, watchlists, have watched, dislikes) with shareable links

## APIs
  - [TMDB](https://www.themoviedb.org/)
  - Trivia/Fun Fact API (TBD)
## Background
This was a group project for the course DH2642 *Interaction Programming and the Dynamic Web* at **KTH Royal Institute of Technology**. The project duration was about ~3 months.



## Progress (what we have done so far)
Currently, we've implemented the following:
- Basic layout (HTML & CSS): Home, Result, Profile, Login, Register
- Basic routing (Vue router)
- API call from TMDB
- Firebase hosting and deployment
## Planning (what we still plan to do)
We plan to implement the following:
- User authentication via Auth.js/Auth0/Firebase
- Implement MVC architecture and use observers
- Search functionality, with filters
- More intuitive layout
- Improved UX/UI, usability and accessibility
- Profile page with personal lists (liked, watchlist, have watched, dislikes)
- Shareable lists via URL and exportability of lists (CSV, JSON, etc.)
- Recommend movies/series
## Files 
### File structure
```css
├── README.md
├── index.html
├── package-lock.json
├── package.json
├── public
│   ├── images
│   ├── index.css
│   ├── index.html
│   └── vite.svg
├── server
│   ├── controllers
│   │   └── models
│   │       └── routes
│   ├── firebase.ts
│   ├── index.ts
│   ├── middleware
│   └── server.ts
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── didyousee.svg
│   │   ├── dummy.png
│   │   └── tmdb_alt_short_blue.svg
│   ├── components
│   │   ├── Filter.vue
│   │   └── MovieCard.vue
│   ├── main.ts
│   ├── model
│   │   ├── apiConfig.ts
│   │   └── model.ts
│   ├── models
│   ├── router
│   │   └── index.ts
│   ├── style.css
│   ├── types
│   ├── utils
│   │   └── index.ts
│   ├── views
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Profile.vue
│   │   ├── Register.vue
│   │   └── Result.vue
│   └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
### File descriptions
| File Name | Description |
| --------- | ----------- |
| README.md | Readme file containing project information |
| index.html | Main HTML file for the project |
| package-lock.json | Automatically generated file for npm dependencies |
| package.json | Contains project information and dependencies |
| public/ | Folder containing public assets |
| public/images/ | Folder containing images used in the project |
| public/index.css | Main CSS file for the project |
| public/index.html | HTML template for the project |
| public/vite.svg | Vite logo |
| server/ | Server-side code for the project |
| server/controllers/ | Controllers for the server |
| server/models/ | Models for the server |
| server/routes/ | Routes for the server |
| server/firebase.ts | Firebase configuration file |
| server/index.ts | Main server file |
| server/middleware/ | Middleware for the server |
| src/ | Client-side code for the project |
| src/App.vue | Main Vue component for the project |
| src/assets/ | Folder containing assets used in the project |
| src/assets/didyousee.svg | Logo for the project |
| src/assets/dummy.png | Placeholder image |
| src/assets/tmdb_alt_short_blue.svg | TMDB logo |
| src/components/ | Vue components used in the project |
| src/components/Filter.vue | Component for filtering movies/series |
| src/components/MovieCard.vue | Component for displaying movie/series information |
| src/main.ts | Main entry point for the Vue app |
| src/model/ | Configuration files for API |
| src/model/apiConfig.ts | API configuration file |
| src/model/model.ts | Models for the project |
| src/router/ | Vue router configuration |
| src/router/index.ts | Vue router configuration file |
| src/style.css | Main CSS file for the project |
| src/types/ | Type definitions for the project |
| src/utils/ | Utility functions for the project |
| src/utils/index.ts | Utility functions file |
| src/views/ | Vue views for the project |
| src/views/Home.vue | Home page Vue component |
| src/views/Login.vue | Login page Vue component |
| src/views/Profile.vue | Profile page Vue component |
| src/views/Register.vue | Register page Vue component |
| src/views/Result.vue | Result page Vue component |
| vite-env.d.ts | Typescript definition file for Vite |
| tsconfig.json | Typescript configuration file for the project |
| tsconfig.node.json | Typescript configuration file for Node.js |
| vite.config.ts | Configuration file for Vite |



## Installation
```
npm i
npm run build
```

## Dependencies
```json

```

## Developers
- [Petrus Matiros](https://github.com/petrusmatiros)
- Max Olof Isralesson ([Blezie](https://github.com/Blezie) [maxisr](https://github.com/maxisr))
- [Sebastian Thomas Willenbrink](https://github.com/Willenbrink)
