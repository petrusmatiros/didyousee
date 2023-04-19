<template>
  <div class="homepage flex-col flex-center">
    <div class="intro-container flex-col flex-center">
      <img
        src="../assets/didyousee.svg"
        alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
        decoding="async"
        fetchpriority="high"
      />
      <h1>Did  You See</h1>
      <p :class="triviaClass">{{ trivia }}</p>
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
  randomTrivia,
  searchMedia,
  getTrending,
  getMedia,
  getSimilarMedia,
} from "../model/model";
import {TriviaCategory, MediaType} from '../types/types';
import {random} from '../utils/utils'

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
  computed: {
    triviaClass() {
      return this.trivia ? 'trivia-container flex-col flex-center' : 'trivia-container flex-col flex-center loading-skeleton';
    }
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
    let r = random(0, 1)
    let category:TriviaCategory = r === 0 ? TriviaCategory.MOVIE : TriviaCategory.SERIES;
    randomTrivia(category).then((data:any) => {
      this.trivia = data;
    }).catch((error:any) => {
      console.log(error);
    });
    this.getTrendingMedia();
  },
  methods: {
    async getTrendingMedia() {
      let page = 1;
      const movie: any | undefined = await getTrending(
        MediaType.MOVIE,
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
      trivia: "",
      movies: [],
    };
  },
});
</script>