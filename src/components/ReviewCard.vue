<template>
    <div v-if="$props.review?.author_details?.avatar_path || $props.review?.author_details?.username || $props.review?.created_at || $props.review?.author_details?.rating || $props.review?.content" class="review-card gap-double flex-col">
      <div class="flex-row flex-space-between-center gap-full">
        <div class="review-card-author flex-row flex-start-center gap-full">
          <div class="loading-skeleton" v-if="!$props.review?.author_details?.avatar_path"></div>
          <img v-else :src="$props.review?.author_details?.avatar_path" onerror="this.src='/src/assets/no-content.svg';">
          <div v-if="$props.review?.author_details?.username || $props.review?.created_at" class="flex-col flex-center-start gap-quarter">
            <h1 v-if="$props.review?.author_details?.username"> {{ $props.review?.author_details?.username }} </h1>
            <h1 v-else>No username</h1>
            <p v-if="$props.review?.created_at" class="review-card-date flex-row flex-center"> {{ new Date($props.review?.created_at).toLocaleDateString()}} </p>
            <p class="review-card-date flex-row flex-center" v-else>No date</p>
          </div>
        </div>
        <div v-if="$props.review?.author_details?.rating" class="review-card-rating flex-row flex-start-center gap-quarter">
          <span class="material-symbols-rounded p-0">star</span>
          <p> {{ $props.review?.author_details?.rating }}/10 </p>
        </div>
        <div class="review-card-rating flex-row flex-start-center gap-quarter" v-else>No rating</div>
      </div>
      <p v-if="$props.review?.content" class="fw-regular"> {{ $props.review?.content }} </p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import "./../style.css";
  
  export default defineComponent({
    name: "ReviewCard",
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
  