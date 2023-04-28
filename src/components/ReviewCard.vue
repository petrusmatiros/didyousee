<template>
    <div class="gap-full flex-col">
      <h2> {{ review.author }} </h2>
      <p class="flex-row"> {{ review.content }}</p>
      <div class="flex-col flex-center gap-half">
        <p class="flex-row">{{ review.created_at }}</p>
        
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import "./../style.css";
  
  export default defineComponent({
    props: {
      review: {
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
  