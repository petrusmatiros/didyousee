<script setup lang="ts">
import CastCard from "../components/CastCard.vue";
import { PosterSize } from "../types/types";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
</script>

<template>
  <Splide
    :options="{
      type: 'loop',
      autoWidth: true,
      perPage: 4,
      perMove: 1,
      mediaQuery: 'max',
      breakpoints: {
        475: {
          perPage: 3,
          perMove: 1,
        },
      },
      paginationDirection: 'ltr',
      paginationKeyboard: true,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      drag: true,
      snap: true,
      waitForTransition: true,
      gap: '1rem',
      rewind: true,
      clones: 0,
    }"
    :aria-label="label"
  >
    <SplideSlide v-for="(cast, index) in $props.cast" :key="index">
      <CastCard :cast="cast"/>
    </SplideSlide>
  </Splide>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";

export default defineComponent({
  name: "Carousel",
  components: {
    CastCard,
  },
  props: {
    cast: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
});
</script>
