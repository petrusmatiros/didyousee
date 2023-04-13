<template>
  <Filter v-if="searchFilter" />
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
    <div
      class="searchBar flex-row flex-center"
      :class="{ 'searchBar--focused': inputFocused }"
    >
      <span class="material-symbols-rounded" @click="filterClickACB"
        >filter_alt</span
      >
      <input
        type="text"
        placeholder="Search for a movie"
        name="inputSearchBar"
        @focus="onInputFocus"
        @blur="onInputBlur"
        v-model="searchString"
        @keydown.enter="searchEnterACB"
        @input="onInputTyping"
      />
      <span class="material-symbols-rounded" @click="searchClickACB(searchString)"
        >search</span
      >
    </div>
    <div class="trending-list flex-row flex-center">
      <MovieCard v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
    <div class="page-buttons-container">
      <button class="button" @click="goToPrevPageACB" :disabled="currentPage === 1">
        Prev
      </button>
      <span >{{ currentPage }} / {{ totalPages }}</span>
      <button class="button" @click="goToNextPageACB" :disabled="currentPage === totalPages">
        Next
      </button>
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
  searchMovie,
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
    localStorage.setItem("userSearch", JSON.stringify(this.searchString));
    localStorage.setItem("userPage", JSON.stringify(this.currentPage));
    next();
  },
  created() {
    // Reads saved values
    const savedSearch = localStorage.getItem("userSearch");
    const savedPage = localStorage.getItem("userPage");
    if (savedSearch) {
      this.searchString = JSON.parse(savedSearch);
      if (savedPage) {
        this.currentPage = parseInt(JSON.parse(savedPage));
      }
    }
  },
  mounted() {
    this.getCorrectData();
  },
  methods: {
    getCorrectData() {
      this.searchString.length > 0
        ? this.getSearchMedia()
        : this.getTrendingMedia();
    },
    async getTrendingMedia() {
      const movie: any | undefined = await getTrending(
        "movie",
        "day",
        this.currentPage
      );
      console.log("API Trending");
      if (movie) {
        this.updateData(movie);
      }
    },
    async getSearchMedia() {
      const params = new URLSearchParams();
      params.append("query", this.searchString);
      params.append("page", this.currentPage.toString());

      const movie: any | undefined = await searchMovie(
        new URLSearchParams(params)
      );
      console.log("API Search");
      if (movie) {
        this.updateData(movie);
      }
    },
    goToPrevPageACB() {
      console.log(this.searchString);
      if (this.currentPage > 1) {
        this.currentPage--;
        this.getCorrectData();
      }
    },
    goToNextPageACB() {
      console.log(this.searchString);
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getCorrectData();
      }
    },
    async searchClickACB(searchQuery: string) {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.currentPage = 1;
      if (searchQuery.length <= 0) {
        this.searchString = "";
        this.getTrendingMedia();
        return;
      }
      console.log(`Searching: ${searchQuery}`);
      this.getSearchMedia();
    },
    searchEnterACB() {
      this.searchClickACB(this.searchString);
    },
    updateData(response: any) {
      this.movies = response.data.results;
      this.currentPage = response.data.page;
      this.totalPages = response.data.total_pages;
    },
    onInputTyping() {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(() => {
        this.searchClickACB(this.searchString);
      }, 500);
    },
    filterClickACB() {
      console.log("Filter!");
      this.searchFilter = !this.searchFilter;
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
    return {
      typingTimeout: null as ReturnType<typeof setTimeout> | null,
      currentPage: 1,
      totalPages: 1,
      searchFilter: false,
      inputFocused: false,
      trivia:
        "Did you know: In 2012, The Matrix was selected by the U.S. Library of Congress for preservation in the National Film Registry archives for being culturally historically or aesthetically significant",
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