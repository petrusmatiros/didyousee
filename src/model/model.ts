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
interface movie {
    id: number
    title: string
    overview: string
    rating: number
    popularity: number
    orig_lang: any
    img_path: string
    // genres: any
    // cast: any
    // reviews: any
    // budget: number
    // revenue: number
}

function movieFromQuery(input : any) : movie {
    return {
        id: input.id,
        title: input.title,
        overview: input.overview,
        rating: input.vote_average,
        popularity: input.popularity,
        orig_lang: input.original_language,
        img_path: image(input.poster_path),
        // genre_ids: input.genre_ids,

    }
}

interface model {
    movies: Promise<[movie]>
}

// Everything that should persist
let model : model = {
// TODO fetch data lazily
    movies: wrap("/discover/movie", new URLSearchParams()).then(data => data.data.results.map(movieFromQuery)),
}

async function getTrending(type : any, timeWindow : any) {
    //return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams()).then(query => query.data.results);
    return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams());
}

async function getMedia(id : String) {
    //return wrap(`/movie/${id}`, new URLSearchParams()).then(movie => movieFromQuery(movie));
    return wrap(`/movie/${id}`, new URLSearchParams());
}

async function getSimilarMedia(id : String) {
    //return wrap(`/movie/${id}/similar`, new URLSearchParams()).then(query => query.data.results);
    return wrap(`/movie/${id}/similar`, new URLSearchParams());
}

async function searchMovie(query : URLSearchParams) {
    //return wrap("/search/movie", query).then(query => query.data);
    return wrap("/search/movie", query);
}

export type {movie};
export {model, searchMovie, getTrending, getMedia, getSimilarMedia};
