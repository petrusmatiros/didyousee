<template>
  <div
      class="searchBar flex-row flex-center"
      :class="{ 'searchBar--focused': inputFocused }"
    >
    <span class="material-symbols-rounded" @click="searchClickACB(searchString)"
        >search</span
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
      
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";
import {
  model,
  searchMedia,
  getTrending,
  getMedia,
  getSimilarMedia,
} from "../model/model";

export default defineComponent({
  beforeRouteLeave(to, from, next) {
    // Stores values
    localStorage.setItem("userSearch", JSON.stringify(this.searchString));
    next();
  },
  created() {
    // Reads saved values
    const savedSearch = localStorage.getItem("userSearch");
    if (savedSearch) {
      this.searchString = JSON.parse(savedSearch);
    }
  },
  mounted() {
    this.getSearchMedia()
  },
  methods: {
    async getSearchMedia() {
      const params = new URLSearchParams();
      params.append("query", this.searchString);

      const movie: any | undefined = await searchMedia(
        'movie',
        new URLSearchParams(params)
      );
      console.log("API Search");
      if (movie) {
        this.updateData(movie);
      }
    },
    async searchClickACB(searchQuery: string) {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      if (searchQuery.length <= 0) {
        this.searchString = "";
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
    },
    onInputTyping() {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      this.typingTimeout = setTimeout(() => {
        this.searchClickACB(this.searchString);
      }, 500);
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
      inputFocused: false,
      searchString: "",
      movies: [],
    };
  },
});
</script>
