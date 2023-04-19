<script lang="ts">
import { MediaType } from "../types/types";
import { defineComponent } from 'vue'
import Vue from 'vue'; // add this line
import SearchResultsView from "../views/SearchResultsView.vue";

export default defineComponent({
  name: "SearchResultsPresenter",
  components: {
    SearchResultsView,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    // props.model.fetchMovies();
    function searchACB() {
      props.model.fetchMovies(); 
    }
    return {
      searchACB,
    };
  },
});
</script>
<template>
  <SearchResultsView
    :movies="model.movies"
    :searchString="model.searchString"
    @searchClick="searchACB"
  />
</template>