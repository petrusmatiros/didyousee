<script setup lang="ts">
import './../style.css';
import CarouselMedia from '../components/CarouselMedia.vue';
</script>

<template>
  <div class="homepage gap-double flex-col flex-center">
    <div class="intro-container flex-col flex-center">
      <img src="../assets/didyousee.svg" alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
      onerror="this.src='/src/assets/no-content.svg';"
        decoding="async" fetchpriority="high" />
      <h1>Did You See</h1>
      <p :class="triviaClass">{{ $props.model.trivia }} </p>
    </div>

    <div v-if="$props.model.homeContent.trendingMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Trending Movies</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.trendingMovies" :media-type="'movie'" :label="'Trending Movies'"></CarouselMedia>
    </div>

    <div v-if="$props.model.homeContent.trendingSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Trending Series</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.trendingSeries" :media-type="'tv'" :label="'Trending Series'"></CarouselMedia>
    </div>

    <div v-if="$props.model.homeContent.popularMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Popular Movies</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.popularMovies" :media-type="'movie'" :label="'Popular Movies'"></CarouselMedia>
    </div>

    <div v-if="$props.model.homeContent.popularSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Popular Series</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.popularSeries" :media-type="'tv'" :label="'Popular Series'"></CarouselMedia>
    </div>

    <div v-if="$props.model.homeContent.topRatedMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Top Rated Movies</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.topRatedMovies" :media-type="'movie'" :label="'Top Rated Movies'"></CarouselMedia>
    </div>

    <div v-if="$props.model.homeContent.topRatedSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Top Rated Series</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.topRatedSeries" :media-type="'tv'" :label="'Top Rated Series'"></CarouselMedia>
    </div>

    <div v-if="$props.model.homeContent.upcomingMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Upcoming Movies</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.upcomingMovies" :media-type="'movie'" :label="'Upcoming Movies'"></CarouselMedia>
    </div>

    <!-- TODO! ÄR INTE DENNA SAMMA SOM POPULAR SERIES? -->
    <div v-if="$props.model.homeContent.onTheAirSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>On The Air Series</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.onTheAirSeries" :media-type="'tv'" :label="'On The Air Series'"></CarouselMedia>
    </div>

    <div v-if="$props.model.homeContent.nowPlayingMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Now Playing Movies</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.nowPlayingMovies" :media-type="'movie'" :label="'Now Playing Movies'"></CarouselMedia>
    </div>

    <!-- TODO! ÄR INTE DENNA OCKSÅ SAMMA SOM POPULAR SERIES? -->    
    <div v-if="$props.model.homeContent.airingTodaySeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Airing Today Series</h1>
      </div>
      <CarouselMedia :media="$props.model.homeContent.airingTodaySeries" :media-type="'tv'" :label="'Airing Today Series'"></CarouselMedia>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    CarouselMedia,
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