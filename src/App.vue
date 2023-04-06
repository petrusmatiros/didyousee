<template>
  <nav id="nav">
    <router-link to="/" class="nav-link">Home</router-link>
    <router-link to="/result" class="nav-link">Result</router-link>
    <router-link to="/profile" class="nav-link" id="profile">Profile</router-link>
  </nav>
  <router-view/>
  <footer id="footer">
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
