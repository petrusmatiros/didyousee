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
import { defineComponent } from "vue";
import "./../style.css";
import MovieCard from "../components/MovieCard.vue";
import model from "../model/model";

export default defineComponent({
  components: {
    MovieCard,
  },
  mounted() {
    model
      .getTrending("movie", "day")
      .then((response: any) => {
        console.log("dataMounted", response.data.results);
        this.updateData(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
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
    searchClickACB(searchQuery: string) {
      console.log(`Clicked search!: ${searchQuery}`);
      model
        .searchMovie(new URLSearchParams({ query: searchQuery }))
        .then((response: any) => {
          console.log("dataSearch", response.data.results);
          this.updateData(response);
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    updateData(response: any) {
      this.movies = response.data.results;
      this.currentPage = response.data.page;
      this.totalPages = response.data.total_pages;
    },
    searchEnterACB() {
      this.searchClickACB(this.searchString);
    },
    filterClickACB() {
      console.log("Clicked filter!");
      console.log(model.searchMovie(new URLSearchParams({ query: "Matrix" })));
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
      currentPage: 1,
      totalPages: 1,
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
