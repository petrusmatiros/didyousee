<template>
  <!-- <div
    class="searchBar flex-row flex-center"
    :class="{ 'searchBar--focused': inputFocused }"
  >
    <span class="material-symbols-rounded" @click="filterClickACB">filter_alt</span>
    <input
      type="text"
      placeholder="Search for a movie"
      name="inputSearchBar"
      @focus="onInputFocus"
      @blur="onInputBlur"
      v-model="searchString"
      @keydown.enter="searchEnterACB"
      @input="onInputTyping"
    />
    <span class="material-symbols-rounded" @click="searchClickACB(searchString)"
      >search</span
    >
  </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "./../style.css";
import {
  model,
  searchMovie,
} from "../model/model";

export default defineComponent({
  

  
});
</script>
