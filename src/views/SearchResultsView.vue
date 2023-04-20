<script setup lang="ts">
import './../style.css';
import { defineEmits } from 'vue';
import MovieCard from '../components/MovieCard.vue';
import { Movie } from '../types/types';

const emit = defineEmits(["searchClick"])

function searchClickACB() {emit("searchClick")}

</script>

<template>
  <!-- <button @click="searchClickACB()">X</button> -->
  <div class="search-results flex-col flex-center">
    <div class="trending-list flex-row flex-center">
      <MovieCard v-for="(movie, index) in movies" :key="index" v-if="movies" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResultsView',
  components: {
    MovieCard,
  },
  props: {
    movies: Array as () => Movie[],
  },
});
</script>
