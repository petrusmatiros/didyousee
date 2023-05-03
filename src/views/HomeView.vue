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

    <div v-if="$props.model.homeContent.trendingMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Trending Movies</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Trending Movies">
        <SplideSlide v-for="(movie, index) in $props.model.homeContent.trendingMovies" :key="index">
          <MediaCard :media="movie" :media-type="'movie'" />
        </SplideSlide>
      </Splide>
    </div>

    <div v-if="$props.model.homeContent.trendingSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Trending Series</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Trending Series">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.trendingSeries" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

    <div v-if="$props.model.homeContent.popularMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Popular Movies</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Popular Movies">
        <SplideSlide v-for="(movie, index) in $props.model.homeContent.popularMovies" :key="index">
          <MediaCard :media="movie" :media-type="'movie'" />
        </SplideSlide>
      </Splide>
    </div>

    <div v-if="$props.model.homeContent.popularSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Popular Series</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Popular Series">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.popularSeries" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

    <div v-if="$props.model.homeContent.topRatedMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Top Rated Movies</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Top Rated Movies">
        <SplideSlide v-for="(movie, index) in $props.model.homeContent.topRatedMovies" :key="index">
          <MediaCard :media="movie" :media-type="'movie'" />
        </SplideSlide>
      </Splide>
    </div>

    <div v-if="$props.model.homeContent.topRatedSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Top Rated Series</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Top Rated Series">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.topRatedSeries" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

    <div v-if="$props.model.homeContent.upcomingMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Upcoming Movies</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Upcoming Movies">
        <SplideSlide v-for="(movie, index) in $props.model.homeContent.upcomingMovies" :key="index">
          <MediaCard :media="movie" :media-type="'movie'" />
        </SplideSlide>
      </Splide>
    </div>

    <!-- TODO! ÄR INTE DENNA SAMMA SOM POPULAR SERIES? -->
    <div v-if="$props.model.homeContent.onTheAirSeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>On The Air Series</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="On The Air Series">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.onTheAirSeries" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

    <div v-if="$props.model.homeContent.nowPlayingMovies.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Now Playing Movies</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Now Playing Movies">
        <SplideSlide v-for="(movie, index) in $props.model.homeContent.nowPlayingMovies" :key="index">
          <MediaCard :media="movie" :media-type="'movie'" />
        </SplideSlide>
      </Splide>
    </div>

    <!-- TODO! ÄR INTE DENNA OCKSÅ SAMMA SOM POPULAR SERIES? -->    
    <div v-if="$props.model.homeContent.airingTodaySeries.length > 0" class="carousel flex-col flex-center-start">
      <div class="carousel-title">
        <h1>Airing Today Series</h1>
      </div>
      <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Airing Today Series">
        <SplideSlide v-for="(series, index) in $props.model.homeContent.airingTodaySeries" :key="index">
          <MediaCard :media="series" :media-type="'tv'" />
        </SplideSlide>
      </Splide>
    </div>

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