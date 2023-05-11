<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  reactive,
  onMounted,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";

import SearchResultsView from "../views/SearchResultsView.vue";
import { model } from "../model/model";
import { SearchCategory, SortBy } from "../types/types";

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
    // Go back to home if there is no search string
    const router = useRouter();
    if (props.model.searchString === "" || !props.model.searchString) {
      router.push({
        name: "Home",
      });
    }

    function searchACB() {
      if (props.model.getSearchString()) {
        props.model.resetSearchContent();
        if (props.model.getSearchCategory() === SearchCategory.TITLE) {
          try {
            props.model.fetchContent();
          } catch (error) {}
        } else if (props.model.getSearchCategory() === SearchCategory.GENRE) {
          try {
            props.model.fetchGenreContent();
          } catch (error) {}
        }
      }
    }
    function checkForNextPage() {
      // const { isPageLoaded = ;
      if (!props.model.getIsPageLoading()) {
        console.log(
          "NEXT PAGE (x/x)",
          props.model.getPage(),
          props.model.total_pages
        );
        if (
          props.model.result_status.current === "fulfilled" &&
          props.model.getPage() < props.model.total_pages
        ) {
          // TODO! Total Pages for Series / Movies
          props.model.incrementPage();
          if (props.model.getSearchCategory() === SearchCategory.TITLE) {
            props.model.fetchContent();
          } else if (props.model.getSearchCategory() === SearchCategory.GENRE) {
            props.model.fetchGenreContent();
          }
          props.model.setIsPageLoading(false);
        }
      }
    }
    function onSortChangeACB(sortType: SortBy) {
      console.log("newSortBy", sortType)
      props.model.sortBy = sortType;
      onRefreshACB();
    }
    function onRefreshACB() {
      searchACB();
    }

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
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

    onMounted(() => {
      searchACB();
      props.model.addObserver(searchACB);
      addScrollListener();
    });

    onUnmounted(() => {
      props.model.removeObserver(searchACB);
      removeScrollListener();
    });


    return {
      searchACB,
      onSortChangeACB,
      onRefreshACB,
    };
  },
});
</script>
<template>
  <SearchResultsView :model="model" @onSortChange="onSortChangeACB" @onRefresh="onRefreshACB"/>
</template>
