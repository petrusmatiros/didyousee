import {tmdbApi, } from "./apiConfig";

function image(path : string | null) {
    if(path === null)
        return null;
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
    vote_average: number

    spoken_languages: any
    poster_path: string | null
    release_date: any
    genres: any
}

function movieFromQuery(input : any) : movie {
    return {
        id: input.id,
        title: input.title,
        overview: input.overview,

        rating: input.vote_average.toFixed(2),
        vote_average: input.vote_average.toFixed(2),
        popularity: input.popularity,

        spoken_languages: input.spoken_languages,
        poster_path: image(input.poster_path),
        release_date: input.release_date,
        genres: input.genres,

    }
}

interface listing<El> {
    results: El[]
    page: number
    total_results: number
    total_pages: number
}

function resultsFromQuery<el>(conversion : any, input : any) : listing<el> {
    return {
        results: input.results.map(conversion),
        page: input.page,
        total_results: input.total_results,
        total_pages: input.total_pages,
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

async function getTrending(type : any, timeWindow : any) : Promise<listing<movie>> {
    return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams())
        .then(query => resultsFromQuery(movieFromQuery, query.data));
}

async function getMedia(id : String) : Promise<movie> {
    return wrap(`/movie/${id}`, new URLSearchParams())
        .then(query => movieFromQuery(query.data));
}

async function getSimilarMedia(id : String) : Promise<listing<movie>> {
    return wrap("/movie/${id}/similar", new URLSearchParams())
        .then(query => resultsFromQuery(movieFromQuery, query.data));
}

async function searchMovie(query : URLSearchParams) : Promise<listing<movie>> {
    return wrap("/search/movie", query)
        .then(query => resultsFromQuery(movieFromQuery, query.data));
}

export type {movie, listing};
export {model, searchMovie, getTrending, getMedia, getSimilarMedia};
