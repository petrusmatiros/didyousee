<template>
  <div class="content-card flex-col" @click="handleClickACB">
    <div class="loading-skeleton content-poster" v-if="!imagePath"></div>
    <img :src="imagePath" loading="lazy" decoding="async" fetchpriority="low" v-else class="content-poster" />
    <h2 class="flex-row">{{ media.title || media.name }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";
import { PosterSize, MediaType } from '../types/types';

export default defineComponent({
  props: {
    media: {
      type: Object,
      required: true,
    },
    mediaType: {
      type: String,
      required: true,
      validator: (value: string) => {
      return [MediaType.SERIES.toString(), MediaType.MOVIE.toString()].includes(value)
    }
    },
  },
  computed: {
    imagePath(): any {
      return this.media.poster_path ? `https://image.tmdb.org/t/p/${PosterSize.W342}/${this.media.poster_path}` : "/src/assets/no-poster.svg";
    },
  },
  data() {
    return {
    };
  },
  methods: {
    handleClickACB() {
      // Handle click event for the movie card
      console.log("Clicked media:", this.media);
      // Navigate to the result page with movie information as a parameter
      // window.location.href = `/result?id=${JSON.stringify(this.movie.id)}`;
      this.$router.push({
        name: "Content",
        query: { type: JSON.stringify(this.mediaType), id: JSON.stringify(this.media.id) },
      });
    },
  },
});
</script>
