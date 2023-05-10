ListCard<script setup lang="ts">
import "./../style.css";
import ListCard from "./../components/ListCard.vue";
</script>

<template>
  <div class="mt-large2 gap-full flex-col flex-center">
    <h1>{{ formatName(listName) }}</h1>
    <!-- TODO ListCard with v-for -->
    <div class="list-container flex-col flex-center-start gap-full">
      <ListCard v-for="(list, index) in $props.model?.currentList" :key="index"
      :list="list"
      :model="model"
      :listName="listName">Card
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
    listName: {
      type: String,
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
