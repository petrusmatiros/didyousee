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
    img: Promise<any>
    // genres: any
    // cast: any
    // reviews: any
    // budget: number
    // revenue: number
}

function movieFromQuery(input : any) {
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
    searchMovie: (query: URLSearchParams) => any
}

let model : model = {
// TODO fetch data lazily
    movies: wrap("/discover/movie", new URLSearchParams()).then(data => data.data.results.map(movieFromQuery)),
    searchMovie: function (query) {
        return wrap("/search/movie", query);
    },
}

export type {movie};
export {model};
