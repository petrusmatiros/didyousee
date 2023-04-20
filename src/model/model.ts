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

async function randomTrivia(category: TriviaCategory): Promise<string> {
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

function poster(size: PosterSize = PosterSize.W500, path: string): string {
  return image(size, path);
}
function backdrop(size: BackdropSize = BackdropSize.W780, path: string): string {
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
    backdrop_path: input.backdrop_path,
    poster_path: input.poster_path,
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
  movies: Content[];
  series: Content[];
  searchString: string;
  page: number;
  observers: ((payload: any) => void)[];

  fetchMovies: () => Promise<void>;
  fetchSeries: () => Promise<void>;
  notifyObservers: (payload: any) => void;
  addObserver: (observer: (obs: any) => void) => void;
  removeObserver: (observer: (obs: any) => void) => void;

  setSearchString: (str: string) => void;
  getSearchString: () => string;
  setPage: (page: number) => void;
  getPage: () => number;
}

// Everything that should persist
let model: Model = {
  movies: [], // Store resolved movies data
  series: [],
  observers: [],
  searchString: "",
  page: 1,
  
  fetchMovies: async function () {

    try {
      const movies: any | undefined = await searchMedia(
        MediaType.MOVIE,
        this.getSearchString(),
      );
      console.log("API fetchMovies", this.getSearchString());
      this.movies = movies.data.results.map(contentFromQuery); // Update movies data

    } catch (error) {
      console.error("Failed to fetch movies:", error);
      throw error;
    }
  },
  // Fetch series data
  fetchSeries: async function () {
    try {
      const series = await searchMedia(
        MediaType.SERIES,
        this.getSearchString()
      );
      console.log("API getSeries", this.getSearchString());
      this.series = series.data.results.map(contentFromQuery); // Update series data
    } catch (error) {
      console.error("Failed to fetch series:", error);
      throw error;
    }
  },

  notifyObservers: function (payload: any) {
    function invokeObserversCB(obs: (payload: any) => void) {
      try {
        console.log("Notify observer");
        obs(payload);
      } catch (err) {
        console.error(err);
      }
    }
    this.observers.forEach(invokeObserversCB);
  },
  addObserver: function (obs: (payload: any) => void) {
    if (!this.observers.includes(obs)) {
      this.observers.push(obs);
    }
  },
  removeObserver: function (obs: (payload: any) => void) {
    this.observers = this.observers.filter((o) => o !== obs);
  },
  setSearchString: function (str: string) {
    this.searchString = str;
    console.log("setSearchString", this.searchString);
    this.notifyObservers({ searchString: str });
  },
  getSearchString: function () {
    return this.searchString;
  },
  setPage: function (page: number) {
    this.page = page;
    this.notifyObservers({ page: page });
  },
  getPage: function () {
    return this.page;
  },
};

// async function setMovi

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

async function searchMedia(media: MediaType, query: string) {
  //return wrap("/search/movie", query).then(query => query.data);
  return wrap(`/search/${media}`, new URLSearchParams(`query=${query}&include_adult=false`));
}

async function discoverMedia(media: MediaType, query: URLSearchParams) {
  return wrap(`/discover/${media}`, query);
}

// TODO:
// async function getSearchMedia() {
//   const params = new URLSearchParams();
//   console.log("GetSearchMedia", searchString.value)
//   params.append('query', searchString.value);
//   params.append('include_adult', 'false');
//   console.log(params.toString())
//   const contentResponse: any | undefined = await searchMedia(
//     MediaType.MOVIE,
//     new URLSearchParams(params)
//   );
//   console.log('API Search', contentResponse);
//   if (contentResponse) {
//     updateData(contentResponse);
//   }
// }
export {
  model,
  randomTrivia,
  searchMedia,
  discoverMedia,
  getTrending,
  getMedia,
  getSimilarMedia,
};
