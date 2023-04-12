<template>
  <div class="search-filter">
    <h2>Search Filter</h2>
    <h3>Language</h3>
    <h3>Region</h3>
    <h3>Year</h3>
    <h3>Adult</h3>
    <button>Clear</button>
    <button>Search</button>
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

h2 {
  font-size: 24px;
  margin-bottom: 16px;
}

h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  margin-top: 16px;
  margin-right: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004380;
}
</style>
