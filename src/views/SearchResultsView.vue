<script setup lang="ts">
import './../style.css';
import MediaCard from '../components/MediaCard.vue';

</script>

<template>
  <!-- <button @click="searchClickACB()">X</button> -->
  <div class="search-results flex-col flex-center">
    <div class="trending-list flex-row flex-center">
      <div v-if="$props.model.movies.length > 0">
        <h1>Movies</h1>
      </div>
      <div class="trending-list flex-row flex-center">
        <MediaCard v-for="(movie, index) in $props.model.movies" :key="index" :media="movie" :media-type="'movie'" />
      </div>
      <div v-if="$props.model.series.length > 0">
        <h1>Series</h1>
      </div>
      <div class="trending-list flex-row flex-center">
        <MediaCard v-for="(series, index) in $props.model.series" :key="index" :media="series" :media-type="'tv'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResultsView',
  components: {
    MediaCard,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
});
</script>
