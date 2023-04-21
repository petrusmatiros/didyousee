<script lang="ts">
import { defineComponent, onBeforeUnmount } from 'vue'
import SearchResultsView from "../views/SearchResultsView.vue";
import { model } from '../model/model';
import { SearchCategory } from "../types/types";

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

    function searchACB() {
      if (props.model.getSearchString()) {
        props.model.resetSearchContent();
        if (props.model.getSearchCategory() == SearchCategory.TITLE) {
          props.model.fetchContent();
        }
        else if (props.model.getSearchCategory() == SearchCategory.GENRE) {
          props.model.fetchGenreContent();
        }
      }
    }
    function checkForNextPage() {
      //TODO: Total Pages for Series / Movies
      console.log("IncrementPage")
      props.model.incrementPage();
      if (props.model.getSearchCategory() == SearchCategory.TITLE) {
        props.model.fetchContent();
      }
      else if (props.model.getSearchCategory()== SearchCategory.GENRE) {
        props.model.fetchGenreContent();
      }

    }
    searchACB();
    props.model.addObserver(searchACB);

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        checkForNextPage();
      }
    };

    const addScrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    };

    const removeScrollListener = () => {
      window.removeEventListener("scroll", handleScroll);
    };

    onBeforeUnmount(() => {
      removeScrollListener();
    });

    addScrollListener();

    return {
      searchACB,
    };
  },
});
</script>
<template>
  <SearchResultsView :model="model" />
</template>