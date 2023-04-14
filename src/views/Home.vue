<template>
  <div class="homepage flex-col flex-center">
    <div class="intro-container flex-col flex-center">
      <img
        src="../assets/didyousee.svg"
        alt="didyousee logo. an owl holding a binocular, looking for the next movie/series"
        decoding="async"
        fetchpriority="high"
      />
      <h1>Did  You See</h1>
      <p>{{ trivia }}</p>
    </div>
    <!-- <div class="overlay"></div> -->
    <!-- <div class="popup">
      <div class="popup-close"><span class="material-symbols-rounded">close</span></div>
      <h1>Seasons:</h1>
      <p>Season 1</p>
      <p>Season 2</p>
      <p>Season 3</p>
      <p>Season 4</p>
    </div> -->
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

export default defineComponent({
  components: {
    MovieCard,
    Filter,
  },
  beforeRouteLeave(to, from, next) {
    // Stores values
    // localStorage.setItem("userSearch", JSON.stringify(this.searchString));
    // localStorage.setItem("userPage", JSON.stringify(this.currentPage));
    next();
  },
  created() {
    // // Reads saved values
    // const savedSearch = localStorage.getItem("userSearch");
    // const savedPage = localStorage.getItem("userPage");
    // if (savedSearch) {
    //   this.searchString = JSON.parse(savedSearch);
    //   if (savedPage) {
    //     this.currentPage = parseInt(JSON.parse(savedPage));
    //   }
    // }
  },
  mounted() {
    this.getTrendingMedia();
  },
  methods: {
    async getTrendingMedia() {
      let page = 1;
      const movie: any | undefined = await getTrending(
        "movie",
        "day",
        page.toString(),
      );
      console.log("API Trending");
      if (movie) {
        this.updateData(movie);
      }
    },
    updateData(response: any) {
      this.movies = response.data.results;
    },
    // filterClickACB() {
    //   console.log("Filter!");
    //   this.searchFilter = !this.searchFilter;
    // },
  },
  data() {
    return {
      // searchFilter: false,
      trivia:
        "Did you know: In 2012, The Matrix was selected by the U.S. Library of Congress for preservation in the National Film Registry archives for being culturally historically or aesthetically significant",
      movies: [],
    };
  },
});
</script>