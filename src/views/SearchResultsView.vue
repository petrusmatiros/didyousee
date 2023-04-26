<script setup lang="ts">
import './../style.css';
import MediaCard from '../components/MediaCard.vue';

</script>

<template>
  <!-- <button @click="searchClickACB()">X</button> -->
  <div class="search-results flex-col flex-center">
    <div id="searchResultsList" class="trending-list gap-full flex-row flex-center">
      <MediaCard v-for="(media, index) in $props.model.searchContent" :key="index" :media="media" :media-type="media.mediaType" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchResultsView',
  components: {
    MediaCard,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
});
</script>
