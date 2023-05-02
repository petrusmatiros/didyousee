<script lang="ts">
import { defineComponent } from 'vue'
import HomeView from "../views/HomeView.vue";

export default defineComponent({
    name: "HomePresenter",
    components: {
        HomeView,
    },
    props: {
        model: {
            type: Object,
            required: true,
        },
    },
    setup(props: any) {
        function updateDataACB() {
            props.model.fetchTrivia();

            props.model.fetchHomeTrendingMovies();
            props.model.fetchHomeTrendingSeries();

            props.model.fetchHomePopularMovies();
            props.model.fetchHomePopularSeries();

            props.model.fetchHomeTopRatedMovies();
            props.model.fetchHomeTopRatedSeries();

            props.model.fetchHomeUpcomingMovies();
            props.model.fetchHomeOnTheAirSeries();
            
            props.model.fetchHomeNowPlayingMovies();
            props.model.fetchHomeAiringTodaySeries();
           
        }
        updateDataACB();

        return {
            updateDataACB,
        };
    },
});
</script>
<template>
    <HomeView :model="model" />
</template>