<template>
  <div class="top flex-col flex-center">
    <h1>About</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";

export default defineComponent({
  name: "About",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {

  },
});
</script>
