<script lang="ts">
import { defineComponent } from "vue";
import ContentView from "../views/ContentView.vue";
<<<<<<< HEAD
import { useRouter, useRoute } from "vue-router";
import { MediaType } from "../types/types";
=======
import { useRouter,useRoute } from 'vue-router'
import { MediaType } from '../types/types';
import { auth } from "../firebaseConfig";
import { addMovie, getUserData } from "../model/model";
>>>>>>> main

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
<<<<<<< HEAD
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
=======
    props: {
        model: {
            type: Object,
            required: true,
        },
    },
    setup(props: any) {
        const router = useRouter();
        const route = useRoute()
        // Typescript is not smart enough to realise that the check in the if is enough to avoid undefined.
        // So we replace undefined with "" and check for "" explicitly
        const userID = auth.currentUser?.uid || "";
        const mediaID_raw = route.query.id;
        const mediaType_raw = route.query.type;
        if (!mediaID_raw || userID === "") {
            router.push('404');
            throw new Error("404: Movie ID not found");
        } else {
            const mediaID = JSON.parse(mediaID_raw as string);
            const mediaType = JSON.parse(mediaType_raw as string);

            console.log("currentContent:", props.model.currentContent)

            function updateDataACB() {
                props.model.resetCurrentContent();
                if (mediaID) {
                    console.log("Media from query parameter- TYPE:", mediaType, "ID:", mediaID);
                    props.model.setSearchID(mediaID);

                    if (mediaType === MediaType.MOVIE) {
                        props.model.fetchSingleMovie();
                    }
                    else if (mediaType === MediaType.SERIES) {
                        props.model.fetchSingleSeries();
                    }

                }
            }
            updateDataACB();
            // props.model.addObserver(updateDataACB);

            function addToList(list : string) {
                addMovie(userID, list, mediaID);
            }

            function handleLikedACB() {
                // Handle click event for the "liked" button
                console.log("Liked button clicked");
                addToList("liked");
            }
            function handleWatchlistACB() {
                // Handle click event for the "watchlist" button
                console.log("Watchlist button clicked");
                addToList("watch");
            }
            function handleSeenACB() {
                // Handle click event for the "seen" button
                console.log("Seen button clicked");
                addToList("seen");
            }
            function handleDislikedACB() {
                // Handle click event for the "disliked" button
                console.log("Disliked button clicked");
                addToList("disliked");
            }
            function goBackACB() {
                console.log("Back button clicked");
                router.go(-1); // Go back one step in Vue Router history
            }
            return {
                updateDataACB,
                handleLikedACB,
                handleWatchlistACB,
                handleSeenACB,
                handleDislikedACB,
                goBackACB,
            };
        }
    },
});
</script>
<template>
    <ContentView :model="model" @updateData="updateDataACB" @handleLiked="handleLikedACB"
        @handleWatchlist="handleWatchlistACB" @handleSeen="handleSeenACB" @handleDisliked="handleDislikedACB"
        @goBack="goBackACB"  />
>>>>>>> main
</template>
