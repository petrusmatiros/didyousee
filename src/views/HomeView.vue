<script setup lang="ts">
import './../style.css';
import { defineEmits, mergeProps } from 'vue';
import MediaCard from '../components/MediaCard.vue';

const emit = defineEmits(["searchClick"])

function searchClickACB() { emit("searchClick") }

</script>

<template>
  <div class="homepage gap-full flex-col flex-center">
  <div class="intro-container flex-col flex-center">
    <img src="../assets/didyousee.svg" alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
      decoding="async" fetchpriority="high" />
    <h1>Did You See</h1>
      <p :class="triviaClass">{{ $props.model.trivia }}</p>
    </div>
    <div>
      <h1>Movies</h1>
    </div>
    <div class="trending-list gap-full flex-row flex-center">
      <MediaCard v-for="(movie, index) in $props.model.movies" :key="index" :media="movie" :media-type="'movie'"/>
    </div>
    <div>
      <h1>Series</h1>
    </div>
    <div class="trending-list gap-full flex-row flex-center">
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
