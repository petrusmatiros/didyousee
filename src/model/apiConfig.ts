import axios from 'axios'
const tmdbApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
      common: {
        'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
  });

export default tmdbApi;
