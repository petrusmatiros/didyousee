<template>
  <nav class="flex-row flex-center" id="nav">
    <router-link to="/" class="nav-link" id="logo"><img src="./assets/didyousee.svg" alt="didyousee logo. an owl holding a binocular, looking for the next movie/series" decoding="sync" fetchpriority="high"/></router-link>
    <router-link to="/" class="nav-link">Watchlist</router-link>
    <router-link to="/" class="nav-link">Seen</router-link>
    <router-link to="/" class="nav-link">Liked</router-link>
    <router-link to="/" class="nav-link">Disliked</router-link>
    <router-link to="/profile" class="nav-link" id="profile">Profile</router-link>
  </nav>
  <router-view/>
  <footer class="flex-row flex-seperate" id="footer">
  <p>Copyright © 2023 didyousee. All rights reserved</p>
  <div class="flex-row">
    <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
    <img src="./assets/tmdb_alt_short_blue.svg" alt="TMDB alt short logo" loading="lazy" decoding="async"/>
  </div>
  </footer>
</template>

<script lang="ts">
import './style.css'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      // message: 'Hello world!',
    }
  },
})
</script>
