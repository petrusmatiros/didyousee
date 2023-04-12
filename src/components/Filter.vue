<template>
  <div class="search-filter">
    <h2>Search filter</h2>
  </div>
</template>

<script lang="ts">
import "./../style.css";
import { defineComponent } from "vue";

export default defineComponent({
});
</script>

<!-- Style ska bort sen och placeras i style.css -->
<style scoped>
.search-filter {
  position: fixed;
  left: 0; 
  width: 33%; 
  height: 100%; 
  background-color: red;
}
</style>
