<template>
  <div
    class="searchBar flex-row flex-center"
    :class="{ 'searchBar--focused': inputFocused }"
  >
    <span
      class="material-symbols-rounded"
      @click="methods.searchClickACB(searchString)"
      >search</span
    >
    <input
      id="searchBar"
      type="text"
      v-model="searchString"
      placeholder="Search"
      name="inputSearchBar"
      @focus="methods.onInputFocus"
      @blur="methods.onInputBlur"
      @keydown.enter="methods.searchEnterACB(searchString)"
      @input="methods.onInputTyping(searchString)"
    />
    <span
      class="material-symbols-rounded"
      @click="methods.clearSearch()"
      >close</span
    >
    <div class="verticalBar"></div>
    <select
      v-model="selectedCategory"
      class="selectButton"
      name="searchCategory"
      id="searchCategorySelect"
      @change="methods.onCategoryChange(selectedCategory)"
    >
      <option value="title">Title</option>
      <option value="genre">Genre</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import "./../style.css";
import { SearchCategory } from "../types/types";

export default defineComponent({
  name: "SearchBar",
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
    let inputFocused = false;
    let typingTimeout = setTimeout(() => {});

    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
      searchBar.setAttribute("value", props.model.getSearchString());
    }

    const router = useRouter();
    const goToSearchResultsPage = function () {
      router.push({
        name: "SearchResults",
      });
    };

    const methods = {
      async searchClickACB(searchQuery: string) {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        if (!searchQuery) {
          props.model.setSearchString("");
          return;
        }
        props.model.setSearchString(searchQuery);
        goToSearchResultsPage();
      },
      clearSearch() {
        const searchBar = document.querySelector(".searchBar");
        if (searchBar) {
          const searchBarInput = document.getElementById("searchBar") as HTMLInputElement;
          searchBarInput?.focus();
          searchBarInput.value = ""
        }
      },
      searchEnterACB(searchQuery: string) {
        this.searchClickACB(searchQuery);
      },
      onInputTyping(searchQuery: string) {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        typingTimeout = setTimeout(() => {
          this.searchClickACB(searchQuery);
        }, 300);
      },
      onInputFocus() {
        inputFocused = true;
        const searchBar = document.querySelector(".searchBar");
        if (searchBar) {
          searchBar.classList.add("searchBar--focused");
        }
      },
      onInputBlur() {
        inputFocused = false;
        const searchBar = document.querySelector(".searchBar");
        if (searchBar) {
          searchBar.classList.remove("searchBar--focused");
        }
      },
      onCategoryChange(category: SearchCategory) {
        props.model.setSearchCategory(category);
      },
    };

    return {
      typingTimeout: null as ReturnType<typeof setTimeout> | null,
      inputFocused,
      searchString: props.model.getSearchString(),
      selectedCategory: props.model.getSearchCategory(),
      movies: [],
      methods,
    };
  },
});
</script>
