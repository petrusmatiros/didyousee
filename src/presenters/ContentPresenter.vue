<script lang="ts">
import { defineComponent } from "vue";
import ContentView from "../views/ContentView.vue";
import { useRouter, useRoute } from "vue-router";
import { MediaType } from "../types/types";

export default defineComponent({
  name: "ContentPresenter",
  components: {
    ContentView,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  watch: {
    // watch for changes in the route params
    '$route.params': {
      handler() {
        this.updateDataACB();
      },
      immediate: false
    }
  },
  setup(props: any) {
    const router = useRouter();
    const route = useRoute();

    async function updateDataACB() {
      props.model.resetCurrentContent();
      const id = route.query.id;
      const type = route.query.type;
      if (id) {
        const mediaID = JSON.parse(id as string);
        const mediaType = JSON.parse(type as string);
        props.model.setSearchID(mediaID);

        if (mediaType === MediaType.MOVIE) {
          try {
            await props.model.fetchSingleMovie();
            await props.model.fetchContentVideosMovie();
            await props.model.fetchContentReviewsMovie();
            await props.model.fetchContentCreditsMovie();
            await props.model.fetchContentRecommendedMovie();
            await props.model.fetchContentSimilarMovie();
            await props.model.fetchContentWatchProviders(MediaType.MOVIE);
            console.log("currentMovie:", props.model.currentMovie);
          } catch (e) {
            goPageNotFoundACB();
          }
        } else if (mediaType === MediaType.SERIES) {
          try {
            await props.model.fetchSingleSeries();
            await props.model.fetchContentVideosSeries();
            await props.model.fetchContentReviewsSeries();
            await props.model.fetchContentCreditsSeries();
            await props.model.fetchContentRecommendedSeries();
            await props.model.fetchContentSimilarSeries();
            await props.model.fetchContentWatchProviders(MediaType.SERIES);
            console.log("currentSeries:", props.model.currentSeries);
          } catch (e) {
            goPageNotFoundACB();
          }
        }
      }
    }
    updateDataACB();
    // props.model.addObserver(updateDataACB);

    function goToReviewPageACB(){
        console.log("Reviews page!");
          router.push({
            name: "Reviews",
      });
    }

    function goToCastPageACB(){
        console.log("Cast page!");
          router.push({
            name: "Cast",
      });
    }

    function handleLikedACB() {
      // Handle click event for the "liked" button
      console.log("Liked button clicked");
      // Add your custom logic here
    }
    function handleWatchlistACB() {
      // Handle click event for the "watchlist" button
      console.log("Watchlist button clicked");
      // Add your custom logic here
    }
    function handleSeenACB() {
      // Handle click event for the "seen" button
      console.log("Seen button clicked");
      // Add your custom logic here
    }
    function handleDislikedACB() {
      // Handle click event for the "disliked" button
      console.log("Disliked button clicked");
      // Add your custom logic here
    }
    function goBackACB() {
      if (props.model.getSearchString() !== "") {
        router.push({
          name: "SearchResults",
        });
      } else {
        router.push({
          name: "Home",
        });
      }
    }
    function goPageNotFoundACB() {
      router.push({
        name: "PageNotFound",
      });
    }
    return {
      updateDataACB,
      handleLikedACB,
      handleWatchlistACB,
      handleSeenACB,
      handleDislikedACB,
      goBackACB,
      goPageNotFoundACB,
      goToReviewPageACB,
      goToCastPageACB,
    };
  },
});
</script>
<template>
  <ContentView
    :model="model"
    @handleLiked="handleLikedACB"
    @handleWatchlist="handleWatchlistACB"
    @handleSeen="handleSeenACB"
    @handleDisliked="handleDislikedACB"
    @goBack="goBackACB"
    @goToReviewPage="goToReviewPageACB"
    @goToCastPage="goToCastPageACB"
  />
</template>
