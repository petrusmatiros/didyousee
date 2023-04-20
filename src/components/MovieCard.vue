<template>
  <div class="content-card flex-col" @click="handleClickACB">
    <div class="loading-skeleton content-poster" v-if="!imagePath"></div>
    <img
      :src="imagePath"
      loading="lazy"
      decoding="async"
      fetchpriority="low"
      v-else
      class="content-poster"
    />
    <h2 class="flex-row">{{ movie.title }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";
import {PosterSize} from '../types/types';

export default defineComponent({
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imagePath():any {
      return this.movie.poster_path ? `https://image.tmdb.org/t/p/${PosterSize.W342}/${this.movie.poster_path}` : "/src/assets/no-poster.svg";
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
        name: "Content",
        query: { id: JSON.stringify(this.movie.id) },
      });
    },
  },
});
</script>
