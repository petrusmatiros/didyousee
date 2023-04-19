<template>
  <div
      class="searchBar flex-row flex-center"
      :class="{ 'searchBar--focused': inputFocused }"
    >
    <span class="material-symbols-rounded" @click="methods.searchClickACB(searchString)"
        >search</span
      >
      <input
        id="searchBar"
        type="text"
        v-model="searchString"
        placeholder="Search for a movie, series, genre..."
        name="inputSearchBar"
        @focus="methods.onInputFocus"
        @blur="methods.onInputBlur"
        @keydown.enter="methods.searchEnterACB"
        @input="methods.onInputTyping"
      />
      
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router'
import "./../style.css";



export default defineComponent({
  name: "SearchBar",
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props:any) {
    let inputFocused = false;
    let typingTimeout = 0;
    console.log("MODEL", props.model)
    
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
      searchBar.setAttribute("value",  props.model.getSearchString());
    }

    const router = useRouter();
    const goToSearchResultsPage = function() {
      router.push({
        name: "SearchResults",
      });
    };


    const methods = {
      
      async searchClickACB(searchQuery: string) {
        const searchBar = document.querySelector(".searchBar");
        inputFocused = true;
        if (searchBar) {
          searchBar.classList.add("searchBar--focused");
        }
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }
        if (!searchQuery) {
          props.model.setSearchString("");
          return;
        }
        console.log(`Searching: ${searchQuery}`);
        props.model.setSearchString(searchQuery);
        goToSearchResultsPage();
      },
      searchEnterACB() {
        this.searchClickACB(props.model.getSearchString());
      },
      onInputTyping() {
        if (props.typingTimeout) {
          clearTimeout(props.typingTimeout);
        }
        let typingTimeout = setTimeout(() => {
          this.searchClickACB(props.model.getSearchString());
        }, 250);
      },
      onInputFocus() {
        inputFocused = true;
        const searchBar = document.querySelector(".searchBar");
        if (searchBar) {
          searchBar.classList.add("searchBar--focused");
        }
      },
      onInputBlur() {
        inputFocused = false; // set the inputFocused flag to false
        const searchBar = document.querySelector(".searchBar");
        if (searchBar) {
          searchBar.classList.remove("searchBar--focused");
        }
      },
    }

    return {
      typingTimeout: null as ReturnType<typeof setTimeout> | null,
      inputFocused,
      searchString: props.model.getSearchString(),
      movies: [],
      methods,
    };
  },
});
</script>
