<p align="center">
<img width="128px" src="src/assets/didyousee.svg" alt="didyousee logo. an owl with a binocular, looking for the next movie/series" width=32 style="vertical-align:middle">
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
    - [API keys](#api-keys)
    - [Dependencies](#dependencies)
  - [Developers](#developers)

## Website URL
https://didyousee-4b593.web.app/

## Project description
An intuitive and modern web app where you can discover, share and organize your favourite movies and TV series. Personal lists (likes, watchlists, have watched, dislikes) with shareable links

## APIs
  - [TMDB](https://www.themoviedb.org/)
  - [Open Trivia Database](https://opentdb.com/api_config.php)

## Background
This was a group project for the course DH2642 *Interaction Programming and the Dynamic Web* at **KTH Royal Institute of Technology**. The project duration was about ~3 months.

## Progress (what we have done so far)
Currently, we've implemented the following:
- Basic layout (HTML & CSS): Home, Result, Profile, Login, Register
- Basic routing (Vue router)
- API call from TMDB
- Firebase hosting and deployment
- User authentication via Auth.js/Auth0/Firebase
- Search functionality, with filters
- Profile page with personal lists (liked, watchlist, have watched, dislikes)

## Planning (what we still plan to do)
We plan to implement the following:
- Improved UX/UI and usability
- Improved accessibility
- Shareable lists via URL and exportability of lists (CSV, JSON, etc.). Implemented partially in a PR.

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
| File/Folder | Description |
| --- | --- |
| 404.html | Error page |
| README.md | Readme file |
| firebase.json | Firebase configuration file |
| index.html | Main HTML file |
| package-lock.json | Dependency file |
| package.json | Package configuration file |
| server/ | Server folder |
| server/controllers/ | Controllers folder |
| server/controllers/models/ | Models folder |
| server/controllers/models/routes/ | Routes folder |
| server/firebase.ts | Firebase setup file |
| server/index.ts | Server entry point |
| server/middleware/ | Middleware folder |
| server/server.ts | Server configuration file |
| src/ | Source folder |
| src/App.vue | Main Vue component |
| src/assets/ | Assets folder |
| src/assets/didyousee.svg | Asset file |
| src/assets/icons8-google.svg | Asset file |
| src/assets/no-backdrop.svg | Asset file |
| src/assets/no-content.svg | Asset file |
| src/assets/no-poster.svg | Asset file |
| src/assets/tmdb_alt_short_blue.svg | Asset file |
| src/components/ | Vue components folder |
| src/components/CarouselCast.vue | Vue component |
| src/components/CarouselMedia.vue | Vue component |
| src/components/CastCard.vue | Vue component |
| src/components/Filter.vue | Vue component |
| src/components/ListCard.vue | Vue component |
| src/components/MediaCard.vue | Vue component |
| src/components/ReviewCard.vue | Vue component |
| src/components/SearchBar.vue | Vue component |
| src/components/WatchProviders.vue | Vue component |
| src/firebaseConfig.ts | Firebase configuration file |
| src/main.ts | Main TypeScript file |
| src/model/ | Model folder |
| src/model/apiConfig.ts | API configuration file |
| src/model/apiEndpoints.ts | API endpoints file |
| src/model/model.ts | Model file |
| src/model/promiseHandler.ts | Promise handler file |
| src/presenters/ | Vue presenters folder |
| src/presenters/AboutPresenter.vue | Vue presenter |
| src/presenters/CastPresenter.vue | Vue presenter |
| src/presenters/ContentPresenter.vue | Vue presenter |
| src/presenters/HomePresenter.vue | Vue presenter |
| src/presenters/ListPresenter.vue | Vue presenter |
| src/presenters/LoginPresenter.vue | Vue presenter |
| src/presenters/PageNotFoundPresenter.vue | Vue presenter |
| src/presenters/ProfilePresenter.vue | Vue presenter |
| src/presenters/RegisterPresenter.vue | Vue presenter |
| src/presenters/ReviewsPresenter.vue | Vue presenter |
| src/presenters/SearchResultsPresenter.vue | Vue presenter |
| src/router/ | Vue router folder |
| src/router/routes.ts | Router configuration file |
| src/style.css | Main CSS file |
| src/types/ | TypeScript types folder |
| src/types/types.ts | TypeScript types file |
| src/utils/ | Utility folder |
| src/utils/utils.ts | Utility file |
| src/views/ | Vue views folder |
| src/views/AboutView.vue | Vue view |
| src/views/CastView.vue | Vue view |
| src/views/ContentView.vue | Vue view |
| src/views/HomeView.vue | Vue view |
| src/views/ListView.vue | Vue view |
| src/views/LoginView.vue | Vue view |
| src/views/PageNotFoundView.vue | Vue view |
| src/views/ProfileView.vue | Vue view |
| src/views/RegisterView.vue | Vue view |
| src/views/ReviewsView.vue | Vue view |
| src/views/SearchResultsView.vue | Vue view |
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
- [Sebastian Willenbrink](https://github.com/Willenbrink)
