<template>
  <div class="flex-col flex-center-start gap-full">
    <div class="loading-skeleton" v-if="$props.content?.poster_path"></div>
    <img v-else :src="$props.content?.poster" onerror="this.src='/src/assets/no-poster.svg';">
    <h1 v-if="$props.content?.title">{{ $props.content?.title }}</h1>
  </div>    
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import "./../style.css";
  
  export default defineComponent({
    name: "ListCard",
    props: {
      content: {
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
  