<template>
  <div class="credentials-container">
    <h1 class="credentials-title">Login</h1>
    <p class="credentials-subtitle">Welcome back!</p>
    <form class="credentials-form">
      <label for="username">Username</label>
      <input type="text" id="username" name="credentials" required v-model="username" />
      <label for="password">Password</label>
      <input type="password" id="password" name="credentials" required v-model="password" />
      <div class="credentials-button-container">
        <button class="credentials-submit-button" @click="handleLogin">Login</button>
        <p class="credentials-link"><router-link to="/register">Register a new account?</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './../style.css'

export default defineComponent({
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    handleLogin() {
      console.log('Login clicked!');
      console.log("Username", this.username);
      console.log("Password", this.password);
      //this.username och this.password för att få användarnamn och lösenord från input-fälten
    },
  },
})
</script>