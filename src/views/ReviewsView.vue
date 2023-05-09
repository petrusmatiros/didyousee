<script setup lang="ts">
import "./../style.css";
import ReviewCard from "../components/ReviewCard.vue";
</script>

<template>
  <div class="mt-large2 gap-full flex-col flex-center">
    <div class="flex-col flex-center-start gap-full">
      <h1>
        {{ $props.model.currentMovie.title || $props.model.currentSeries.name }}
      </h1>
      <h2>Reviews</h2>
      <ReviewCard
        v-if="$props.model.currentMovie.reviews.results"
        v-for="(review, index) in $props.model.currentMovie?.reviews.results"
        :review="review"
        :key="index"
      />
      <ReviewCard
        v-if="$props.model.currentSeries.reviews.results"
        v-for="(review, index) in $props.model.currentSeries?.reviews.results"
        :review="review"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ReviewsView",
  components: {
    ReviewCard,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
});
</script>
