<template>
  <div class="homepage">
    <h1>did you see...?</h1>
    <p>{{ quote }}</p>
    <div class="search-bar">
      <input type="text" placeholder="Search">
      <button class="dropbtn">Filter</button>
      <div class="dropdown-content">
        <a href="#">Action</a>
        <a href="#">Comedy</a>
        <a href="#">Drama</a>
      </div>
    </div>
    <div class="movie-list">
      <movie-card v-for="(movie, index) in movies" :key="index" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './../style.css'
import MovieCard from '../components/MovieCard.vue'

export default defineComponent({
  components: {
    MovieCard
  },
  data() {
    return {
      quote: "Did you know: In 2012, The Matrix was selected by the U.S. Library of Congress for preservation in the National Film Registry archives for being culturally historically or aesthetically significant",
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
        }
      ]
    };
  }
});
</script>
