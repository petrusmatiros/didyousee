import tmdbApi from "./apiConfig";

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
interface model {
    movies: any
    searchMovie: (query: URLSearchParams) => any
    getTrending: (type:string, timeWindow:string) => any
    getMedia: (id: string) => any
    getSimilarMedia: (id: string) => any
}

let model : model = {
    movies: null,
    searchMovie: function (query) {
        return wrap("/search/movie", query);
    },
    getTrending: function (type, timeWindow) {
        return wrap(`/trending/${type}/${timeWindow}`, new URLSearchParams());
    },
    getMedia: function (id) {
        return wrap(`/movie/${id}`, new URLSearchParams());
    },
    getSimilarMedia: function (id) {
        return wrap(`/movie/${id}/similar`, new URLSearchParams());
    },
}

// TODO fetch data lazily
wrap("/discover/movie", new URLSearchParams()).then(data => model.movies = data.data);

export default model;
