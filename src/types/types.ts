export enum FetchType {
  SINGLE = "single",
  QUERY = "query",
  VIDEO = "video",
  CREDITS = "credits",
  REVIEWS = "reviews",
  WATCH_PROVIDERS = "watch_providers",
}

export type ErrorType = {
  type : string,
  message : string
}

export type ErrorMessage = {
  errorMessage : string | undefined,
  errors : ErrorType[]
}

export enum TriviaCategory {
  MOVIE = "11",
  SERIES = "14",
}

export enum SearchCategory {
  TITLE = "title",
  GENRE = "genre",
}

export enum SortBy {
  POPULARITY_ASC = "popularity_asc",
  POPULARITY_DSC = "popularity_dsc",
  RATING_ASC = "rating_asc",
  RATING_DSC = "rating_dsc",
  TITLE_ASC = "title_asc",
  TITLE_DSC = "title_dsc",
  LATEST = "year_dsc",
  OLDEST = "year_asc",
}

export enum ListType {
  LIKED = "liked",
  WATCH = "watch",
  SEEN = "seen",
  DISLIKED = "disliked",
}

export enum PosterSize {
  W92 = "w92",
  W154 = "w154",
  W185 = "w185",
  W342 = "w342",
  W500 = "w500",
  W780 = "w780",
  ORIGINAL = "original",
}

export enum BackdropSize {
  W300 = "w300",
  W780 = "w780",
  W1280 = "w1280",
  ORIGINAL = "original",
}

export enum MediaType {
  MOVIE = "movie",
  SERIES = "tv",
}

export type WatchProvider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type Reviewer = {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface Content {
  id: number;
  overview: string;
  created_by: any[];
  vote_average: number;
  vote_count: number;
  formatted_vote_count: string;
  popularity: number;
  original_language: string;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  backdrop_path: string;
  poster_path: string;
  genres: {
    id: number;
    name: string;
  }[];
  genre_ids: number[];
  status: string;
  video: string;
  credits: {
    cast: any[];
    crew: any[];
  };
  reviews: {
    id: number;
    page: number;
    results: Reviewer[];
    total_pages: number;
    total_results: number;
  };
  watch_providers: {
    link: string;
    rent: WatchProvider[];
    buy: WatchProvider[];
    flatrate: WatchProvider[];
  };
}

export interface Movie extends Content {
  title: string;
  release_date: string;
  mediaType: MediaType.MOVIE | undefined;
  runtime: number;
  belongs_to_collection: {};
  budget: number;
  formatted_budget: string;
  revenue: number;
  formatted_revenue: string;
}

export interface Series extends Content {
  name: string;
  first_air_date: string;
  mediaType: MediaType.SERIES | undefined;
  episode_run_time: number[];
  last_episode_to_air: {};
  next_episode_to_air: {};
  number_of_episodes: number;
  number_of_seasons: number;
  seasons: any[];
}
