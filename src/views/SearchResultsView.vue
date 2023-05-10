<script setup lang="ts">
import './../style.css';
import MediaCard from '../components/MediaCard.vue';
import { Suspense } from 'vue';

const emit = defineEmits(["onFilterChange"]);

function onFilterChange(value: string) {
  emit("onFilterChange", value);
}
</script>

<template>
      <select
      v-model="selectedFilter"
      class="selectButton" 
      name="searchCategory"
      id="searchCategorySelect"
      @change="onFilterChange(selectedFilter)"
    >
      <option value="Popularity_ASC">Popularity ASC</option>
      <option value="Popularity_DSC">Popularity DSC</option>
      <option value="Rating_ASC">Rating ASC</option>
      <option value="Rating_DSC">Rating DSC</option>
      <option value="Title_ASC">Title ASC</option>
      <option value="Title_DSC">Title DSC</option>
      <option value="Year_ASC">Year ASC</option>
      <option value="Year_DSC">Year DSC</option>
    </select>
  <!-- <button @click="searchClickACB()">X</button> -->
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
      selectedFilter: '',
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
      // console.log("VIEW STATUS:", this.result_status);
    },
  },
});
</script>
