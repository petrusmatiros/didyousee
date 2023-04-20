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
      props.model.resetMovies();
      props.model.fetchMovies();
      props.model.fetchSeries();
    }
    props.model.addObserver(searchACB);
    return {
      searchACB,
    };
  },
});
</script>
<template>
  <SearchResultsView :model="model" @searchClick="searchACB" />
</template>