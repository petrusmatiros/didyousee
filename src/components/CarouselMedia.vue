<script setup lang="ts">
import MediaCard from "../components/MediaCard.vue";
import { PosterSize, MediaType } from "../types/types";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
</script>

<template>
  <Splide
    :options="{
      type: 'loop',
      perPage: 4,
      perMove: 4,
      mediaQuery: 'max',
      breakpoints: {
        767: {
          perPage: 1,
          perMove: 1,
        },
      },
      paginationDirection: 'ltr',
      paginationKeyboard: true,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      drag: true,
      snap: true,
      waitForTransition: true,
      gap: '8rem',
      rewind: true,
      clones: 0,
    }"
    :aria-label="label"
  >
    <SplideSlide v-for="(media, index) in $props.media" :key="index">
      <MediaCard :media="media" :media-type="mediaType" />
    </SplideSlide>
  </Splide>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";

export default defineComponent({
  name: "CarouselMedia",
  components: {
    MediaCard,
  },
  props: {
    media: {
      type: Object,
      required: true,
    },
    mediaType: {
      type: String,
      required: false,
      validator: (value: string) => {
        return [
          MediaType.SERIES.toString(),
          MediaType.MOVIE.toString(),
          undefined,
        ].includes(value);
      },
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
