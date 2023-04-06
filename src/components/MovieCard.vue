<template>
    <div class="movie-card" @click="handleClick">
      <img :src="movie.poster" alt="Movie Poster" class="movie-poster">
      <h2 class="content-title">{{ movie.title }}</h2>
    </div>
  </template>
  
  <script lang="ts">
  import './../style.css'
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    props: {
      movie: {
        type: Object,
        required: true
      }
    },
    methods: {
    handleClick() {
      // Handle click event for the movie card
      console.log("Clicked movie:", this.movie);
    }
  }
  });
  </script>