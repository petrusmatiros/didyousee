<p align="center">
<img width="128px" src="../didyousee/src/assets/didyousee.svg" alt="didyousee logo. an owl with a binocular, looking for the next movie/series" width=32 style="vertical-align:middle">
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
  - [Trivia/Fun Fact API](https://opentdb.com/api_config.php)
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
.
├── 404.html
├── README.md
├── firebase.json
├── index.html
├── package-lock.json
├── package.json
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
│   │   ├── icons8-google.svg
│   │   ├── no-backdrop.svg
│   │   ├── no-content.svg
│   │   ├── no-poster.svg
│   │   └── tmdb_alt_short_blue.svg
│   ├── components
│   │   ├── CarouselCast.vue
│   │   ├── CarouselMedia.vue
│   │   ├── CastCard.vue
│   │   ├── Filter.vue
│   │   ├── ListCard.vue
│   │   ├── MediaCard.vue
│   │   ├── ReviewCard.vue
│   │   ├── SearchBar.vue
│   │   └── WatchProviders.vue
│   ├── firebaseConfig.ts
│   ├── main.ts
│   ├── model
│   │   ├── apiConfig.ts
│   │   ├── apiEndpoints.ts
│   │   ├── model.ts
│   │   └── promiseHandler.ts
│   ├── presenters
│   │   ├── AboutPresenter.vue
│   │   ├── CastPresenter.vue
│   │   ├── ContentPresenter.vue
│   │   ├── HomePresenter.vue
│   │   ├── ListPresenter.vue
│   │   ├── LoginPresenter.vue
│   │   ├── PageNotFoundPresenter.vue
│   │   ├── ProfilePresenter.vue
│   │   ├── RegisterPresenter.vue
│   │   ├── ReviewsPresenter.vue
│   │   └── SearchResultsPresenter.vue
│   ├── router
│   │   └── routes.ts
│   ├── style.css
│   ├── types
│   │   └── types.ts
│   ├── utils
│   │   └── utils.ts
│   ├── views
│   │   ├── AboutView.vue
│   │   ├── CastView.vue
│   │   ├── ContentView.vue
│   │   ├── HomeView.vue
│   │   ├── ListView.vue
│   │   ├── LoginView.vue
│   │   ├── PageNotFoundView.vue
│   │   ├── ProfileView.vue
│   │   ├── RegisterView.vue
│   │   ├── ReviewsView.vue
│   │   └── SearchResultsView.vue
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
| src/assets/no-poster.svg | Placeholder image |
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
To setup the site locally, install the packages and build the project.
```
npm i
npm run build
```

To get a development build, run `npm run dev`. This will run the server and the typescript checker in parallel.

### API Keys
Not included in the repository are the private api keys. To run the code locally you will need to acquire a TMDB api key and set up your own firebase and provide its config. The TMDB api key is provided through the environment, e.g. through a `.env` file in the root of the directory. The key is named `VITE_TMDB_API_KEY`.

The template of the firebase config file is. It is expected to reside at `src/firebaseConfig.ts`:

``` javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
// Insert your config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth()

const db = getDatabase(app)

export { app, auth, db }// Import the functions you need from the SDKs you need
```

### Dependencies
```json
{
  "name": "didyousee",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "concurrently \"vue-tsc --watch\" \"vite\"",
    "dev-no-tsc": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/numeral": "^2.0.2",
    "@vitejs/plugin-vue": "^4.1.0",
    "@vue/compiler-sfc": "^3.2.47",
    "autoprefixer": "^10.4.14",
    "concurrent": "^0.3.2",
    "pinia": "^2.0.33",
    "postcss": "^8.4.21",
    "prettier": "^2.8.7",
    "typescript": "^4.9.3",
    "vite": "^4.2.1",
    "vue": "^3.2.36",
    "vue-tsc": "^1.2.0"
  },
  "dependencies": {
    "@google-cloud/firestore": "^6.5.0",
    "@splidejs/vue-splide": "^0.6.12",
    "@types/express": "^4.17.17",
    "auth-js": "^0.0.16",
    "axios": "^1.3.5",
    "better-logging": "^5.0.0",
    "chart.js": "^4.2.1",
    "concurrently": "^8.0.1",
    "cors": "^2.8.5",
    "dompurify": "^3.0.2",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "firebase": "^9.20.0",
    "fuse.js": "^6.6.2",
    "fuzzy": "^0.1.3",
    "numeral": "^2.0.6",
    "vue-router": "^4.1.6"
  }
}
```

## Developers
- [Petrus Matiros](https://github.com/petrusmatiros)
- Max Olof Isralesson ([Blezie](https://github.com/Blezie), [maxisr](https://github.com/maxisr))
- [Sebastian Thomas Willenbrink](https://github.com/Willenbrink)
