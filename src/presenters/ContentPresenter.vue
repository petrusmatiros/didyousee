<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ContentView from "../views/ContentView.vue";
import { useRouter, useRoute } from "vue-router";
import { MediaType, ListType } from "../types/types";
import { auth } from "../firebaseConfig";
import {
  addContentToList,
  removeContentFromList,
  toggleContentToList,
  getUserData,
} from "../model/model";

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
    
  },
  setup(props: any) {
    const router = useRouter();
    const route = useRoute();
    let userID = "";
    onMounted(async function () {
      console.log("onMounted");
      userID = await getUid();
      updateDataACB();
    });

    function getMediaID() {
      console.log("getMediaID");
      const mediaID_raw = route.query.id;
      try {
        return JSON.parse(mediaID_raw as string);
      } catch (e) {
        goPageNotFoundACB();
      }
    }
    function getMediaType() {
      console.log("getMediaType");
      const mediaType_raw = route.query.type;
      try {
        if (mediaType_raw === '"movie"' || mediaType_raw === '"tv"') {
          return JSON.parse(mediaType_raw as string);
        } else {
          goPageNotFoundACB();
        }
      } catch (e) {
        goPageNotFoundACB();
      }
    }

    async function getUid() {
      console.log("Fetching USERID")
      let uid = await auth.currentUser?.uid;
      return uid || "";
    }

    async function updateDataACB() {
      const mediaID_raw = route.query.id;
      const mediaType_raw = route.query.type;

      if (mediaID_raw && mediaType_raw) {
        const mediaID = getMediaID();
        const mediaType = getMediaType();
        props.model.resetCurrentContent();
        props.model.setSearchID(mediaID);

        checkIfAdded();

        if (mediaType === MediaType.MOVIE) {
          try {
            try {
              await props.model.fetchSingleMovie();
            } catch (e) {
              goPageNotFoundACB();
            }
            await props.model.fetchSingleMovie();
            await props.model.fetchContentVideosMovie();
            await props.model.fetchContentReviewsMovie();
            await props.model.fetchContentCreditsMovie();
            await props.model.fetchContentRecommendedMovie();
            await props.model.fetchContentSimilarMovie();
            // await props.model.fetchContentWatchProviders(MediaType.MOVIE);
            console.log("currentMovie:", props.model.currentMovie);
          } catch (e) {
            goPageNotFoundACB();
          }
        } else if (mediaType === MediaType.SERIES) {
          try {
            try {
              await props.model.fetchSingleSeries();
            } catch (e) {
              goPageNotFoundACB();
            }
            await props.model.fetchContentVideosSeries();
            await props.model.fetchContentReviewsSeries();
            await props.model.fetchContentCreditsSeries();
            await props.model.fetchContentRecommendedSeries();
            await props.model.fetchContentSimilarSeries();
            // await props.model.fetchContentWatchProviders(MediaType.SERIES);
            console.log("currentSeries:", props.model.currentSeries);
          } catch (e) {
            goPageNotFoundACB();
          }
        }
      }
    }

    async function checkIfAdded() {
      console.log("checkIfAdded");
      const userID = await getUid();
      await props.model.fetchPersistance(userID);
      const state = props.model.state;
      const likeButton = document.getElementById(
        ListType.LIKED.toString()
      ) as HTMLElement;
      const watchlistButton = document.getElementById(
        ListType.WATCH.toString()
      ) as HTMLElement;
      const seenButton = document.getElementById(
        ListType.SEEN.toString()
      ) as HTMLElement;
      const dislikeButton = document.getElementById(
        ListType.DISLIKED.toString()
      ) as HTMLElement;
      let addedLike = false;
      let addedWatch = false;
      let addedSeen = false;
      let addedDisliked = false;

      const mediaID = getMediaID();
      const mediaType = getMediaType();

      state.liked?.forEach((element: any) => {
        if (element.mediaID === mediaID && element.mediaType === mediaType) {
          addedLike = true;
        }
      });
      state.watch?.forEach((element: any) => {
        if (element.mediaID === mediaID && element.mediaType === mediaType) {
          addedWatch = true;
        }
      });
      state.seen?.forEach((element: any) => {
        if (element.mediaID === mediaID && element.mediaType === mediaType) {
          addedSeen = true;
        }
      });
      state.disliked?.forEach((element: any) => {
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

    async function toggleContent(list: string) {
      const userID = await getUid();
      toggleContentToList(userID, list, getMediaID(), getMediaType());
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
