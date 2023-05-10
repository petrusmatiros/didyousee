<script lang="ts">
import { defineComponent } from "vue";
import ReviewsView from "../views/ReviewsView.vue";

export default defineComponent({
  name: "ReviewsPresenter",
  components: {
    ReviewsView,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props:any) {
  }
});
</script>
<template>
  <ReviewsView :model="model" />
</template>
