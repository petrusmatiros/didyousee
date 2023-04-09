<template>
  <div class="homepage flex-col flex-center">
    <div class="intro-container flex-col flex-center">
      <img src="../assets/didyousee.svg" alt="didyousee logo. an owl holding a binocular, looking for the next movie/series" decoding="sync" fetchpriority="high"/>
      <h1>did you see...?</h1>
      <p>{{ trivia }}</p>
    </div>
    <div class="searchBar flex-row flex-center" :class="{ 'searchBar--focused': inputFocused }">
      <i class="material-symbols-outlined" @click="searchClickACB">search</i>
      <input type="text" placeholder="Search for a movie" name="inputSearchBar" @focus="onInputFocus" @blur="onInputBlur">
      <i class="material-symbols-outlined" @click="filterClickACB">filter_alt</i>
    </div>
    <div class="movie-list flex-row">
      <movie-card v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './../style.css'
import MovieCard from '../components/MovieCard.vue'
import model from "../model/model"

export default defineComponent({
  components: {
    MovieCard
  },
  methods: {
    searchClickACB() {
      console.log("Clicked search!");
      console.log(model);
    },
    filterClickACB() {
      console.log("Clicked filter!");
      console.log(model.searchMovie(new URLSearchParams({"query": "Matrix"})));
    },
    onInputFocus() {
      this.inputFocused = true;
      const searchBar = document.querySelector('.searchBar');
      if (searchBar) {
        searchBar.classList.add('searchBar--focused');
      }
    },
    onInputBlur() {
      this.inputFocused = false; // set the inputFocused flag to false
      const searchBar = document.querySelector('.searchBar');
      if (searchBar) {
        searchBar.classList.remove('searchBar--focused');
      }
    }
  },
  data() {
    return {
      inputFocused: false,
      trivia: "Did you know: In 2012, The Matrix was selected by the U.S. Library of Congress for preservation in the National Film Registry archives for being culturally historically or aesthetically significant",
      movies: [
        {
          title: "Avengers: Endgame",
          poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9"
        },
        {
          title: "Black Panther",
          poster: "https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg?region=0%2C0%2C540%2C810"
        },
        {
          title: "Black Panther",
          poster: "https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg?region=0%2C0%2C540%2C810"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Black Panther",
          poster: "https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg?region=0%2C0%2C540%2C810"
        },
        {
          title: "Avengers: Endgame",
          poster: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9"
        },
        {
          title: "Black Panther",
          poster: "https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg?region=0%2C0%2C540%2C810"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
        {
          title: "Joker",
          poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuTcvL4wc0fbBjm1h5CRiFEZ2TnNKtu8KtoPSxTsj6mkedHeWl"
        },
      ]
    };
  }
});
</script>
