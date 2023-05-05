<template>
    <div class="flex-center flex-col">
      <a v-if="$props.watch_providers?.buy[0] || $props.watch_providers?.rent[0] || $props.watch_providers?.flatrate[0]" :href="$props.watch_providers?.buy[0]?.logo_path || $props.watch_providers?.rent[0]?.logo_path || $props.watch_providers?.flatrate[0]?.logo_path">
        <strong>Providers</strong>
      </a>
       
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import "./../style.css";
  
  export default defineComponent({
    props: {
      watch_providers: {
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
  