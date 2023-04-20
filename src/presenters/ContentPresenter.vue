<script lang="ts">
import { defineComponent } from 'vue'
import ContentView from "../views/ContentView.vue";
import { getSystemErrorMap } from 'util';
import { useRouter,useRoute } from 'vue-router'
import { Console } from 'console';

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
    setup(props: any) {
        const router = useRouter();
        const route = useRoute()

        function updateDataACB() {
            props.model.resetCurrentContent();
            const id = route.query.id;
            if (id) {
                const mediaID = JSON.parse(id as string);
                console.log("Media from query parameter:", mediaID);
                props.model.setSearchID(mediaID);
                props.model.fetchMovie();
            }
        }
        updateDataACB();
        // props.model.addObserver(updateDataACB);

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
    },
});
</script>
<template>
    <ContentView :model="model" @updateData="updateDataACB" @handleLiked="handleLikedACB"
        @handleWatchlist="handleWatchlistACB" @handleSeen="handleSeenACB" @handleDisliked="handleDislikedACB"
        @goBack="goBackACB"  />
</template>