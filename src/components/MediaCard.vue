<template>
  <div v-if="mediaType !== undefined" class="content-card gap-half flex-col" @click="handleClickACB">
    <div class="loading-skeleton content-poster" v-if="!imagePath"></div>
    <img :src="imagePath" loading="lazy" decoding="async" fetchpriority="low" v-else class="content-poster" />
    <div class="flex-col flex-center gap-half p-small">
      <h2 class="flex-row">{{ media.title || media.name }}</h2>
      <div class="flex-row flex-center gap-half">
        <button class="content-card-button button">{{ capitalizedMediaType
        }}</button>
        <button v-if="media.release_date || media.first_air_date" class="content-card-button button">{{ (media.release_date || media.first_air_date)?.split('-')[0]
        }}</button>

        <button v-if="parseFloat(media.vote_average.toFixed(1)) > 0" class="content-card-button button">{{ parseFloat(media.vote_average.toFixed(1)) }}/10</button>
      </div>
    </div>
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
      required: false,
      validator: (value: string) => {
        return [MediaType.SERIES.toString(), MediaType.MOVIE.toString(), undefined].includes(value)
      }
    },
  },
  computed: {
    imagePath(): any {
      return this.media.poster_path ? `https://image.tmdb.org/t/p/${PosterSize.W342}/${this.media.poster_path}` : "/src/assets/no-poster.svg";
    },
    capitalizedMediaType(): string | undefined {
      if (this.mediaType === MediaType.MOVIE.toString()) {
        return "Movie";
      } else if (this.mediaType === MediaType.SERIES.toString()) {
        return "Series";
      } else {
        return this.mediaType;
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
      console.log("Clicked media:", this.media);
      console.log("Seasons:", this.media.last_episode_to_air);
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
