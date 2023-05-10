<script lang="ts">
import { defineComponent, ref } from "vue";
import ContentView from "../views/ContentView.vue";
import { useRouter, useRoute } from "vue-router";
import { MediaType, ListType } from "../types/types";
import { auth } from "../firebaseConfig";
import { addContentToList, removeContentFromList, toggleContentToList, getUserData } from "../model/model";

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
  computed: {
    UserID(): string {
      return auth.currentUser?.uid || "";
    }
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


        checkIfAdded();

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

    // function addToList(list: string) {
      
    //   console.log("list:", list)
    //   addContentToList(userID, list, mediaID, mediaType);
    // }

    // function removeFromList(list: string) {
    //   removeContentFromList(userID, list, mediaID, mediaType);
    // }

    async function checkIfAdded() {
      await props.model.fetchPersistance(userID);
      const state = props.model.state;
      const likeButton = document.getElementById(ListType.LIKED.toString()) as HTMLElement;
      const watchlistButton = document.getElementById(ListType.WATCH.toString()) as HTMLElement;
      const seenButton = document.getElementById(ListType.SEEN.toString()) as HTMLElement;
      const dislikeButton = document.getElementById(ListType.DISLIKED.toString()) as HTMLElement;
      let addedLike = false;
      let addedWatch = false;
      let addedSeen = false;
      let addedDisliked = false;
      state.liked?.forEach((element:any) => {
        if (element.mediaID === mediaID && element.mediaType === mediaType) {
          addedLike = true;
        }
      });
      state.watch?.forEach((element:any) => {
        if (element.mediaID === mediaID && element.mediaType === mediaType) {
          addedWatch = true;
        }
      });
      state.seen?.forEach((element:any) => {
        if (element.mediaID === mediaID && element.mediaType === mediaType) {
          addedSeen = true;
        }
      });
      state.disliked?.forEach((element:any) => {
        if (element.mediaID === mediaID && element.mediaType === mediaType) {
          addedDisliked = true;
        }
      });
      if (addedLike) {
        props.model.currentState.liked = true;
      } else {
        props.model.currentState.liked = false;
      }

      if (addedWatch) {
        props.model.currentState.watch = true;
      } else {
        props.model.currentState.watch = false;
      }

      if (addedSeen) {
        props.model.currentState.seen = true;
      } else {
        props.model.currentState.seen = false;
      }

      if (addedDisliked) {
        props.model.currentState.disliked = true;
      } else {
        props.model.currentState.disliked = false;
      }
    }

    function toggleContent(list: string) {
      toggleContentToList(userID, list, mediaID, mediaType);
      checkIfAdded();
    }

    function goToReviewPageACB() {
      router.push({
        name: "Reviews",
      });
    }

    function goToCastPageACB() {
      router.push({
        name: "Cast",
      });
    }

    function handleLikedACB() {
      // Handle click event for the "liked" button
      // Add your custom logic here
      toggleContent(ListType.LIKED.toString());
    }

    function handleWatchlistACB() {
      // Handle click event for the "watchlist" button
      // Add your custom logic here
      toggleContent(ListType.WATCH.toString());
    }

    function handleSeenACB() {
      // Handle click event for the "seen" button
      // Add your custom logic here
      toggleContent(ListType.SEEN.toString());
      
    }

    function handleDislikedACB() {
      // Handle click event for the "disliked" button
      // Add your custom logic here
      toggleContent(ListType.DISLIKED.toString());
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
