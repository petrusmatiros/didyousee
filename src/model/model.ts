import {tmdbApi, } from "./apiConfig";

function image(path : string) {
    let params = new URLSearchParams({"api_key": import.meta.env.VITE_TMDB_API_KEY});
    let res = "https://image.tmdb.org/" + "/t/p/w500" + path + "?" + params;
    return res;
}

function wrap(query : string, params : URLSearchParams) {
    params.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
    let res = tmdbApi.get(query + "?" + params);
    return res;
}

// TODO define model with all the things we need, amongst others:
/*
- title, overview/description
- rating/popularity
- languages (array) - skulle vara nice om vi sen kan klicka på dem och det tar oss till search med just den queryn (typ =action)
- genres (array) - klickbara också
- Cast
- Reviews (verkar finnas i apin)
- Similar movies?
- Director, writer (tror det tas från credits)
- Budget, revenue
 */
interface model {
    movies: any
    searchMovie: (query: URLSearchParams) => any
}

let model : model = {
    movies: null,
    searchMovie: function (query) {
        return wrap("/search/movie", query);
    },
}

// TODO fetch data lazily
wrap("/discover/movie", new URLSearchParams()).then(data => model.movies = data.data);

export default model;
