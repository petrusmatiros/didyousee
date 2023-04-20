<script setup lang="ts">
import './../style.css';
import { defineEmits, mergeProps } from 'vue';
import MediaCard from '../components/MediaCard.vue';

const emit = defineEmits(["searchClick"])

function searchClickACB() { emit("searchClick") }

</script>

<template>
  <div class="homepage flex-col flex-center">
  <div class="intro-container flex-col flex-center">
    <img src="../assets/didyousee.svg" alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
      decoding="async" fetchpriority="high" />
    <h1>Did You See</h1>
      <p :class="triviaClass">{{ $props.model.trivia }}</p>
    </div>
    <!-- <div class="overlay"></div> -->
    <!-- <div class="popup">
            <div class="popup-close"><span class="material-symbols-rounded">close</span></div>
            <h1>Seasons:</h1>
            <p>Season 1</p>
            <p>Season 2</p>
            <p>Season 3</p>
            <p>Season 4</p>
          </div> -->
    <div>
      <h1>Movies</h1>
    </div>
    <div class="trending-list flex-row flex-center">
      <MediaCard v-for="(movie, index) in $props.model.movies" :key="index" :media="movie" :media-type="'movie'"/>
    </div>
    <div>
      <h1>Series</h1>
    </div>
    <div class="trending-list flex-row flex-center">
      <MediaCard v-for="(series, index) in $props.model.series" :key="index" :media="series" :media-type="'tv'"/>
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
