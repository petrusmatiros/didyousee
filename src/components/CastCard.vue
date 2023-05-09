<template>
    <div class="cast-card gap-full flex-col flex-start-center">
      <div
          class="loading-skeleton"
          v-if="
            !(
              $props.cast?.profile_path  ||
              $props.cast?.profile_path 
            )
          "
        ></div>
        <img
          v-else
          loading="lazy"
          onerror="this.src='/src/assets/no-content.svg';"
          :src="
          $props.cast?.profile_path  ||
          $props.cast?.profile_path 
          "
        />
      <div class="flex-col flex-start-center gap-quarter">
        <h1 class="flex-row"> {{ $props.cast?.name }} </h1>
        <p class="flex-row"> {{ $props.cast?.character }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import "./../style.css";
  
  export default defineComponent({
    name: "CastCard",
    props: {
      cast: {
        type: Object,
        required: true,
      },
    },
    computed: {
    },
    data() {
      return {
      };
    },
    methods: {
    },
  });
  </script>