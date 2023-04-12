<template>
  <Filter v-if="searchFilter"/>
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
      <i class="material-symbols-outlined" @click="filterClickACB"
        >filter_alt</i
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
      <i class="material-symbols-outlined" @click="searchClickACB(searchString)"
        >search</i
      >
    </div>
    <div class="trending-list flex-row flex-center">
      <MovieCard
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
      />
    </div>
    <div class="page-buttons-container">
      <button @click="goToPrevPageACB" :disabled="currentPage === 1">
        Prev
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="goToNextPageACB" :disabled="currentPage === totalPages">
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
  async mounted() {
    const movie: any | undefined = await getTrending("movie", "day", "1");
    if (movie) {
      console.log("dataMediaMounted", movie);
      this.updateData(movie);
    }
  },
  methods: {
    async goToPrevPageACB() {
      console.log(this.searchString);
      if (this.currentPage > 1) {
        this.currentPage--;
        console.log("prevPage", this.currentPage);

        const params = new URLSearchParams();
        params.append("query", this.searchString);
        params.append("page", this.currentPage.toString());

        if (this.searchString.length > 0) {
          const movie: any | undefined = await searchMovie(
            new URLSearchParams(params)
          );
          if (movie) {
            console.log("dataSearchMedia", movie);
            this.updateData(movie);
          }
        } else {
          const movie: any | undefined = await getTrending(
            "movie",
            "day",
            this.currentPage
          );
          if (movie) {
            console.log("dataSearchMedia", movie);
            this.updateData(movie);
          }
        }
      }
    },
    async goToNextPageACB() {
      console.log(this.searchString);
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        console.log("nextPage", this.currentPage);

        const params = new URLSearchParams();
        params.append("query", this.searchString);
        params.append("page", this.currentPage.toString());

        if (this.searchString.length > 0) {
          const movie: any | undefined = await searchMovie(
            new URLSearchParams(params)
          );
          if (movie) {
            console.log("dataSearchMedia", movie);
            this.updateData(movie);
          }
        } else {
          const movie: any | undefined = await getTrending(
            "movie",
            "day",
            this.currentPage
          );
          if (movie) {
            console.log("dataSearchMedia", movie);
            this.updateData(movie);
          }
        }
      }
    },
    async searchClickACB(searchQuery: string) {
      this.currentPage = 1;
      if (searchQuery.length <= 0) {
        console.error("Search query is empty.");
        return; 
      }
      console.log(`Searching: ${searchQuery}`);
      const movie: any | undefined = await searchMovie(
        new URLSearchParams({ query: searchQuery })
      );
      if (movie) {
        console.log("dataSearchMedia", movie);
        this.updateData(movie);
      }
    },
    updateData(response: any) {
      this.movies = response.data.results;
      this.currentPage = response.data.page;
      this.totalPages = response.data.total_pages;
    },
    searchEnterACB() {
      this.searchClickACB(this.searchString);
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
      console.log("Clicked filter!");
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
