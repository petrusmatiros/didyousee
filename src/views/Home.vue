<template>
  <div class="homepage flex-col flex-center">
    <div class="intro-container flex-col flex-center">
      <img
        src="../assets/didyousee.svg"
        alt="didyousee logo. an owl holding a binocular, looking for the next movie/series"
        decoding="async"
        fetchpriority="high"
      />
      <h1>did you see...?</h1>
      <p>{{ trivia }}</p>
    </div>
    <div
      class="searchBar flex-row flex-center"
      :class="{ 'searchBar--focused': inputFocused }"
    >
      <i class="material-symbols-outlined" @click="searchClickACB(searchString)"
        >search</i
      >
      <input
        type="text"
        placeholder="Search for a movie"
        name="inputSearchBar"
        @focus="onInputFocus"
        @blur="onInputBlur"
        v-model="searchString"
        @keydown.enter="searchEnterACB"
      />
      <i class="material-symbols-outlined" @click="filterClickACB"
        >filter_alt</i
      >
    </div>
    <div class="trending-list flex-row flex-center">
      <movie-card
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
      />
    </div>
    <div class="page-buttons-container">
      <button @click="goToPrevPageACB" :disabled="currentPage === 1">Prev</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToNextPageACB" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import './../style.css'
import MovieCard from '../components/MovieCard.vue'
import { movie, listing } from "../model/model"
import { model, searchMovie, getTrending, getMedia, getSimilarMedia} from "../model/model"


export default defineComponent({
  components: {
    MovieCard,
  },
  async mounted() {
      const movie: listing<movie> = await getTrending("movie","day");
      console.log("dataMediaMounted", movie);
      this.updateData(movie);
  },
  methods: {
    //TODO:
    goToPrevPageACB() {
      if (this.currentPage > 1) {
        this.currentPage--;
        console.log("prevPage", this.currentPage);
        // Call API based on the new currentPage value
      }
    },
    //TODO:
    goToNextPageACB() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        console.log("nextPage", this.currentPage);
        // Call API based on the new currentPage value
      }
    },
    async searchClickACB(searchQuery: string) {
      const movie : listing<movie> = await searchMovie(new URLSearchParams({ query: searchQuery }));
      console.log("dataSearchMedia with query: ${searchQuery}", movie);
      this.updateData(movie);
    },
    updateData(results: listing<movie>) {
      this.movies = results.results;
      this.currentPage = results.page;
      this.totalPages = results.total_pages;
    },
    searchEnterACB() {
      this.searchClickACB(this.searchString);
    },
    filterClickACB() {
      console.log("Clicked filter!");
    },
    onInputFocus() {
      this.inputFocused = true;
      const searchBar = document.querySelector(".searchBar");
      if (searchBar) {
        searchBar.classList.add("searchBar--focused");
      }
    },
    onInputBlur() {
      this.inputFocused = false; // set the inputFocused flag to false
      const searchBar = document.querySelector(".searchBar");
      if (searchBar) {
        searchBar.classList.remove("searchBar--focused");
      }
    },
  },

  data() {
    const movies : movie[] | any[] = [
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
      ];
    return {
      currentPage: 1,
      totalPages: 1,
      inputFocused: false,
      trivia:
        "Did you know: In 2012, The Matrix was selected by the U.S. Library of Congress for preservation in the National Film Registry archives for being culturally historically or aesthetically significant",
      searchString: "",
      movies,
    };
  },
});
</script>
