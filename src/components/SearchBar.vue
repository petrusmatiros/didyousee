<template>
  <div
      class="searchBar flex-row flex-center"
      :class="{ 'searchBar--focused': inputFocused }"
    >
    <span class="material-symbols-rounded" @click="searchClickACB(searchString)"
        >search</span
      >
      <input
        id="searchBar"
        type="text"
        v-model="searchString"
        placeholder="Search for a movie, series, genre..."
        name="inputSearchBar"
        @focus="onInputFocus"
        @blur="onInputBlur"
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
  mounted() {
    // get query string from url
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get('q');
    if (q) {
      this.searchString = q;
    }
    // get element with id searchBar and set it's input value to this.searchString
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
      searchBar.setAttribute("value", this.searchString);
    }
    
  },
  methods: {
    goToSearchResultsPage() {
      this.$router.push({
        name: "SearchResults",
        query: { q: this.searchString },
      });
    },
    async searchClickACB(searchQuery: string) {
      if (this.typingTimeout) {
        clearTimeout(this.typingTimeout);
      }
      if (!searchQuery) {
        this.searchString = "";
        return;
      }
      console.log(`Searching: ${searchQuery}`);
      // this.$emit('searchClickACB', searchQuery);
      model.setSearchString(searchQuery);
      this.goToSearchResultsPage();
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
      }, 250);
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
