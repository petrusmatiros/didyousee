<template>
    <div class="gap-full flex-col">
      <h2 class="flex-row"> {{ cast.name }} </h2>
      <p class="flex-row"> {{ cast.character }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import "./../style.css";
  
  export default defineComponent({
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