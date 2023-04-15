<template>
  <Filter v-if="searchFilter" />
  <div class="search-results flex-col flex-center">
    <div class="trending-list flex-row flex-center">
      <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";
import MovieCard from "../components/MovieCard.vue";
import Filter from "../components/Filter.vue";
import {
  model,
  searchMedia,
  getTrending,
  getMedia,
  getSimilarMedia,
} from "../model/model";
import {MediaType} from '../types/types';

export default defineComponent({
  components: {
    MovieCard,
    Filter,
  },
  computed: {
    query() {
      return this.$route.query.q;
    },
    results() {
      // Use the query parameter to fetch the search results
      // from the server or from a Vuex store
      return [];
    },
  },
  mounted() {
    // get query string from url
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    if (q) {
      this.searchString = q;
    }
    this.getSearchMedia();
  },
  methods: {
    searchClickACB() {
        console.log("Search!");
        this.getSearchMedia();
    },
    async getSearchMedia() {
      const params = new URLSearchParams();
      params.append("query", this.searchString);
      const contentResponse: any | undefined = await searchMedia(
        MediaType.MOVIE,
        new URLSearchParams(params)
      );
      console.log("API Search", contentResponse);
      if (contentResponse) {
        this.updateData(contentResponse);
      }
    },
    updateData(response: any) {
        console.log("Response", response.data.results)
      this.movies = response.data.results;
    },
    filterClickACB() {
      console.log("Filter!");
      this.searchFilter = !this.searchFilter;
    },
  },
  data() {
    return {
      searchFilter: false,
      searchString: "",
      movies: [
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
      ],
    };
  },
});
</script>
