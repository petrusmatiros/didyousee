<script setup lang="ts">
import "./../style.css";
import CastCard from "../components/CastCard.vue";
</script>

<template>
  <div class="mt-large2 gap-full flex-col flex-center">
    <div class="flex-col flex-center-start gap-full">
      <h1>
        {{ $props.model.currentMovie.title || $props.model.currentSeries.name }}
      </h1>
      <h2>Cast</h2>
      <CastCard
        v-if="$props.model.currentMovie?.credits?.cast"
        v-for="(cast, index) in $props.model.currentMovie?.credits?.cast"
        :cast="cast"
        :key="index"
      />
      <CastCard
        v-if="$props.model.currentSeries?.credits?.cast"
        v-for="(cast, index) in $props.model.currentSeries?.credits?.cast"
        :cast="cast"
        :key="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CastView",
  components: {
    CastCard,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
});
</script>
