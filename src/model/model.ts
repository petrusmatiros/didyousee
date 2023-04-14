import {tmdbApi, } from "./apiConfig";

function image(path : String) {
    let params = new URLSearchParams({"api_key": import.meta.env.VITE_TMDB_API_KEY});
    let res = "https://image.tmdb.org/" + "/t/p/w500" + path + "?" + params;
    return res;
}

function wrap(query : String, params : URLSearchParams) {
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

interface Content {
    id: Number,
    overview: String,
    vote_average: Number,
    popularity: Number,
    release_date: String,
    spoken_languages: {
        english_name: String,
        iso_639_1: String,
        name: String,
    }[],
    backdrop_path: String,
    poster_path: String
    genres: {
        id: Number,
        name: String,
    }[],
    budget: number
    revenue: number
    status: String,
    // credits: {
    //     cast: any[],
    //     crew: any[],
    // }
    // reviews: {
    //     id: Number,
    //     page: Number,
    //     results: any[],
    //     total_pages: Number,
    //     total_results: Number,
    // }
}

interface Movie extends Content {
    title: String
    runtime: Number,
    belongs_to_collection: {},
}

interface Series extends Content {
    name: String,
    created_by: any[],
    episode_run_time: Number[],
    last_episode_to_air: {},
    next_episode_to_air: {},
    number_of_episodes: Number,
    number_of_seasons: Number,
    seasons: any[],
}

function contentFromQuery(input: Movie | Series): Movie | Series {
    const content = {
        id: input.id,
        overview: input.overview,
        rating: input.vote_average,
        popularity: input.popularity,
        release_date: input.release_date,
        spoken_languages: input.spoken_languages,
        backdrop_path: image(input.backdrop_path),
        img_path: image(input.poster_path),
        genres: input.genres,
        budget: input.budget,
        revenue: input.revenue,
        status: input.status,
    }
    if ("title" in input) {
        return {
            ...content,
            title: input.title,
            runtime: input.runtime,
            belongs_to_collection: input.belongs_to_collection,
        }
    } else {
        return {
            ...content,
            name: input.name,
            created_by: input.created_by,
            episode_run_time: input.episode_run_time,
            last_episode_to_air: input.last_episode_to_air,
            next_episode_to_air: input.next_episode_to_air,
            number_of_episodes: input.number_of_episodes,
            number_of_seasons: input.number_of_seasons,
            seasons: input.seasons,
        }
    }
}

interface Model {
    movies: Promise<[Movie]>
}

// Everything that should persist
let model : Model = {
// TODO fetch data lazily
    movies: wrap("/discover/movie", new URLSearchParams()).then(data => data.data.results.map(contentFromQuery)),
}

async function getTrending(type : any, timeWindow : any, page : any) {
    //return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams()).then(query => query.data.results);
    return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams({page}));
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

export type {Movie};
export {model, searchMovie, getTrending, getMedia, getSimilarMedia};
