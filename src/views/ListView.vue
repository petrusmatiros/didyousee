<script setup lang="ts">
import "./../style.css";
import ListCard from "./../components/ListCard.vue";
</script>

<template>
  <div class="mt-large2 gap-full flex-col flex-center gap-full">
    <h1>{{ formatName($props.model.currentState.name) }}</h1>
    <div class="list-container flex-col flex-center-start gap-full">
      <div v-if="$props.model?.currentList.length === 0 || !$props.model?.currentList"
      class="flex-col flex-center gap-half">
        <h1>This list is empty (｢•-•)｢</h1>
        <p>But do not fret - use the searchbar above to find something awesome to watch (^-^)</p>
      </div>
      
      <ListCard v-else v-for="(list, index) in $props.model?.currentList" :key="index"
      :list="list"
      :model="model">
    </ListCard>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListPresenter from "../presenters/ListPresenter.vue";

export default defineComponent({
  name: "ListView",
  components: {
    ListCard,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatName(name: string) {
      return name.toLowerCase().charAt(0).toUpperCase() + name.slice(1);
    },
  },
});
</script>
