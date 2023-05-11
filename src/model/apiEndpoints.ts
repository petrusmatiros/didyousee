import { tmdbApi, opentdbApi } from "./apiConfig";
import { MediaType } from "../types/types";

async function getTrending(type: string, timeWindow: string, page: number) {
  return wrap(
    `/trending/${type}/${timeWindow}`,
    new URLSearchParams({ page: page.toString(), include_adult: "false" })
  );
}

async function getNowPlayingMovies() {
  return wrap(`/movie/now_playing`, new URLSearchParams());
}
async function getAiringTodaySeries() {
  return wrap(`/tv/airing_today`, new URLSearchParams());
}
async function getOnTheAirSeries() {
  return wrap(`/tv/on_the_air`, new URLSearchParams());
}

async function getPopular(media: MediaType) {
  return wrap(`/${media}/popular`, new URLSearchParams());
}
async function getTopRated(media: MediaType) {
  return wrap(`/${media}/top_rated`, new URLSearchParams());
}
async function getUpcomingMovies() {
  return wrap(`/movie/upcoming`, new URLSearchParams());
}

async function getMovieVideos(movie_id: string) {
  return wrap(`/movie/${movie_id}/videos`, new URLSearchParams());
}

async function getSeriesVideos(tv_id: string) {
  return wrap(`/tv/${tv_id}/videos`, new URLSearchParams());
}

async function getSeriesReviews(tv_id: string) {
  return wrap(`/tv/${tv_id}/reviews`, new URLSearchParams());
}
async function getMovieReviews(movie_id: string) {
  return wrap(`/movie/${movie_id}/reviews`, new URLSearchParams());
}

async function getSeriesCredits(tv_id: string) {
  return wrap(`/tv/${tv_id}/credits`, new URLSearchParams());
}
async function getMovieCredits(movie_id: string) {
  return wrap(`/movie/${movie_id}/credits`, new URLSearchParams());
}

async function getMedia(media: MediaType, id: string) {
  return wrap(`/${media}/${id}`, new URLSearchParams());
}

async function getRecommendedMedia(media: MediaType, id: string) {
  return wrap(`/${media}/${id}/recommendations`, new URLSearchParams());
}
async function getSimilarMedia(media: MediaType, id: string) {
  return wrap(`/${media}/${id}/similar`, new URLSearchParams());
}

async function getWatchProviders(media: MediaType, id: string) {
  return wrap(`/${media}/${id}/watch/providers`, new URLSearchParams());
}

async function searchMedia(media: MediaType, query: string, page: number = 1) {
  return wrap(
    `/search/${media}`,
    new URLSearchParams(
      `query=${query}&page=${page.toString()}&include_adult=false`
    )
  );
}
async function searchMultiMedia(query: string, page: number = 1) {
  return wrap(
    `/search/multi`,
    new URLSearchParams(
      `query=${query}&page=${page.toString()}&include_adult=false`
    )
  );
}

async function getDiscover(media: MediaType, params: URLSearchParams) {
  return wrap(`/discover/${media}`, new URLSearchParams(params));
}

async function getGenreList(media: MediaType) {
  return wrap(`/genre/${media}/list`, new URLSearchParams());
}

async function wrap(query: string, params: URLSearchParams) {
  params.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  try {
    // let res = await 
    let res = await tmdbApi.get(`${query}?${params}`).catch((err) => {
      
    });
    return res;
  } catch (error:any) {
    console.clear();
  }
}

export {
    getTrending,
    getNowPlayingMovies,
    getAiringTodaySeries,
    getOnTheAirSeries,
    getPopular,
    getTopRated,
    getUpcomingMovies,
    getMovieVideos,
    getSeriesVideos,
    getSeriesReviews,
    getMovieReviews,
    getSeriesCredits,
    getMovieCredits,
    getMedia,
    getRecommendedMedia,
    getSimilarMedia,
    searchMedia,
    searchMultiMedia,
    getDiscover,
    getGenreList,
    getWatchProviders,
}