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
            props.model.fetchTrendingMovies();
            props.model.fetchTrendingSeries();
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