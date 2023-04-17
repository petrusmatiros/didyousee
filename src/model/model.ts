import { tmdbApi, tmdbImageApi, opentdbApi } from "./apiConfig";
import {
  TriviaCategory,
  PosterSize,
  BackdropSize,
  MediaType,
  Content,
  Movie,
  Series,
} from "../types/types";
import { SortingOrder, random, sort, filter, find } from "../utils/utils";

async function randomTrivia(category: TriviaCategory): Promise<string>{
    try {
        let res = await trivia(category, 15);
        return escapeChars(res);
    } catch (error) {
        console.log(error);   
        return "";
    }
}

function escapeChars(str: string): string {
    return str?.replace(/&quot;/g, '"')?.replace(/&#039;/g, "'");
}

function trivia(category: TriviaCategory, amount: number = 10): any {
  let params = new URLSearchParams({
    amount: amount.toString(),
    category: category,
    type: "boolean",
  });

  return opentdbApi
    .get(`?${params}`)
    .then(function (response) {
      return response.data;
    })
    .then(function (data) {
      const PREFIX = "Did you know";
      let res = data.results.filter((e: any) => e.correct_answer !== "False");
      let parsed = res.map((e: any) => `${PREFIX}: ${e.question}`);
      return parsed[random(0, parsed.length)];
    })
    .catch(function (error) {
      console.log(error);
    });
}

function poster(size: PosterSize = "w500", path: string): string {
  return image(size, path);
}
function backdrop(size: BackdropSize = "w780", path: string): string {
  return image(size, path);
}

function image(size: PosterSize | BackdropSize, path: string): any {
  let params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  });
  tmdbImageApi
    .get(`${size}${path}?${params}`)
    .then(function (response) {
      return response.data;
    })
    .then(function (data) {
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function wrap(query: string, params: URLSearchParams) {
  params.append("api_key", import.meta.env.VITE_TMDB_API_KEY);
  let res = tmdbApi.get(`${query}?${params}`);
  return res;
}

function contentFromQuery(input: Movie | Series): Movie | Series {
  const content = {
    id: input.id,
    overview: input.overview,
    vote_average: input.vote_average,
    vote_count: input.vote_count,
    popularity: input.popularity,
    release_date: input.release_date,
    spoken_languages: input.spoken_languages,
    backdrop_path: backdrop(undefined, input.backdrop_path),
    poster_path: poster(undefined, input.poster_path),
    genres: input.genres,
    budget: input.budget,
    revenue: input.revenue,
    status: input.status,
  };
  if ("title" in input) {
    return {
      ...content,
      title: input.title,
      runtime: input.runtime,
      belongs_to_collection: input.belongs_to_collection,
    };
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
    };
  }
}

interface Model {
  movies: Promise<[Movie]>;
  series: Promise<[Series]>;
  searchQuery: {
    searchString: string;
    page: number;
  };
}

// Everything that should persist
let model: Model = {
  // TODO fetch data lazily
  movies: getDiscover(MediaType.MOVIE).then((data) =>
    data.data.results.map(contentFromQuery)
  ),
  series: getDiscover(MediaType.SERIES).then((data) =>
    data.data.results.map(contentFromQuery)
  ),
  searchQuery: {
    searchString: "",
    page: 1,
  },
};

async function getDiscover(media: MediaType) {
  return wrap(`/discover/${media}`, new URLSearchParams());
}

async function getTrending(type: string, timeWindow: string, page: string) {
  //return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams()).then(query => query.data.results);
  return wrap(
    `/trending/${type}/${timeWindow}`,
    new URLSearchParams({ page, include_adult: "false" })
  );
}

async function getMedia(media: MediaType, id: string) {
  //return wrap(`/movie/${id}`, new URLSearchParams()).then(movie => movieFromQuery(movie));
  return wrap(`/${media}/${id}`, new URLSearchParams());
}

async function getSimilarMedia(media: MediaType, id: string) {
  //return wrap(`/movie/${id}/similar`, new URLSearchParams()).then(query => query.data.results);
  return wrap(`/${media}/${id}/similar`, new URLSearchParams());
}

async function searchMedia(media: MediaType, query: URLSearchParams) {
  //return wrap("/search/movie", query).then(query => query.data);
  return wrap(`/search/${media}`, query);
}
async function discoverMedia(media: MediaType, query: URLSearchParams) {
  return wrap(`/discover/${media}`, query);
}


export {
  model,
  randomTrivia,
  searchMedia,
  discoverMedia,
  getTrending,
  getMedia,
  getSimilarMedia,
};
