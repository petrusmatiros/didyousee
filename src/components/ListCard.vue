<template>
  <div class="list-card flex-row flex-start-center gap-full">
    <div v-if="!($props.list?.title || $props.list?.name)" class="loading-skeleton list-card flex-row flex-start-center gap-full"></div>
    <div v-else class="list-card flex-row flex-start-center gap-full">
    <!-- {{ $props.list }} -->
      <div class="loading-skeleton" v-if="!$props.list?.poster_path"></div>
      <img v-else :src="$props.list?.poster_path" onerror="this.src='/src/assets/no-poster.svg';">
      <div class="flex-col flex-center-start gap-half">
        <h1 v-if="$props.list?.title || $props.list?.name">{{ $props.list?.title || $props.list?.name }}</h1>
        <span class="material-symbols-rounded">delete</span>
      </div>
    </div>    
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import "./../style.css";
  
  export default defineComponent({
    name: "ListCard",
    props: {
      list: {
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
  });
  </script>
  