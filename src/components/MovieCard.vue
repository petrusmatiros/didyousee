<template>
  <div class="movie-card" @click="handleClickACB">
    <img :src="movie.img_path" alt="Movie Poster" class="movie-poster">
    <h2 class="flex-row">{{ movie.title }}</h2>
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
    handleClickACB() {
      // Handle click event for the movie card
      console.log("Clicked movie:", this.movie);
      // Navigate to the result page with movie information as a parameter
      this.$router.push({ name: 'Result', query: { id: JSON.stringify(this.movie.title) } });
    }
  }
  });
</script>
