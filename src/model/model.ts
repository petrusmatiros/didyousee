import { tmdbApi, tmdbImageApi, opentdbApi } from "./apiConfig";
import {
  TriviaCategory,
  SearchCategory,
  PosterSize,
  BackdropSize,
  MediaType,
  Content,
  Movie,
  Series,
} from "../types/types";
import { SortingOrder, random, sort, filter, find } from "../utils/utils";
import numeral from 'numeral';
import resolvePromise from "../resolvePromise";
import promiseNoData from "../promiseNoData";
import Fuse from 'fuse.js';


async function promiseHandler(promise: Promise<any>, status: any): Promise<any> {
  let isStatusPending = true;

  if (isStatusPending) {
    status.current = 'pending';
  }

  return promise.then((response) => {
    status.current = 'fulfilled';
    if (response.data.total_results === 0) {
      status.current = 'rejected';
    }
    isStatusPending = false;
    return response;
  }).catch((error) => {
    console.log("Promise rejected: ", error);
    status.current = 'rejected';
    isStatusPending = false;
    return error;
  })

}

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
function backdrop(
  size: BackdropSize = BackdropSize.W780,
  path: string
): string {
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

function average(array: number[]): number[] {
  if (!array) return [0];
  if (array.length === 0) return [0];
  return [Math.round(array.reduce((a, b) => a + b, 0) / array.length)];
}

function formatMoney(amount: number): string {
  return numeral(amount).format('$0,0 a').toUpperCase();
}

function formatVoteCount(amount: number): string {
  return numeral(amount).format('0,0 a').toUpperCase();
}

function setCreator(input: any, mediaType: MediaType): any {
  if (!input) return [];
  if (input.length === 0) return [];
  if (mediaType === MediaType.MOVIE) {
    return input.filter((e:any) => e.job === "Director");
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
        total_results: 0
      },
      credits: {
        cast: [],
        crew: [],
      },
    })
  }
  return array;
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
    created_by: input.created_by,
    vote_average: input.vote_average,
    vote_count: input.vote_count,
    formatted_vote_count: formatVoteCount(input.vote_count),
    popularity: input.popularity,
    original_language: input.original_language,
    spoken_languages: input.spoken_languages,
    backdrop_path: input.backdrop_path,
    poster_path: input.poster_path,
    genres: input.genres,
    status: input.status,
    video: "",
    reviews: {
      id: 0,
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
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

  fetchSingleMovie: () => Promise<void>;
  fetchSingleSeries: () => Promise<void>;
  fetchMovies: () => Promise<void>;
  fetchMoviesTest: () => Promise<void>;
  fetchSeries: () => Promise<void>;
  fetchSeriesTest: () => Promise<void>;
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
      const movie: any | undefined = await getMedia(
        MediaType.MOVIE,
        this.getSearchID()
      ); 

      console.log("API fetchMovie", this.getSearchID());
      this.currentMovie = contentFromQuery(movie.data) as Movie;

      // TODO: Ändra hur vi tar hand om poster_path och backdrop. Om vi enbart gör x = movie.data får vi bara ena delen i poster_path.
      this.currentMovie.poster_path = movie.data.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.data.poster_path}`
        : "/src/assets/no-poster.svg";
    } catch (error) {
      console.error("Failed to fetch single movie:", error);
      throw error;
    }
  },
  fetchSingleSeries: async function () {
    try {
      const series: any | undefined = await getMedia(
        MediaType.SERIES,
        this.getSearchID()
      );
      console.log("API fetchSeries", this.getSearchID());
      this.currentSeries = contentFromQuery(series.data) as Series;

      // TODO: Ändra hur vi tar hand om poster_path och backdrop. Om vi enbart gör x = movie.data får vi bara ena delen i poster_path.
      this.currentSeries.poster_path = series.data.poster_path
        ? `https://image.tmdb.org/t/p/w500${series.data.poster_path}`
        : "/src/assets/no-poster.svg";
    } catch (error) {
      console.error("Failed to fetch single series:", error);
      throw error;
    }
  },
  fetchMovies: async function () {
    try {
      const movies: any | undefined = await searchMedia(
        MediaType.MOVIE,
        this.getSearchString(),
        this.getPage()
      );
        
      console.log("API fetchMovies", this.getSearchString());
      this.movies = movies.data.results.map(contentFromQuery)
      
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      throw error;
    }
  },
  fetchMoviesTest: async function () {
    const promise = searchMedia(MediaType.MOVIE, this.getSearchString(), this.getPage())
    const returnedPromise = await promiseHandler(promise, this.result_status)
    
    this.movies = await returnedPromise.data.results.map(contentFromQuery);

    // console.log("returnedPromise", returnedPromise);
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
    const promise = searchMedia(MediaType.SERIES, this.getSearchString(), this.getPage())
    const returnedPromise = await promiseHandler(promise, this.result_status)
    
    this.series = await returnedPromise.data.results.map(contentFromQuery);
  },
  fetchGenreContent: async function () {
    try {
      const movies = await discoverMedia(
        MediaType.MOVIE,
        this.getSearchString(),
        this.getPage()
      );
      const series = await discoverMedia(
        MediaType.SERIES,
        this.getSearchString(),
        this.getPage()
      );
      console.log("API fetchGenreContent", this.getSearchString());
      const data = [...movies.data.results, ...series.data.results];
      console.log("API fetchGenreContent", data)
      const genreContent = data.map(contentFromQuery);
      this.searchContent = [...this.searchContent, ...genreContent];
    } catch (error) {
      console.error("Failed to fetch content with genre:", error);
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
    }
  },
  fetchHomeTrendingMovies: async function () {
    try {
      const movie = await getTrending(MediaType.MOVIE, "day", this.getPage());
      console.log("API getTrendingMovies", movie.data.results);
      this.homeContent.trendingMovies = movie.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
      throw error;
    }
  },
  fetchHomeTrendingSeries: async function () {
    try {
      const series = await getTrending(MediaType.SERIES, "day", this.getPage());
      console.log("API getTrendingSeries", series.data.results);
      this.homeContent.trendingSeries = series.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch trending series:", error);
      throw error;
    }
  },
  fetchHomePopularMovies: async function () {
    try {
      const movie = await getPopular(MediaType.MOVIE);
      console.log("API getPopularMovies", movie.data.results);
      this.homeContent.popularMovies = movie.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
      throw error;
    }
  },
  fetchHomePopularSeries: async function () {
    try {
      const series = await getPopular(MediaType.SERIES);
      console.log("API getPopularSeries", series.data.results);
      this.homeContent.popularSeries = series.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch popular series:", error);
      throw error;
    }
  },
  fetchHomeTopRatedMovies: async function () {
    try {
      const movie = await getTopRated(MediaType.MOVIE);
      console.log("API getTopRatedMovies", movie.data.results);
      this.homeContent.topRatedMovies = movie.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
      throw error;
    }
  },
  fetchHomeTopRatedSeries: async function () {
    try {
      const series = await getTopRated(MediaType.SERIES);
      console.log("API getTopRatedSeries", series.data.results);
      this.homeContent.topRatedSeries = series.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch top rated series:", error);
      throw error;
    }
  },
  fetchHomeUpcomingMovies: async function () {
    try {
      const movie = await getUpcomingMovies();
      console.log("API getUpcomingMovies", movie.data.results);
      this.homeContent.upcomingMovies = movie.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
      throw error;
    }
  },
  fetchHomeNowPlayingMovies: async function () {
    try {
      const movie = await getNowPlayingMovies();
      console.log("API getNowPlayingMovies", movie.data.results);
      this.homeContent.nowPlayingMovies = movie.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to fetch now playing movies:", error);
      throw error;
    }
  },
  fetchHomeOnTheAirSeries: async function () {
    try {
      const series = await getOnTheAirSeries();
      console.log("API onTheAirSeries", series.data.results);
      this.homeContent.onTheAirSeries = series.data.results.map(contentFromQuery);
    } catch (error) {
      console.error("Failed to on the air series series:", error);
      throw error;
    }
  },
  fetchHomeAiringTodaySeries: async function () {
    try {
      const series = await getAiringTodaySeries();
      console.log("API getAiringTodaySeries", series.data.results);
      this.homeContent.airingTodaySeries = series.data.results.map(contentFromQuery);
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
      const movieVideos = await getMovieVideos(this.getSearchID());
      console.log("API getContentVideosMovie", movieVideos.data.results);
      const filteredMovieVideos = movieVideos.data.results.filter((video: any) => {
        return (video.site === "YouTube" && video.official === true && (video.type === "Trailer" || video.type === "Teaser"));
      });
      console.log("filteredMovieVideos", filteredMovieVideos)
      this.currentMovie.video = filteredMovieVideos && filteredMovieVideos.length > 0 ? `https://www.youtube-nocookie.com/embed/${filteredMovieVideos[0].key}` : "";
      console.log("video", this.currentMovie.video)
    } catch (error) {
      console.error("Failed to fetch getContentVideosMovie:", error);
      throw error;
    }
  },
  fetchContentVideosSeries: async function () {
    try {
      const seriesVideos = await getSeriesVideos(this.getSearchID());
      console.log("API getContentVideosSeries", seriesVideos.data.results);
      const filteredSeriesVideos = seriesVideos.data.results.filter((video: any) => {
        return (video.site === "YouTube" && video.official === true && (video.type === "Trailer" || video.type === "Teaser"));
      });
      console.log("filteredSeriesVideos", filteredSeriesVideos)
      this.currentSeries.video = filteredSeriesVideos && filteredSeriesVideos.length > 0 ? `https://www.youtube-nocookie.com/embed/${filteredSeriesVideos[0].key}` : "";
      console.log("video", this.currentSeries.video)
    } catch (error) {
      console.error("Failed to fetch getContentVideosSeries:", error);
      throw error;
    }
  },
  fetchContentReviewsSeries: async function () {
    try {
      const seriesReview = await getSeriesReviews(this.getSearchID());
      console.log("API fetchContentReviewsSeries", seriesReview.data.results);
      this.currentSeries.reviews = seriesReview.data.results;
    } catch (error) {
      console.error("Failed to fetch getSeriesReview:", error);
      throw error;
    }
  },
  fetchContentReviewsMovie: async function () {
    try {
      const movieReview = await getMovieReviews(this.getSearchID());
      console.log("API fetchContentReviewsMovie", movieReview.data.results);
      this.currentMovie.reviews = movieReview.data.results;
    } catch (error) {
      console.error("Failed to fetch getMovieReview:", error);
      throw error;
    }
  },
  fetchContentCreditsSeries: async function () {
    try {
      const seriesCredits = await getSeriesCredits(this.getSearchID());
      console.log("API fetchContentCreditsSeries", seriesCredits.data.results);
      this.currentSeries.credits.cast = seriesCredits.data.cast;
    } catch (error) {
      console.error("Failed to fetch getSeriesCredits:", error);
      throw error;
    }
  },
  fetchContentCreditsMovie: async function () {
    try {
      const movieCredits = await getMovieCredits(this.getSearchID());
      console.log("API fetchContentCreditsMovie", movieCredits);
      this.currentMovie.credits.cast = movieCredits.data.cast;
      this.currentMovie.created_by = setCreator(movieCredits.data.crew, MediaType.MOVIE);
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
  }
}

async function getDiscover(media: MediaType) {
  return wrap(`/discover/${media}`, new URLSearchParams());
}

async function getTrending(type: string, timeWindow: string, page: number) {
  return wrap(
    `/trending/${type}/${timeWindow}`,
    new URLSearchParams({ page: page.toString(), include_adult: "false" })
  );
}

async function getNowPlayingMovies() {
  return wrap(
    `/movie/now_playing`,
    new URLSearchParams()
  );
}
async function getAiringTodaySeries() {
  return wrap(
    `/tv/airing_today`,
    new URLSearchParams()
  );
}
async function getOnTheAirSeries() {
  return wrap(
    `/tv/on_the_air`,
    new URLSearchParams()
  );
}

async function getPopular(media: MediaType) {
  return wrap(
    `/${media}/popular`,
    new URLSearchParams()
  );
}
async function getTopRated(media: MediaType) {
  return wrap(
    `/${media}/top_rated`,
    new URLSearchParams()
  );
}
async function getUpcomingMovies() {
  return wrap(
    `/movie/upcoming`,
    new URLSearchParams()
  );
}




async function getMovieVideos(movie_id: string) {
  return wrap(
    `/movie/${movie_id}/videos`,
    new URLSearchParams()
  );
}

async function getSeriesVideos(tv_id: string) {
  return wrap(
    `/tv/${tv_id}/videos`,
    new URLSearchParams()
  );
}

async function getSeriesReviews(tv_id: string) {
  return wrap(
    `/tv/${tv_id}/reviews`,
    new URLSearchParams()
  );
}
async function getMovieReviews(movie_id: string) {
  return wrap(
    `/movie/${movie_id}/reviews`,
    new URLSearchParams()
  );
}

async function getSeriesCredits(tv_id: string) {
  return wrap(
    `/tv/${tv_id}/credits`,
    new URLSearchParams()
  );
}
async function getMovieCredits(movie_id: string) {
  return wrap(
    `/movie/${movie_id}/credits`,
    new URLSearchParams()
  );
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

async function searchMedia(media: MediaType, query: string, page: number = 1) {
  return wrap(
    `/search/${media}`,
    new URLSearchParams(`query=${query}&page=${page.toString()}&include_adult=false`)
  );
}
async function searchMultiMedia(query: string, page: number = 1) {
  return wrap(
    `/search/multi`,
    new URLSearchParams(`query=${query}&page=${page.toString()}&include_adult=false`)
  );
}

async function discoverMedia(media: MediaType, query: string, page: number = 1) {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("include_adult", "false");

  if (query) {
    query = query.toLowerCase();
    query = query.trim();
    const genreIDs = [];
    const genres = query.split(/[ ,]+/);
    for (const genre of genres) {
      const genreID = await genreIDfromName(media, genre);
      if (genreID) {
        genreIDs.push(genreID);
      } else {
        params.append("with_keywords", genre);
      }
    }
    if (genreIDs.length > 0) {
      params.append("with_genres", genreIDs.join(","));
    }
  }

  return wrap(`/discover/${media}`, params);
}

async function getGenreList(media: MediaType) {
  return wrap(`/genre/${media}/list`, new URLSearchParams());
}

async function genreIDfromName(media: MediaType, name: string) {
  try {
    let genresResponse = await getGenreList(media);
    const genres = genresResponse.data.map((genre:any) => {  return { id: genre.id, name: genre.name.toLowerCase() }; });
    const options = {
      keys: ['name'],
      includeScore: true,
      threshold: 0.2 // adjust threshold as needed
    };
    const fuse = new Fuse(genres, options);
    const results = fuse.search(name);
    if (results.length > 0) {
      const genre:any = results[0].item;
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