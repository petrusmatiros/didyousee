import { tmdbApi, opentdbApi, imageFetch } from "./apiConfig";
import {
  FetchType,
  TriviaCategory,
  SearchCategory,
  SortBy,
  PosterSize,
  BackdropSize,
  MediaType,
  Content,
  Movie,
  Series,
  WatchProvider,
  Reviewer,
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
import noPoster from "../assets/no-poster.svg";
import noBackdrop from "../assets/no-backdrop.svg";
import noContent from "../assets/no-content.svg";
import { db } from "../firebaseConfig";
import { ref, set, get, onValue } from "firebase/database";

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
  getWatchProviders,
} from "./apiEndpoints";

import promiseHandler from "./promiseHandler";

import Fuse from "fuse.js";

async function randomTrivia(category: TriviaCategory): Promise<string> {
  try {
    let res = await trivia(category, 15);
    return escapeChars(res);
  } catch (error) {
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
      throw error;
    });
}

function poster(path: string, size: PosterSize = PosterSize.W500): string {
  return imagePoster(path, size);
}
function backdrop(
  path: string,
  size: BackdropSize = BackdropSize.W1280
): string {
  return imageBackdrop(path, size);
}

function imagePoster(path: string, size: PosterSize | BackdropSize): any {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : noPoster;
}
function imageBackdrop(path: string, size: PosterSize | BackdropSize): any {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : noBackdrop;
}

function imageGravatar(path: string, size: PosterSize): any {
  return path ? `${path}` : noContent;
}

function imageGeneric(path: string, size: PosterSize): any {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : noContent;
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

function sortContent(
  content: any[],
  sortBy: SortBy,
): any[] {
  if (sortBy === SortBy.POPULARITY_DSC) {
    function sortCB(a: any, b: any) {
      if (a.popularity > b.popularity) {
        return 1;
      } else if (a.popularity < b.popularity) {
        return -1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.DSC);
  }
  else if (sortBy === SortBy.POPULARITY_ASC) {
    function sortCB(a: any, b: any) {
      if (a.popularity < b.popularity) {
        return -1;
      } else if (a.popularity > b.popularity) {
        return 1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.ASC);
  }
  else if (sortBy === SortBy.RATING_DSC) {
    function sortCB(a: any, b: any) {
      if (a.vote_average > b.vote_average) {
        return 1;
      } else if (a.vote_average < b.vote_average) {
        return -1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.DSC);
  }
  else if (sortBy === SortBy.RATING_ASC) {
    function sortCB(a: any, b: any) {
      if (a.vote_average < b.vote_average) {
        return -1;
      } else if (a.vote_average > b.vote_average) {
        return 1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.ASC);
  }
  else if (sortBy === SortBy.TITLE_DSC) {
    function sortCB(a: any, b: any) {
      const aName = a.name ? a.name : a.title;
      const bName = b.name ? b.name : b.title;
      if (aName > bName) {
        return 1;
      } else if (aName < bName) {
        return -1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.DSC);
  }
  else if (sortBy === SortBy.TITLE_ASC) {
    function sortCB(a: any, b: any) {
      const aName = a.name ? a.name : a.title;
      const bName = b.name ? b.name : b.title;
      if (aName < bName) {
        return -1;
      } else if (aName > bName) {
        return 1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.ASC);
  }
  else if (sortBy === SortBy.LATEST) {
    function sortCB(a: any, b: any) {
      const aYear = a.first_air_date ? a.first_air_date : a.release_date;
      const bYear = b.first_air_date ? b.first_air_date : b.release_date;
      if (aYear > bYear) {
        return 1;
      } else if (aYear < bYear) {
        return -1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.DSC);
  }
  else if (sortBy === SortBy.OLDEST) {
    function sortCB(a: any, b: any) {
      const aYear = a.first_air_date ? a.first_air_date : a.release_date;
      const bYear = b.first_air_date ? b.first_air_date : b.release_date;
      if (aYear < bYear) {
        return -1;
      } else if (aYear > bYear) {
        return 1;
      }
      return 0;
    }
    return sort(content, sortCB, SortingOrder.ASC);
  } else {
    return [];
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
      if (fetchedData) {
        return contentFromQuery(fetchedData.data);
      }
    } catch (error) {}
  } else if (fetchType === FetchType.QUERY) {
    try {
      const fetchedData: any | undefined = await axiosPromise;
      if (fetchedData) {
        return fetchedData.data.results.map(contentFromQuery);
      }
    } catch (error) {}
  } else if (fetchType === FetchType.VIDEO) {
    try {
      const fetchedData: any | undefined = await axiosPromise;
      const filteredVideos = fetchedData.data.results.filter((video: any) => {
        return (
          video.site === "YouTube" &&
          video.official === true &&
          (video.type === "Trailer" || video.type === "Teaser")
        );
      });
      return filteredVideos && filteredVideos.length > 0
        ? `https://www.youtube-nocookie.com/embed/${filteredVideos[0].key}`
        : "";
    } catch (error) {}
  } else if (fetchType === FetchType.CREDITS) {
    try {
      function setLogoPath(path: string) {
        return imageGeneric(path, PosterSize.W92);
      }
      const fetchedData: any | undefined = await axiosPromise;
      if (fetchedData) {
        fetchedData.data.cast.forEach((cast: any) => {
          cast.profile_path = setLogoPath(cast.profile_path);
        });
        return fetchedData.data;
      }
    } catch (error) {}
  } else if (fetchType === FetchType.REVIEWS) {
    try {
      function setLogoPath(path: string) {
        if (path.indexOf("gravatar.com") === -1) {
          return imageGeneric(path, PosterSize.W92);
        } else {
          path = path.substring(1);
          return imageGravatar(path, PosterSize.W92);
        }
      }
      const fetchedData: any | undefined = await axiosPromise;
      if (fetchedData) {
        fetchedData.data.results.forEach((review: any) => {
          review.author_details.avatar_path = setLogoPath(
            review.author_details.avatar_path
          );
        });
      }
      return fetchedData.data;
    } catch (error) {}
  } else if (fetchType === FetchType.WATCH_PROVIDERS) {
    function setLogoPath(path: string) {
      return imageGeneric(path, PosterSize.W92);
    }
    const fetchedData: any | undefined = await axiosPromise;
    const providers = ["US"];

    if (fetchedData) {
      for (let i = 0; i < providers.length; i++) {
        if (Object.hasOwn(fetchedData.data.results, providers[i])) {
          if (Object.hasOwn(fetchedData.data.results[providers[i]], "buy")) {
            fetchedData.data.results[providers[i]].buy =
              fetchedData.data.results[providers[i]].buy.forEach(
                (provider: any) => {
                  provider.logo_path = setLogoPath(provider.logo_path);
                }
              );
          }
          if (Object.hasOwn(fetchedData.data.results[providers[i]], "rent")) {
            fetchedData.data.results[providers[i]].rent =
              fetchedData.data.results[providers[i]].rent.forEach(
                (provider: any) => {
                  provider.logo_path = setLogoPath(provider.logo_path);
                }
              );
          }
          if (
            Object.hasOwn(fetchedData.data.results[providers[i]], "flatrate")
          ) {
            fetchedData.data.results[providers[i]].flatrate =
              fetchedData.data.results[providers[i]].flatrate.forEach(
                (provider: any) => {
                  provider.logo_path = setLogoPath(provider.logo_path);
                }
              );
          }
        }
      }
    }
    return fetchedData.data.results?.US;
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
    watch_providers: {
      link: "",
      rent: [],
      buy: [],
      flatrate: [],
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

interface UserData {
  uid: string;
  movieLists: Record<string, { mediaID: string; mediaType: string }[]>;
}

interface Model {
  state: any;
  currentState: any;
  currentList: (Movie | Series)[];
  // Only for Home
  movies: Movie[];
  series: Series[];
  trivia: string;
  // Only for single content
  recommendedMovies: Movie[];
  recommendedSeries: Series[];
  similarMovies: Movie[];
  similarSeries: Series[];

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
  sortBy: SortBy;
  searchString: string;
  result_status: { current: string };
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
  // New methods for search
  fetchSeries: () => Promise<void>;
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
  fetchContentRecommendedMovie: () => Promise<void>;
  fetchContentRecommendedSeries: () => Promise<void>;
  fetchContentSimilarMovie: () => Promise<void>;
  fetchContentSimilarSeries: () => Promise<void>;
  fetchContentWatchProviders: (mediaType: MediaType) => Promise<void>;

  fetchCurrentList: (list: []) => Promise<void>;
  fetchPersistance: (userID: string) => Promise<void>;

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
  setSearchCategory: (category: SearchCategory) => void;
  getSearchCategory: () => SearchCategory;

  resetCurrentContent: () => void;
  resetSearchContent: () => void;
  getIsPageLoading: () => boolean;
  setIsPageLoading: (isLoading: boolean) => void;
}

// Everything that should persist
let model: Model = {
  state: {},
  currentState: {},
  currentList: generateDummyContent(10),
  // Home
  movies: [],
  series: [],
  trivia: "",

  recommendedMovies: [],
  recommendedSeries: [],
  similarMovies: [],
  similarSeries: [],

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
  sortBy: SortBy.POPULARITY_DSC,
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
    watch_providers: {
      link: "",
      rent: [],
      buy: [],
      flatrate: [],
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
    watch_providers: {
      link: "",
      rent: [],
      buy: [],
      flatrate: [],
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
      this.currentMovie = (await fetchHandler(
        getMedia(MediaType.MOVIE, this.getSearchID()),
        FetchType.SINGLE
      )) as Movie;
    } catch (error) {
      throw error;
    }
  },
  fetchSingleSeries: async function () {
    try {
      this.currentSeries = (await fetchHandler(
        getMedia(MediaType.SERIES, this.getSearchID()),
        FetchType.SINGLE
      )) as Series;
    } catch (error) {
      throw error;
    }
  },
  fetchMovies: async function () {
    try {
      this.movies = await fetchHandler(
        searchMedia(MediaType.MOVIE, this.getSearchString(), this.getPage()),
        FetchType.QUERY
      );
    } catch (error) {
      throw error;
    }
  },
  fetchSeries: async function () {
    try {
      this.series = await fetchHandler(
        searchMedia(MediaType.SERIES, this.getSearchString(), this.getPage()),
        FetchType.QUERY
      );
    } catch (error) {
      throw error;
    }
  },
  fetchGenreContent: async function () {
    try {
      const promiseMovie = discoverMedia(
        MediaType.MOVIE,
        this.getSearchString(),
        this.getPage()
      );
      const promiseSeries = discoverMedia(
        MediaType.SERIES,
        this.getSearchString(),
        this.getPage()
      );
      let resultStatusMovie = { current: "" };
      let resultStatusSeries = { current: "" };
      this.result_status.current = "pending";
      const returnedPromiseMovies = await promiseHandler(
        promiseMovie,
        resultStatusMovie
      );
      const returnedPromiseSeries = await promiseHandler(
        promiseSeries,
        resultStatusSeries
      );

      if (
        resultStatusMovie.current === "fulfilled" ||
        resultStatusSeries.current === "fulfilled"
      ) {
        this.result_status.current = "fulfilled";
        this.movies = await fetchHandler(
          returnedPromiseMovies,
          FetchType.QUERY
        );

        this.series = await fetchHandler(
          returnedPromiseSeries,
          FetchType.QUERY
        );

        const moviePages = returnedPromiseMovies.data.total_pages;
        const seriesPages = returnedPromiseSeries.data.total_pages;

        if (moviePages >= seriesPages) {
          this.total_pages = moviePages;
        } else {
          this.total_pages = seriesPages;
        }

        if (!this.movies) {
          this.movies = [];
        }
        if (!this.series) {
          this.series = [];
        }
        const genreContent = [...this.movies, ...this.series];
        const completedData = [...this.searchContent, ...genreContent];
        const sortedData = sortContent(completedData, this.sortBy);
        this.searchContent = sortedData;
      } else if (
        resultStatusMovie.current === "rejected" ||
        resultStatusSeries.current === "rejected"
      ) {
        this.result_status.current = "rejected";
        this.searchContent = [];
      }
    } catch (error) {
      this.searchContent = [];
      throw error;
    }
  },
  fetchContent: async function () {
    try {
      const promiseMovie = searchMedia(
        MediaType.MOVIE,
        this.getSearchString(),
        this.getPage()
      );
      const promiseSeries = searchMedia(
        MediaType.SERIES,
        this.getSearchString(),
        this.getPage()
      );
      let resultStatusMovie = { current: "" };
      let resultStatusSeries = { current: "" };
      this.result_status.current = "pending";
      const returnedPromiseMovies = await promiseHandler(
        promiseMovie,
        resultStatusMovie
      );
      const returnedPromiseSeries = await promiseHandler(
        promiseSeries,
        resultStatusSeries
      );
      if (
        resultStatusMovie.current === "fulfilled" ||
        resultStatusSeries.current === "fulfilled"
      ) {
        this.result_status.current = "fulfilled";

        this.movies = await fetchHandler(
          returnedPromiseMovies,
          FetchType.QUERY
        );

        this.series = await fetchHandler(
          returnedPromiseSeries,
          FetchType.QUERY
        );

        const moviePages = returnedPromiseMovies.data.total_pages;
        const seriesPages = returnedPromiseSeries.data.total_pages;

        if (moviePages >= seriesPages) {
          this.total_pages = moviePages;
        } else {
          this.total_pages = seriesPages;
        }

        if (!this.movies) {
          this.movies = [];
        }
        if (!this.series) {
          this.series = [];
        }
        const currentData = [...this.movies, ...this.series];
        const completedData = [...this.searchContent, ...currentData];
        const sortedData = sortContent(completedData, this.sortBy);
        this.searchContent = sortedData;
      } else if (
        resultStatusMovie.current === "rejected" ||
        resultStatusSeries.current === "rejected"
      ) {
        this.result_status.current = "rejected";
        this.searchContent = [];
      }
    } catch (error) {
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
        })
        .catch((error: any) => {
          throw error;
        });
    } catch (error) {
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
      throw error;
    }
  },
  fetchContentCreditsSeries: async function () {
    try {
      const seriesCredits = await fetchHandler(
        getSeriesCredits(this.getSearchID()),
        FetchType.CREDITS
      );
      this.currentSeries.credits.cast = seriesCredits.cast;
    } catch (error) {
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
      throw error;
    }
  },
  fetchContentRecommendedMovie: async function () {
    try {
      this.recommendedMovies = await fetchHandler(
        getRecommendedMedia(MediaType.MOVIE, this.getSearchID()),
        FetchType.QUERY
      );
    } catch (error) {
      throw error;
    }
  },
  fetchContentRecommendedSeries: async function () {
    try {
      this.recommendedSeries = await fetchHandler(
        getRecommendedMedia(MediaType.SERIES, this.getSearchID()),
        FetchType.QUERY
      );
    } catch (error) {
      throw error;
    }
  },
  fetchContentSimilarMovie: async function () {
    try {
      this.similarMovies = await fetchHandler(
        getSimilarMedia(MediaType.MOVIE, this.getSearchID()),
        FetchType.QUERY
      );
    } catch (error) {
      throw error;
    }
  },
  fetchContentSimilarSeries: async function () {
    try {
      this.similarSeries = await fetchHandler(
        getSimilarMedia(MediaType.SERIES, this.getSearchID()),
        FetchType.QUERY
      );
    } catch (error) {
      throw error;
    }
  },
  fetchContentWatchProviders: async function (mediaType: MediaType) {
    try {
      if (mediaType === MediaType.MOVIE) {
        this.currentMovie.watch_providers = await fetchHandler(
          getWatchProviders(mediaType, this.getSearchID()),
          FetchType.WATCH_PROVIDERS
        );
      } else if (mediaType === MediaType.SERIES) {
        this.currentSeries.watch_providers = await fetchHandler(
          getWatchProviders(mediaType, this.getSearchID()),
          FetchType.WATCH_PROVIDERS
        );
      }
    } catch (error) {
      throw error;
    }
  },

  fetchCurrentList: async function (list: []) {
    this.currentList = generateDummyContent(10);
    try {
      if (!list) {
        this.currentList = [];
        return;
      }
      var tempList = [];
      for (let i = 0; i < list.length; i++) {
        let media: { mediaID: string; mediaType: string } = list[i];
        if (media.mediaType === MediaType.MOVIE) {
          try {
            let movie = (await fetchHandler(
              getMedia(MediaType.MOVIE, media.mediaID),
              FetchType.SINGLE
            )) as Movie;
            tempList.push(movie);
          } catch (error) {
            throw error;
          }
        } else if (media.mediaType === MediaType.SERIES) {
          try {
            let series = (await fetchHandler(
              getMedia(MediaType.SERIES, media.mediaID),
              FetchType.SINGLE
            )) as Series;
            tempList.push(series);
          } catch (error) {
            throw error;
          }
        }
      }
      if (tempList.length === 0 || !tempList) {
        this.currentList = [];
      } else {
        this.currentList = tempList;
      }
    } catch (error) {
      throw error;
    }
  },

  fetchPersistance: async function (userID: string) {
    if (userID === "" || !userID) {
      // console.log("ERROR: No userID given");
      return;
    }
    if (!persistent.userData) {
      await subscribeDB(userID);
    }
    if (persistent.userData) {
      if (persistent.userData.movieLists) {
        this.state = persistent.userData.movieLists;
      }
    }
  },

  notifyObservers: function (payload: any) {
    function invokeObserversCB(obs: (payload: any) => void) {
      try {
        obs(payload);
      } catch (error) {}
    }
    this.observers.forEach(invokeObserversCB);
  },
  addObserver: function (obs: (payload: any) => void) {
    this.observers.push(obs);
  },
  removeObserver: function (obs: (payload: any) => void) {
    this.observers = this.observers.filter((o) => o !== obs);
  },
  setSearchString: function (str: string) {
    this.searchString = str;
    this.notifyObservers({ searchString: str });
  },
  getSearchString: function () {
    return this.searchString;
  },
  setSearchID: function (str: string) {
    this.searchID = str;
  },
  getSearchID: function () {
    return this.searchID;
  },
  incrementPage: function () {
    const totalPages = this.total_pages;
    const currentPage = this.getPage();
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
  setSearchCategory: function (searchCategory: SearchCategory) {
    this.searchCategory = searchCategory;
  },
  getSearchCategory: function () {
    return this.searchCategory;
  },
  resetCurrentContent: function () {
    (this.currentState = []),
      (this.recommendedMovies = []),
      (this.recommendedSeries = []),
      (this.similarMovies = []),
      (this.similarSeries = []),
      (this.currentMovie = {
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
        watch_providers: {
          link: "",
          rent: [],
          buy: [],
          flatrate: [],
        },
      });
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
      watch_providers: {
        link: "",
        rent: [],
        buy: [],
        flatrate: [],
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
    for (const genre of genres) {
      try {
        const genreID = await genreIDfromName(media, genre);
        if (genreID) {
          genreIDs.push(genreID);
        }
      } catch (error) {}
    }
    if (genreIDs.length > 0) {
      params.append("with_genres", genreIDs.join(","));
    } else {
      throw Error;
    }
  }

  return getDiscover(media, params);
}

async function genreIDfromName(media: MediaType, name: string) {
  try {
    let genresResponse = await getGenreList(media);
    if (genresResponse) {
      const genres = genresResponse.data.genres;
      const options = {
        keys: ["name"],
        includeScore: true,
        threshold: 0.2,
      };
      const fuse = new Fuse(genres, options);
      const results = fuse.search(name);
      if (results.length > 0) {
        const genre: any = results[0].item;
        return genre.id;
      }
    } else {
      throw Error;
    }
  } catch (error) {}
}

// This is NOT exported, access only using functions that automatically persist any change.
interface Persistent {
  userData: UserData | null;
}

let persistent: Persistent = {
  userData: null,
};

// Initially, we do not have an observer
let unsubscriber = () => {};

async function subscribeDB(uid: string) {
  // Unsubscribe the previous observer first
  unsubscriber();
  let refer = ref(db, "users/" + uid);
  let value = await get(refer).then((snapshot) => snapshot.val());
  persistent.userData = value || { uid, movieLists: {} };
  unsubscriber = onValue(refer, (snapshot) => {
    persistent.userData = snapshot.val();
  });
}

function persistUserData() {
  if (persistent.userData) {
    set(ref(db, "users/" + persistent.userData.uid), persistent.userData);
  }
}

async function toggleContentToList(
  userID: string,
  list: string,
  mediaID: string,
  mediaType: string
) {
  if (userID === "" || !userID) {
    // console.log("ERROR: No userID given");
    return;
  }
  let a = await addContentToList(userID, list, mediaID, mediaType);
  if (!a) {
    await removeContentFromList(userID, list, mediaID, mediaType);
  }
  persistUserData();
}

async function addContentToList(
  userID: string,
  list: string,
  mediaID: string,
  mediaType: string
) {
  if (userID === "" || !userID) {
    // console.log("ERROR: No userID given");
    return;
  }
  if (!persistent.userData) {
    await subscribeDB(userID);
  }
  if (persistent.userData) {
    if (!persistent.userData.movieLists[list]) {
      persistent.userData.movieLists[list] = [];
    }

    let unique = true;
    let entries = persistent.userData.movieLists[list];
    entries.forEach((entry) => {
      if (entry.mediaID === mediaID && entry.mediaType === mediaType) {
        // console.log("ERROR: Movie already in list");
        unique = false;
      }
    });
    if (unique) {
      persistent.userData.movieLists[list].push({
        mediaID: mediaID,
        mediaType: mediaType,
      });
      persistUserData();
      return true;
    } else {
      persistUserData();
      return false;
    }
  } else {
    // console.log("ERROR: Despite fetching from DB still no userdata.");
  }
}

async function removeContentFromList(
  userID: string,
  list: string,
  mediaID: string,
  mediaType: string
) {

  if (userID === "" || !userID) {
    // console.log("ERROR: No userID given");
    return;
  }
  if (!persistent.userData) {
    await subscribeDB(userID);
  }
  if (persistent.userData) {
    let entries = persistent.userData.movieLists[list];
    let index = -1;
    entries.forEach((entry, i) => {
      if (entry.mediaID === mediaID && entry.mediaType === mediaType) {
        index = i;
      }
    });
    if (index > -1) {
      persistent.userData.movieLists[list].splice(index, 1);
      persistUserData();
      return true;
    } else {
      persistUserData();
      return false;
    }
  } else {
    // console.log("ERROR: Despite fetching from DB still no userdata.");
  }
}

async function getUserData(uid: string): Promise<UserData | null> {
  if (persistent.userData === null) {
    await subscribeDB(uid);
  } else if (persistent.userData.uid !== uid) {
    // console.log("ERROR: Fetching another users data");
    return null;
  }
  return persistent.userData;
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
  subscribeDB,
  addContentToList,
  removeContentFromList,
  toggleContentToList,
  persistUserData,
  getUserData,
};
