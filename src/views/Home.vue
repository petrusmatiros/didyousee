<template>
  <div class="homepage">
    <div class="intro-container">
      <h1>did you see...?</h1>
      <p>{{ trivia }}</p>
    </div>
    <div class="search-bar">
      <i class="material-symbols-outlined" @click="searchClickACB">search</i>
      <input type="text" placeholder="Search" name="searchBar">
      <i class="material-symbols-outlined" @click="filterClickACB">filter_alt</i>
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
  methods: {
    searchClickACB() {
      console.log("Clicked search!");
    },
    filterClickACB() {
      console.log("Clicked filter!");
    }
  },
  data() {
    return {
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
