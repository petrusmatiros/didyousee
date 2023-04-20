<script lang="ts">
import { defineComponent } from 'vue'
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
    searchACB();
    function searchACB() {
      props.model.fetchMovies();
    }
    props.model.addObserver(searchACB);
    return {
      searchACB,
    };
  },
});
</script>
<template>
  <SearchResultsView :movies="model.movies" @searchClick="searchACB" />
</template>