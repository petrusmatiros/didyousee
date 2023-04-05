<template>
    <div class="movie-card">
      <img :src="movie.poster" alt="Movie Poster" class="movie-poster">
      <h2 class="content-title">{{ movie.title }}</h2>
    </div>
  </template>
  
  <script lang="ts">
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
  
  <style>
  body {
    margin: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    color: hsl(0, 0%, 100%);
    background-color: hsl(0, 0%, 20%);
  }
  .movie-list {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
    gap:1rem;
  }

  .movie-card {
    width: 300px;
    border-radius: 0.4rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    background-color: hsl(0, 0%, 12%);
    padding: 1rem;
  }
  
  .movie-card h2 {
    font-size:1.5rem;
    font-weight:700;
    text-align: center;
    color: hsl(0, 0%, 100%);
    vertical-align: middle;
  }
  
  .movie-poster {
    width: 100%;
    border-radius: 0.4rem;
    margin-bottom: 10px;
  }
  </style>