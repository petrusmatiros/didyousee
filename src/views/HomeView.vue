<script setup lang="ts">
import './../style.css';
import MediaCard from '../components/MediaCard.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

</script>

<template>
  <div class="homepage gap-full flex-col flex-center">
    <div class="intro-container flex-col flex-center">
      <img src="../assets/didyousee.svg" alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
        decoding="async" fetchpriority="high" />
      <h1>Did You See</h1>
      <p :class="triviaClass">{{ $props.model.trivia }} </p>
    </div>

    <div class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Trending Movies</h1>
      </div>
      <Splide v-if="$props.model.homeContent.trendingMovies.length > 0" data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Trending Movies">
        <SplideSlide v-for="(movie, index) in $props.model.homeContent.trendingMovies" :key="index">
          <MediaCard :media="movie" :media-type="'movie'" />
        </SplideSlide>
      </Splide>
    </div>

    <div class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Trending Series</h1>
      </div>
      <Splide v-if="$props.model.homeContent.trendingSeries.length > 0" data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Trending Series">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.trendingSeries" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

    <div class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Popular Movies</h1>
      </div>
      <Splide v-if="$props.model.homeContent.popularMovies.length > 0" data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Popular Movies">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.popularMovies" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

    <div class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Popular Series</h1>
      </div>
      <Splide v-if="$props.model.homeContent.popularSeries.length > 0" data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Popular Series">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.popularSeries" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

    <!-- To Do -->

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    MediaCard,
  },
  computed: {
    triviaClass(): string {
      return this.model.trivia ? 'trivia-container flex-col flex-center' : 'trivia-container flex-col flex-center loading-skeleton';
    }
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
});
</script>