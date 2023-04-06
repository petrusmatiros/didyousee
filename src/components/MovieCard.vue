<template>
    <div class="movie-card">
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
    }
  });
  </script>