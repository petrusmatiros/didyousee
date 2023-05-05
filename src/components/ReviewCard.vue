<template>
    <div class="gap-full flex-col review-card">
      <div class="flex-col flex-center-start gap-half">
        <h1> {{ $props.review?.author_details?.username }} </h1>
        <p class="flex-row flex-center review-card-date"> {{ new Date($props.review?.created_at).toLocaleDateString()}} </p>
      </div>
      <p class="fw-regular"> {{ $props.review?.content }} </p>
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
  