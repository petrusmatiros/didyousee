<template>
  <div class="movie-card" @click="handleClickACB">
    <img
      :src="imagePath"
      loading="lazy"
      decoding="async"
      fetchpriority="low"
      class="movie-poster loading-skeleton"
    />
    <h2 class="flex-row">{{ movie.title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";

export default defineComponent({
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imagePath():any {
      if (this.movie.poster_path) {
        return `https://image.tmdb.org/t/p/w342/${this.movie.poster_path}`;
      } else {
        return "/src/assets/dummy.svg";
      }
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleClickACB() {
      // Handle click event for the movie card
      console.log("Clicked movie:", this.movie);
      // Navigate to the result page with movie information as a parameter
      // window.location.href = `/result?id=${JSON.stringify(this.movie.id)}`;
      this.$router.push({
        name: "Result",
        query: { id: JSON.stringify(this.movie.id) },
      });
    },
  },
});
</script>
