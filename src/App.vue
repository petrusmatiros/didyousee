<template>
  <nav class="flex-row flex-center" id="nav">
    <div class="nav-link-container flex-row flex-center">
      <RouterLink to="/" class="nav-link flex-row" id="logo"><img src="./assets/didyousee.svg" alt="didyousee logo. an owl holding a binocular, looking for the next movie/series" decoding="sync" fetchpriority="high"/></RouterLink>
      <div class="nav-link-right flex-row flex-center">
        
        <SearchBar @search="onSearchACB"></SearchBar>
        <RouterLink to="/profile" class="nav-link flex-row flex-center" id="profile">Profile</RouterLink>
      </div>
    </div>
  </nav>
  <div class="margin">
    <RouterView></RouterView>
  </div>
  <footer class="flex-col flex-seperate" id="footer">
    <div class="footer-top flex-row flex-center">
      <RouterLink to="/" class="nav-link flex-row" id="logo"><img src="./assets/didyousee.svg" alt="didyousee logo. an owl holding a binocular, looking for the next movie/series" decoding="sync" fetchpriority="high"/></RouterLink>
      <RouterLink to="/profile" class="nav-link"></RouterLink>
    </div>
    <div class="footer-bottom flex-row flex-center">

    </div>
  <div class="flex-row flex-center">
    <p>Copyright © 2023 didyousee. All rights reserved</p>
  </div> 
  <div class="flex-row flex-center">
    <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
    <img src="./assets/tmdb_alt_short_blue.svg" alt="TMDB alt short logo" loading="lazy" decoding="async"/>
  </div>
  </footer>
</template>

<script lang="ts">
import './style.css'
import { RouterView, RouterLink } from 'vue-router';
import { defineComponent } from 'vue'
import SearchBar from "../src/components/SearchBar.vue";

export default defineComponent({
  name: 'App',
  components: {
    SearchBar,
  },
  methods: {
    onSearchACB(query:string) {
      console.log("Search query:", query)
      this.$router.push({ path: '/', query: { q: query } });
    },
  },
  data() {
    return {
      // message: 'Hello world!',
    }
  },
})
</script>

<style>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}
</style>
