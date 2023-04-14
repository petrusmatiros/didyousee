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

interface Content {
    id: number,
    overview: string,
    vote_average: number,
    popularity: number,
    release_date: string,
    spoken_languages: {
        english_name: string,
        iso_639_1: string,
        name: string,
    }[],
    backdrop_path: string,
    poster_path: string
    genres: {
        id: number,
        name: string,
    }[],
    budget: number
    revenue: number
    status: string,
    // credits: {
    //     cast: any[],
    //     crew: any[],
    // }
    // reviews: {
    //     id: number,
    //     page: number,
    //     results: any[],
    //     total_pages: number,
    //     total_results: number,
    // }
}

interface Movie extends Content {
    title: string
    runtime: number,
    belongs_to_collection: {},
}

interface Series extends Content {
    name: string,
    created_by: any[],
    episode_run_time: number[],
    last_episode_to_air: {},
    next_episode_to_air: {},
    number_of_episodes: number,
    number_of_seasons: number,
    seasons: any[],
}

function contentFromQuery(input: Movie | Series): Movie | Series {
    const content = {
        id: input.id,
        overview: input.overview,
        vote_average: input.vote_average,
        popularity: input.popularity,
        release_date: input.release_date,
        spoken_languages: input.spoken_languages,
        backdrop_path: image(input.backdrop_path),
        poster_path: image(input.poster_path),
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
    series: Promise<[Series]>
}

type MediaType = 'movie' | 'tv';

// Everything that should persist
let model : Model = {
// TODO fetch data lazily
    movies: getDiscover('movie').then(data => data.data.results.map(contentFromQuery)),
    series: getDiscover('tv').then(data => data.data.results.map(contentFromQuery)),
}

async function getDiscover(media: MediaType) {
    return wrap(`/discover/${media}`, new URLSearchParams());
}

async function getTrending(type : string, timeWindow : string, page : string) {
    //return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams()).then(query => query.data.results);
    return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams({page}));
}


async function getMedia(media: MediaType, id : string) {
    //return wrap(`/movie/${id}`, new URLSearchParams()).then(movie => movieFromQuery(movie));
    return wrap(`/${media}/${id}`, new URLSearchParams());
}

async function getSimilarMedia(media: MediaType, id : string) {
    //return wrap(`/movie/${id}/similar`, new URLSearchParams()).then(query => query.data.results);
    return wrap(`/${media}/${id}/similar`, new URLSearchParams());
}

async function searchMedia(media: MediaType, query : URLSearchParams) {
    //return wrap("/search/movie", query).then(query => query.data);
    return wrap(`/search/${media}`, query);
}

export type {Movie};
export {model, searchMedia, getTrending, getMedia, getSimilarMedia};
