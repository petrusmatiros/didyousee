

export enum TriviaCategory {
    MOVIE = '11',
    SERIES = '14',
}

export enum SearchCategory {
    TITLE = 'title',
    GENRE = 'genre',
}

export enum PosterSize {
    W92 = 'w92',
    W154 = 'w154',
    W185 = 'w185',
    W342 = 'w342',
    W500 = 'w500',
    W780 = 'w780',
    ORIGINAL = 'original',
}

export enum BackdropSize {
    W300 = 'w300',
    W780 = 'w780',
    W1280 = 'w1280',
    ORIGINAL = 'original',
}

export enum MediaType {
    MOVIE = 'movie',
    SERIES = 'tv',
}

/*
- title, overview/description
- rating/popularity
- languages (array) - skulle vara nice om vi sen kan klicka på dem och det tar oss till search med just den queryn (typ =action)
- genres (array) - klickbara också
- Cast
- Reviews (verkar finnas i apin)
- Similar movies?
- Director, writer (tas från credits för movies)
- Budget, revenue
 */
export interface Content {
    id: number,
    overview: string,
    created_by: any[],
    vote_average: number,
    vote_count: number,
    popularity: number,
    release_date: string,
    original_language: string,
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
    status: string,
    video: string,
    credits: {
        cast: any[],
        crew: any[],
    }
    reviews: {
        id: number,
        page: number,
        results: any[],
        total_pages: number,
        total_results: number,
    }
}

export interface Movie extends Content {
    title: string
    mediaType: MediaType.MOVIE,
    runtime: number,
    belongs_to_collection: {},
    budget: number
    formatted_budget: string
    revenue: number
    formatted_revenue: string
}

export interface Series extends Content {
    name: string,
    mediaType: MediaType.SERIES,
    episode_run_time: number[],
    last_episode_to_air: {},
    next_episode_to_air: {},
    number_of_episodes: number,
    number_of_seasons: number,
    seasons: any[],
}
