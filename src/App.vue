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

<style>

#nav {
  position: sticky;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #222;
  color: white;
  padding: 10px;
}

#profile {
  margin-left: auto;
}

#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #222;
  color: white;
  padding: 10px;
  margin-top:20px;
}

.nav-link {
  text-decoration: none;
  color: white;
  margin-right: 20px;
  font-weight: bold;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #222;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
