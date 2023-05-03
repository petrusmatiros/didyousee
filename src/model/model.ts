import { tmdbApi, tmdbImageApi, opentdbApi } from "./apiConfig";
import {
  FetchType,
  TriviaCategory,
  SearchCategory,
  PosterSize,
  BackdropSize,
  MediaType,
  Content,
  Movie,
  Series,
} from "../types/types";
import {
  SortingOrder,
  random,
  sort,
  filter,
  find,
  escapeChars,
  average,
  formatMoney,
  formatVoteCount,
} from "../utils/utils";

import {
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
} from "./apiEndpoints";

import promiseHandler from "./promiseHandler";

import Fuse from "fuse.js";

async function randomTrivia(category: TriviaCategory): Promise<string> {
  try {
    let res = await trivia(category, 15);
    return escapeChars(res);
  } catch (error) {
    console.log(error);
    return "";
  }
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

function poster(path: string, size: PosterSize = PosterSize.W500): string {
  return image(path, size);
}
function backdrop(
  path: string,
  size: BackdropSize = BackdropSize.W780
): string {
  return image(path, size);
}

function image(path: string, size: PosterSize | BackdropSize): any {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}

function setCreator(input: any, mediaType: MediaType): any {
  if (!input) return [];
  if (input.length === 0) return [];
  if (mediaType === MediaType.MOVIE) {
    return input.filter((e: any) => e.job === "Director");
  } else if (mediaType === MediaType.SERIES) {
    return input;
  }
}

function generateDummyContent(amount: number): any[] {
  amount = Math.round(Math.abs(amount));
  let array = [];
  for (let i = 0; i < amount; i++) {
    array.push({
      id: i,
      title: "",
      name: "",
      overview: "",
      created_by: [],
      vote_average: 0,
      vote_count: 0,
      popularity: 0,
      original_language: "",
      spoken_languages: [],
      backdrop_path: "",
      poster_path: "",
      genres: [],
      status: "",
      video: "",
      reviews: {
        id: 0,
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
      credits: {
        cast: [],
        crew: [],
      },
    });
  }
  return array;
}

async function fetchHandler(
  axiosPromise: any,
  fetchType: FetchType
): Promise<any> {
  if (fetchType === FetchType.SINGLE) {
    try {
      const fetchedData: any | undefined = await axiosPromise;
      return contentFromQuery(fetchedData.data);
    } catch (error) {
      console.error(`Failed to fetch ${fetchType}: ${error}`);
      throw error;
    }
  } else if (fetchType === FetchType.QUERY) {
    try {
      const fetchedData: any | undefined = await axiosPromise;
      return fetchedData.data.results.map(contentFromQuery);
    } catch (error) {
      console.error(`Failed to fetch ${fetchType}: ${error}`);
      throw error;
    }
  } else if (fetchType === FetchType.VIDEO) {
    try {
      const fetchedData: any | undefined = await axiosPromise;
      const filteredVideos = fetchedData.data.results.filter(
        (video: any) => {
          return (
            video.site === "YouTube" &&
            video.official === true &&
            (video.type === "Trailer" || video.type === "Teaser")
          );
        }
      );
      return filteredVideos && filteredVideos.length > 0
      ? `https://www.youtube-nocookie.com/embed/${filteredVideos[0].key}`
      : "";
    } catch (error) {
      console.error(`Failed to fetch ${fetchType}: ${error}`);
      throw error;
    }
  } else if (fetchType === FetchType.CREDITS) {
    try {
      const fetchedData: any | undefined = await axiosPromise;
      return fetchedData.data;
    } catch (error) {
      console.error(`Failed to fetch ${fetchType}: ${error}`);
      throw error;
    }
  } else if (fetchType === FetchType.REVIEWS) {
    try {
      const fetchedData: any | undefined = await axiosPromise;
      return fetchedData.data.results;
    } catch (error) {
      console.error(`Failed to fetch ${fetchType}: ${error}`);
      throw error;
    }
  }
}

function contentFromQuery(input: Movie | Series): Movie | Series {
  const content = {
    id: input.id,
    overview: input.overview,
    created_by: input.created_by,
    vote_average: input.vote_average,
    vote_count: input.vote_count,
    formatted_vote_count: formatVoteCount(input.vote_count),
    popularity: input.popularity,
    original_language: input.original_language,
    spoken_languages: input.spoken_languages,
    backdrop_path: backdrop(input.backdrop_path),
    poster_path: poster(input.poster_path),
    genres: input.genres,
    genre_ids: input.genre_ids,
    status: input.status,
    video: "",
    reviews: {
      id: 0,
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    credits: {
      cast: [],
      crew: [],
    },
  };
  if ("title" in input) {
    return {
      ...content,
      title: input.title,
      release_date: input.release_date,
      mediaType: MediaType.MOVIE,
      budget: input.budget,
      formatted_budget: formatMoney(input.budget),
      revenue: input.revenue,
      formatted_revenue: formatMoney(input.revenue),
      runtime: input.runtime,
      belongs_to_collection: input.belongs_to_collection,
    };
  } else {
    return {
      ...content,
      name: input.name,
      first_air_date: input.first_air_date,
      mediaType: MediaType.SERIES,
      episode_run_time: average(input.episode_run_time),
      last_episode_to_air: input.last_episode_to_air,
      next_episode_to_air: input.next_episode_to_air,
      number_of_episodes: input.number_of_episodes,
      number_of_seasons: input.number_of_seasons,
      seasons: input.seasons,
    };
  }
}

interface Model {
  // Only for Home
  movies: Movie[];
  series: Series[];
  trivia: string;

  homeContent: {
    trendingMovies: [];
    nowPlayingMovies: [];
    topRatedMovies: [];
    popularMovies: [];
    upcomingMovies: [];
    trendingSeries: [];
    onTheAirSeries: [];
    popularSeries: [];
    topRatedSeries: [];
    airingTodaySeries: [];
  };
  // Search
  searchContent: (Movie | Series)[];
  dummyContent: (Movie | Series)[];
  currentMovie: Movie;
  currentSeries: Series;
  searchCategory: SearchCategory;
  searchString: string;
  result_status: Object;
  searchID: string;
  page: number;
  total_pages: number;
  observers: ((payload: any) => void)[];
  isPageLoading: boolean;

  // Fetching methods for single content
  fetchSingleMovie: () => Promise<void>;
  fetchSingleSeries: () => Promise<void>;
  // Fetching methods for search
  fetchMovies: () => Promise<void>;
  fetchMoviesTest: () => Promise<void>;
  // New methods for search
  fetchSeries: () => Promise<void>;
  fetchSeriesTest: () => Promise<void>;
  // Main fetching methods
  fetchContent: () => Promise<void>;
  fetchGenreContent: () => Promise<void>;

  fetchHomeTrendingMovies: () => Promise<void>;
  fetchHomeTrendingSeries: () => Promise<void>;
  fetchHomePopularMovies: () => Promise<void>;
  fetchHomePopularSeries: () => Promise<void>;
  fetchHomeTopRatedMovies: () => Promise<void>;
  fetchHomeTopRatedSeries: () => Promise<void>;
  fetchHomeNowPlayingMovies: () => Promise<void>;
  fetchHomeUpcomingMovies: () => Promise<void>;
  fetchHomeOnTheAirSeries: () => Promise<void>;
  fetchHomeAiringTodaySeries: () => Promise<void>;

  // Fetching methods for extra information
  fetchTrivia: () => Promise<void>;
  fetchContentVideosMovie: () => Promise<void>;
  fetchContentVideosSeries: () => Promise<void>;
  fetchContentReviewsSeries: () => Promise<void>;
  fetchContentReviewsMovie: () => Promise<void>;
  fetchContentCreditsSeries: () => Promise<void>;
  fetchContentCreditsMovie: () => Promise<void>;

  notifyObservers: (payload: any) => void;
  addObserver: (observer: (obs: any) => void) => void;
  removeObserver: (observer: (obs: any) => void) => void;

  setSearchString: (str: string) => void;
  getSearchString: () => string;
  setSearchID: (str: string) => void;
  getSearchID: () => string;
  incrementPage: () => void;
  setPage: (page: number) => void;
  getPage: () => number;
  setTotalPages: (page: number) => void;
  getTotalPages: () => number;
  setSearchCategory: (category: SearchCategory) => void;
  getSearchCategory: () => SearchCategory;

  resetCurrentContent: () => void;
  resetSearchContent: () => void;
  getIsPageLoading: () => boolean;
  setIsPageLoading: (isLoading: boolean) => void;
}

// Everything that should persist
let model: Model = {
  // Home
  movies: [],
  series: [],
  trivia: "",

  homeContent: {
    trendingMovies: [],
    nowPlayingMovies: [],
    topRatedMovies: [],
    popularMovies: [],
    upcomingMovies: [],
    trendingSeries: [],
    onTheAirSeries: [],
    popularSeries: [],
    topRatedSeries: [],
    airingTodaySeries: [],
  },

  // Search
  searchContent: [],
  dummyContent: generateDummyContent(20),
  searchCategory: SearchCategory.TITLE,
  currentMovie: {
    id: 0,
    title: "",
    release_date: "",
    mediaType: MediaType.MOVIE,
    overview: "",
    created_by: [],
    vote_average: 0,
    vote_count: 0,
    formatted_vote_count: "",
    popularity: 0,
    original_language: "",
    spoken_languages: [],
    backdrop_path: "",
    poster_path: "",
    genres: [],
    genre_ids: [],
    budget: 0,
    formatted_budget: "",
    revenue: 0,
    formatted_revenue: "",
    status: "",
    runtime: 0,
    belongs_to_collection: {},
    video: "",
    reviews: {
      id: 0,
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    credits: {
      cast: [],
      crew: [],
    },
  },
  currentSeries: {
    id: 0,
    name: "",
    first_air_date: "",
    mediaType: MediaType.SERIES,
    overview: "",
    created_by: [],
    last_episode_to_air: {},
    next_episode_to_air: {},
    number_of_episodes: 0,
    number_of_seasons: 0,
    seasons: [],
    vote_average: 0,
    vote_count: 0,
    formatted_vote_count: "",
    popularity: 0,
    original_language: "",
    spoken_languages: [],
    backdrop_path: "",
    poster_path: "",
    genres: [],
    genre_ids: [],
    status: "",
    episode_run_time: [],
    video: "",
    reviews: {
      id: 0,
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    credits: {
      cast: [],
      crew: [],
    },
  },
  observers: [],
  searchString: "",
  result_status: { current: "" },
  searchID: "",
  page: 1,
  total_pages: 1000,
  isPageLoading: false,

  getIsPageLoading() {
    return this.isPageLoading;
  },
  setIsPageLoading(isLoading: boolean) {
    this.isPageLoading = isLoading;
  },

  fetchSingleMovie: async function () {
    try {
      this.currentMovie = await fetchHandler(
        getMedia(MediaType.MOVIE, this.getSearchID()),
        FetchType.SINGLE
      ) as Movie
    } catch (error) {
      console.log(error);
    }
  },
  fetchSingleSeries: async function () {
    try {
      this.currentSeries = await fetchHandler(
        getMedia(MediaType.SERIES, this.getSearchID()),
        FetchType.SINGLE
      ) as Series;
    } catch (error) {
      console.log(error);
    }
  },
  fetchMovies: async function () {
    try {
      this.movies = await fetchHandler(
        searchMedia(MediaType.MOVIE, this.getSearchString(), this.getPage()),
        FetchType.QUERY
      );
    } catch (error) {
      console.log(error);
    }
  },
  fetchMoviesTest: async function () {
    const promise = searchMedia(
      MediaType.MOVIE,
      this.getSearchString(),
      this.getPage()
    );
    try {
      const returnedPromise = await promiseHandler(promise, this.result_status);
      this.movies = await fetchHandler(returnedPromise, FetchType.QUERY);
    } catch (error) {
      console.log(error);
    }

    // this.movies = await returnedPromise.data.results.map(contentFromQuery);
  },
  fetchSeries: async function () {
    try {
      const series = await searchMedia(
        MediaType.SERIES,
        this.getSearchString(),
        this.getPage()
      );
      console.log("API fetchSeries", this.getSearchString());
      this.series = series.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch series:", error);
      throw error;
    }
  },
  fetchSeriesTest: async function () {
    const promise = searchMedia(
      MediaType.SERIES,
      this.getSearchString(),
      this.getPage()
    );
    try {
      const returnedPromise = await promiseHandler(promise, this.result_status);
      this.series = await fetchHandler(returnedPromise, FetchType.QUERY);
    } catch (error) {
      console.log(error);
    }

    // this.series = await returnedPromise.data.results.map(contentFromQuery);
  },
  fetchGenreContent: async function () {
    try {
      const promiseMovie = discoverMedia(MediaType.MOVIE, this.getSearchString(), this.getPage());
      const promiseSeries = discoverMedia(MediaType.SERIES, this.getSearchString(), this.getPage());
      const returnedPromiseMovies = await promiseHandler(promiseMovie, this.result_status);
      const returnedPromiseSeries = await promiseHandler(promiseSeries, this.result_status);
      const movies = await fetchHandler(
        returnedPromiseMovies,
        FetchType.QUERY
      );

      const series = await fetchHandler(
        returnedPromiseSeries,
        FetchType.QUERY
      );


      console.log("API fetchGenreContent", this.getSearchString());
      const genreContent = [...movies, ...series];
      console.log("API fetchGenreContent", genreContent);
      this.searchContent = [...this.searchContent, ...genreContent];
    } catch (error) {
      console.error("Failed to fetch content with genre:", error);
      this.searchContent = [];
      throw error;
    }
  },
  fetchContent: async function () {
    try {
      await this.fetchMoviesTest();
      await this.fetchSeriesTest();
      const data = [...this.movies, ...this.series];
      this.searchContent = [...this.searchContent, ...data];
    } catch (error) {
      console.error("Failed to fetch content:", error);
      this.searchContent = [];
      throw error;
    }
  },
  fetchHomeTrendingMovies: async function () {
    try {
      this.homeContent.trendingMovies = await fetchHandler(
        getTrending(MediaType.MOVIE, "day", this.getPage()),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
      throw error;
    }
  },
  fetchHomeTrendingSeries: async function () {
    try {
      this.homeContent.trendingSeries = await fetchHandler(
        getTrending(MediaType.SERIES, "day", this.getPage()),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
      throw error;
    }
  },
  fetchHomePopularMovies: async function () {
    try {
      this.homeContent.popularMovies = await fetchHandler(
        getPopular(MediaType.MOVIE),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      throw error;
    }
  },
  fetchHomePopularSeries: async function () {
    try {
      this.homeContent.popularSeries = await fetchHandler(
        getPopular(MediaType.SERIES),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch popular series:", error);
      throw error;
    }
  },
  fetchHomeTopRatedMovies: async function () {
    try {
      this.homeContent.topRatedMovies = await fetchHandler(
        getTopRated(MediaType.MOVIE),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
      throw error;
    }
  },
  fetchHomeTopRatedSeries: async function () {
    try {
      this.homeContent.topRatedSeries = await fetchHandler(
        getTopRated(MediaType.SERIES),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch top rated series:", error);
      throw error;
    }
  },
  fetchHomeUpcomingMovies: async function () {
    try {
      this.homeContent.upcomingMovies = await fetchHandler(
        getUpcomingMovies(),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
      throw error;
    }
  },
  fetchHomeNowPlayingMovies: async function () {
    try {
      this.homeContent.nowPlayingMovies = await fetchHandler(
        getNowPlayingMovies(),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      throw error;
    }
  },
  fetchHomeOnTheAirSeries: async function () {
    try {
      this.homeContent.onTheAirSeries = await fetchHandler(
        getOnTheAirSeries(),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to on the air series series:", error);
      throw error;
    }
  },
  fetchHomeAiringTodaySeries: async function () {
    try {
      this.homeContent.airingTodaySeries = await fetchHandler(
        getAiringTodaySeries(),
        FetchType.QUERY
      );
    } catch (error) {
      console.error("Failed to fetch airing today series:", error);
      throw error;
    }
  },
  fetchTrivia: async function () {
    try {
      let r = random(0, 1);
      let category: TriviaCategory =
        r === 0 ? TriviaCategory.MOVIE : TriviaCategory.SERIES;
      randomTrivia(category)
        .then((data: any) => {
          this.trivia = data;
          console.log("API getTrivia");
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Failed to fetch trivia:", error);
      throw error;
    }
  },
  fetchContentVideosMovie: async function () {
    try {
      this.currentSeries.video = await fetchHandler(
        getMovieVideos(this.getSearchID()),
        FetchType.VIDEO
      );
    } catch (error) {
      console.error("Failed to fetch getContentVideosMovie:", error);
      throw error;
    }
  },
  fetchContentVideosSeries: async function () {
    try {
      this.currentSeries.video = await fetchHandler(
        getSeriesVideos(this.getSearchID()),
        FetchType.VIDEO
      );
    } catch (error) {
      console.error("Failed to fetch getContentVideosSeries:", error);
      throw error;
    }
  },
  fetchContentReviewsSeries: async function () {
    try {
      this.currentSeries.reviews = await fetchHandler(
        getSeriesReviews(this.getSearchID()),
        FetchType.REVIEWS
      );
    } catch (error) {
      console.error("Failed to fetch getSeriesReview:", error);
      throw error;
    }
  },
  fetchContentReviewsMovie: async function () {
    try {
      this.currentMovie.reviews = await fetchHandler(
        getMovieReviews(this.getSearchID()),
        FetchType.REVIEWS
      );
    } catch (error) {
      console.error("Failed to fetch getMovieReview:", error);
      throw error;
    }
  },
  fetchContentCreditsSeries: async function () {
    try {
      const seriesCredits = await fetchHandler(getSeriesCredits(this.getSearchID()), FetchType.CREDITS);
      this.currentSeries.credits.cast = seriesCredits.cast;
    } catch (error) {
      console.error("Failed to fetch getSeriesCredits:", error);
      throw error;
    }
  },
  fetchContentCreditsMovie: async function () {
    try {
      const movieCredits = await fetchHandler(
        getMovieCredits(this.getSearchID()),
        FetchType.CREDITS
      );
      this.currentMovie.credits.cast = movieCredits.cast;
      this.currentMovie.created_by = setCreator(
        movieCredits.crew,
        MediaType.MOVIE
      );
    } catch (error) {
      console.error("Failed to fetch getMovieCredits:", error);
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
  setSearchID: function (str: string) {
    this.searchID = str;
    console.log("setSearchID", this.searchID);
  },
  getSearchID: function () {
    return this.searchID;
  },
  incrementPage: function () {
    const totalPages = this.getTotalPages;
    const currentPage = this.getPage;
    if (totalPages > currentPage) {
      this.setPage(this.getPage() + 1);
    }
    this.isPageLoading = true;
  },
  setPage: function (page: number) {
    if (page <= this.total_pages && page > 0) {
      this.page = page;
      // this.notifyObservers({ page: page });
    }
  },
  getPage: function () {
    return this.page;
  },
  setTotalPages: function (totalPages: number) {
    this.total_pages = totalPages;
    // this.notifyObservers({ totalPages: totalPages });
  },
  getTotalPages: function () {
    return this.total_pages;
  },
  setSearchCategory: function (searchCategory: SearchCategory) {
    this.searchCategory = searchCategory;
  },
  getSearchCategory: function () {
    return this.searchCategory;
  },
  resetCurrentContent: function () {
    this.currentMovie = {
      id: 0,
      title: "",
      release_date: "",
      mediaType: MediaType.MOVIE,
      overview: "",
      created_by: [],
      vote_average: 0,
      vote_count: 0,
      formatted_vote_count: "",
      popularity: 0,
      original_language: "",
      spoken_languages: [],
      backdrop_path: "",
      poster_path: "",
      genres: [],
      genre_ids: [],
      budget: 0,
      formatted_budget: "",
      revenue: 0,
      formatted_revenue: "",
      status: "",
      runtime: 0,
      belongs_to_collection: {},
      video: "",
      reviews: {
        id: 0,
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
      credits: {
        cast: [],
        crew: [],
      },
    };
    this.currentSeries = {
      id: 0,
      name: "",
      first_air_date: "",
      mediaType: MediaType.SERIES,
      overview: "",
      created_by: [],
      last_episode_to_air: {},
      next_episode_to_air: {},
      number_of_episodes: 0,
      number_of_seasons: 0,
      seasons: [],
      vote_average: 0,
      vote_count: 0,
      formatted_vote_count: "",
      popularity: 0,
      original_language: "",
      spoken_languages: [],
      backdrop_path: "",
      poster_path: "",
      genres: [],
      genre_ids: [],
      status: "",
      episode_run_time: [],
      video: "",
      reviews: {
        id: 0,
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
      credits: {
        cast: [],
        crew: [],
      },
    };
  },
  resetSearchContent: function () {
    this.setPage(1);
    this.movies = [];
    this.series = [];
    this.searchContent = generateDummyContent(0);
  },
};

async function discoverMedia(
  media: MediaType,
  query: string,
  page: number = 1
) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("include_adult", "false");

  if (query) {
    query = query.toLowerCase();
    query = query.trim();
    const genreIDs = [];
    const genres = query.split(/[ ,]+/);
    console.log("genres", genres)
    console.log("genres.length", genres.length)
    for (const genre of genres) {
      console.log("genre", genre)
      try {
        const genreID = await genreIDfromName(media, genre);
        console.log("genreID", genreID)
        if (genreID) {
          console.log("push")
          genreIDs.push(genreID);
        } else {
          console.log("with keyword")
          params.append("with_keywords", genre);
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (genreIDs.length > 0) {
      console.log("with_genres")
      params.append("with_genres", genreIDs.join(","));
    }
  }
  console.log("params", params.get("with_genres"))

  console.log(await getDiscover(media, params))

  return getDiscover(media, params);
}

async function genreIDfromName(media: MediaType, name: string) {
  try {
    let genresResponse = await getGenreList(media);
    console.log("genresResponse", genresResponse)
    const genres = genresResponse.data.genres;
    const options = {
      keys: ["name"],
      includeScore: true,
      threshold: 0.2, // adjust threshold as needed
    };
    const fuse = new Fuse(genres, options);
    const results = fuse.search(name);
    if (results.length > 0) {
      console.log("results", results)
      const genre: any = results[0].item;
      console.log("found genre", genre)
      return genre.id;
    }
  } catch (e) {
    console.error(e);
  }
}

export {
  model,
  randomTrivia,
  searchMedia,
  discoverMedia,
  getTrending,
  getMedia,
  getSimilarMedia,
  getRecommendedMedia,
};
