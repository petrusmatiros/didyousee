<template>
    <div class="gap-full flex-col cast-card">
      <h2 class="flex-row"> {{ $props.cast?.name }} </h2>
      <p class="flex-row"> {{ $props.cast?.character }}</p>
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