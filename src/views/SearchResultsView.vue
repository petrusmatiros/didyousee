<script setup lang="ts">
import './../style.css';
import MediaCard from '../components/MediaCard.vue';
import { SortBy } from '../types/types';

const emit = defineEmits(["onSortChange","onRefresh"]);

function onSortChange(sortType: string) {
  emit("onSortChange", sortType);
}

function onRefresh() {
  emit("onRefresh");
}
</script>

<template>
  <div class="flex-col flex-center gap-full mt-large2">

    <!-- TODO FIX SORTING -->
        <select
        v-model="selectedFilter"
        class="button flex-center pr-medium pl-medium" 
        name="searchCategory"
        id="searchCategorySelect"
        @change="onSortChange(selectedFilter)"
        >
        <option :value="SortBy.POPULARITY_DSC.toString()" selected>Highest Popularity</option>
        <option :value="SortBy.POPULARITY_ASC.toString()">Lowest Popularity</option>
        <option :value="SortBy.RATING_DSC.toString()">Highest Rating</option>
        <option :value="SortBy.RATING_ASC.toString()">Lowest Rating</option>
        <option :value="SortBy.TITLE_ASC.toString()">Title A-Z</option>
        <option :value="SortBy.TITLE_DSC.toString()">Title Z-A</option>
        <option :value="SortBy.LATEST.toString()">Latest</option>
        <option :value="SortBy.OLDEST.toString()">Oldest</option>
      </select>
     <!-- <button @click="onRefresh()">#</button> -->
    <div  class="search-results flex-col flex-center gap-half">
  
      <!-- Result -->
      <div v-if="result_status === 'fulfilled'" class="trending-list gap-full flex-row flex-center">
        <MediaCard v-for="(media, index) in $props.model.searchContent" :key="index" :media="media" :media-type="media.mediaType" />
      </div> 
  
       <!-- Invalid search -->
      <div v-else-if="result_status === 'rejected'">
        <div class="flex-col flex-center gap-half">
          <p>Searching for "{{ $props.model.searchString }}" returned no matches.</p> 
          <p>Was it a typo? :p</p> 
        </div>
      </div>
  
      <!-- TODO: Dummy content -->
      <div v-else class="trending-list gap-full flex-row flex-center">
        <div class="loading-skeleton content-card-dummy gap-full flex-col" v-for="(media, index) in $props.model.dummyContent" :key="index" :media="media" :media-type="media.mediaType">
          <div class="content-poster nothing"></div>
          <div class="flex-col flex-center gap-half">
            <h2 class="flex-row"></h2>
            <div class="flex-row flex-center gap-half"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Suspense>
      <template #default>
      </template>
      <template #fallback>
        <div class="loading-skeleton">
          LOADING THIS IS LOADING
        </div>
      </template>
  </Suspense> -->
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
  data() {
    return {
      result_status: '',
      selectedFilter: this.$props.model.sortBy,
    };
  },
  watch: {
    model: {
      handler: 'updateSearchStatus',
      deep: true,
    },
  },
  methods: {
    updateSearchStatus() {
      this.result_status = this.model.result_status.current;
    },
  },
});
</script>
