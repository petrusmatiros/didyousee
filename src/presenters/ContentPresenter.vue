<script lang="ts">
import { defineComponent } from "vue";
import ContentView from "../views/ContentView.vue";
import { useRouter, useRoute } from "vue-router";
import { MediaType } from "../types/types";
import { auth } from "../firebaseConfig";
import { addMovie, getUserData } from "../model/model";

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
    "$route.params": {
      handler() {
        this.updateDataACB();
      },
      immediate: false,
    },
  },
  setup(props: any) {
    const router = useRouter();
    const route = useRoute();
    // Typescript is not smart enough to realise that the check in the if is enough to avoid undefined.
    // So we replace undefined with "" and check for "" explicitly
    const userID = auth.currentUser?.uid || "";
    const mediaID_raw = route.query.id;
    const mediaType_raw = route.query.type;
    const mediaID = JSON.parse(mediaID_raw as string);
    const mediaType = JSON.parse(mediaType_raw as string);


    // if (!mediaID_raw || userID === "") {
    //   router.push("404");
    //   throw new Error("404: Movie ID not found");
    // } else {
    //   const mediaID = JSON.parse(mediaID_raw as string);
    //   const mediaType = JSON.parse(mediaType_raw as string);

    // }

    async function updateDataACB() {

      const id = route.query.id;
      const type = route.query.type;
      if (id && type) {
        props.model.resetCurrentContent();
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

    function addToList(list: string) {
      console.log("list:", list)
      addMovie(userID, list, mediaID);
    }

    function goToReviewPageACB() {
      console.log("Reviews page!");
      router.push({
        name: "Reviews",
      });
    }

    function goToCastPageACB() {
      console.log("Cast page!");
      router.push({
        name: "Cast",
      });
    }

    function handleLikedACB() {
      // Handle click event for the "liked" button
      console.log("Liked button clicked");
      // Add your custom logic here
      addToList("liked");
    }

    function handleWatchlistACB() {
      // Handle click event for the "watchlist" button
      console.log("Watchlist button clicked");
      // Add your custom logic here
      addToList("watch");
    }

    function handleSeenACB() {
      // Handle click event for the "seen" button
      console.log("Seen button clicked");
      // Add your custom logic here
      addToList("seen");
    }

    function handleDislikedACB() {
      // Handle click event for the "disliked" button
      console.log("Disliked button clicked");
      // Add your custom logic here
      addToList("disliked");
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
