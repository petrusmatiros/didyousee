

export enum TriviaCategory {
    MOVIES = '11',
    TV = '14',
}

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original';

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
    vote_average: number,
    vote_count: number,
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

export interface Movie extends Content {
    title: string
    runtime: number,
    belongs_to_collection: {},
}

export interface Series extends Content {
    name: string,
    created_by: any[],
    episode_run_time: number[],
    last_episode_to_air: {},
    next_episode_to_air: {},
    number_of_episodes: number,
    number_of_seasons: number,
    seasons: any[],
}
