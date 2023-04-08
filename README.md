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
- User authentication via Auth.js/Auth0
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
│   │   └── vue.svg
│   ├── components
│   │   ├── Filter.vue
│   │   └── MovieCard.vue
│   ├── main.ts
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
| File                        | Description                                                                                               |
|-----------------------------|-----------------------------------------------------------------------------------------------------------|
| README.md                   | A markdown file containing information about the project.                                               |
| index.html                  | The main HTML file for the application.                                                                   |
| package-lock.json           | A file used by npm to lock dependencies to a specific version, ensuring consistency between installations. |
| package.json                | A file containing metadata about the project, including its dependencies and scripts to run.            |
| public/index.html           | The HTML file for the public directory, served as-is.                                                     |
| public/images               | A directory containing images used in the application.                                                   |
| public/index.css            | The CSS file for the main application page.                                                               |
| public/vite.svg             | An SVG image used in the public directory.                                                                |
| server/controllers          | A directory containing controllers for the server, organized by models and routes.                       |
| server/controllers/models   | A directory containing controllers for the server, organized by models.                                  |
| server/controllers/models/routes | A directory containing controllers for the server, organized by models and routes.                   |
| server/firebase.ts          | A TypeScript file containing the Firebase configuration for the server.                                  |
| server/index.ts             | The main TypeScript file for the server, including imports and server initialization.                    |
| server/middleware           | A directory containing middleware for the server.                                                        |
| server/server.ts            | The TypeScript file that sets up the server and its routes.                                               |
| src/App.vue                 | The main Vue component for the application.                                                               |
| src/assets/vue.svg          | An SVG image used in the application.                                                                     |
| src/components/Filter.vue   | A Vue component for filtering movies/series.                                                                     |
| src/components/MovieCard.vue | A Vue component for displaying individual movies/series.                                                        |
| src/main.ts                 | The main TypeScript file for the application, including imports and Vue initialization.                  |
| src/models                  | A directory containing TypeScript files defining the models used in the application.                      |
| src/router/index.ts         | The TypeScript file defining the routes for the application.                                              |
| src/style.css               | The CSS file for the main application page.                                                               |
| src/types                   | A directory containing TypeScript files defining the types used in the application.                       |
| src/utils/index.ts          | A TypeScript file containing utility functions used in the application.                                   |
| src/views/Home.vue          | A Vue component for the home page of the application.                                                     |
| src/views/Login.vue         | A Vue component for the login page of the application.                                                    |
| src/views/Profile.vue       | A Vue component for the user profile page of the application.                                             |
| src/views/Register.vue      | A Vue component for the registration page of the application.                                             |
| src/views/Result.vue        | A Vue component for the search results page of the application.                                           |
| src/vite-env.d.ts           | A TypeScript file defining the environment variables used in the application.                              |
| tsconfig.json               | A configuration file for TypeScript that specifies how to compile the code.                               |
| tsconfig.node.json          | A configuration file for TypeScript that specifies how to compile the server-side code.                   |
| vite.config.ts              | A configuration file for Vite, the development server and build tool used for the application.            |


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
- [Max Isralesson](https://github.com/Blezie)
- [Sebastian Thomas Willenbrink](https://github.com/Willenbrink)
