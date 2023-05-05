<script lang="ts">
import { defineComponent } from 'vue'
import ReviewsView from "../views/ReviewsView.vue";

export default defineComponent({
    name: "ReviewsPresenter",
    components: {
        ReviewsView,
    },
    setup(props: any) {

        return {
        };
    },
});
</script>
<template>
    <ReviewsView/>
</template>