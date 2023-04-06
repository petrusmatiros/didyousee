<template>
  <nav class="flex-row flex-center" id="nav">
    <router-link to="/" class="nav-link" id="logo"><strong>didyousee</strong></router-link>
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/" class="nav-link">Watchlist</router-link>
    <router-link to="/" class="nav-link">Seen</router-link>
    <router-link to="/" class="nav-link">Liked</router-link>
    <router-link to="/" class="nav-link">Disliked</router-link>
    <router-link to="/profile" class="nav-link" id="profile">Profile</router-link>
  </nav>
  <router-view/>
  <footer class="flex-row flex-center" id="footer">
  <h3>© 2023 didyousee</h3>
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
