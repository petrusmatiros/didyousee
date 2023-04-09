import tmdbApi from "./apiConfig";

function wrap(query : string) {
    let params = new URLSearchParams({"api_key": import.meta.env.VITE_TMDB_API_KEY});
    let res = tmdbApi.get(query + "?" + params);
    console.log("Test" + res);
    return res;
}

// TODO define model with all the things we need
let model = {

}

// TODO fetch data lazily
wrap("/discover/movie").then(data => model["movies"] = data.data);

export default model;
