<template>
    <div class="gap-full flex-col review-card">
      <h1> {{ $props.review?.author_details?.username }} </h1>
      <p> {{ $props.review?.content }} </p>
      <p class="flex-row flex-center review-card-date"> {{ new Date($props.review?.created_at).toLocaleDateString()}} </p>
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
  });
  </script>
  