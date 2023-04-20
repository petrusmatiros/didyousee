<script setup lang="ts">
import './../style.css';
import { defineEmits } from 'vue';

const emit = defineEmits(["handleLogin"])

function handleLoginACB(username: string, password: string) {emit("handleLogin", username, password);}

</script>

<template>
    <div class="top flex-col flex-center">
      <div class="credentials-container flex-col flex-center">
        <img
          src="../assets/didyousee.svg"
          alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
          decoding="async"
          fetchpriority="high"
        />
        <h1 class="credentials-title">Login</h1>
        <p class="credentials-subtitle">Welcome back!</p>
        <form class="credentials-form flex-col flex-center-start">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="credentials"
            required
            v-model="username"
          />
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="credentials"
            required
            v-model="password"
          />
          <div class="credentials-button-container flex-col flex-center">
            <button class="credentials-submit-button" @click.prevent="handleLoginACB(username, password)">
              Login
            </button>
            <p class="credentials-link">
              <router-link to="/register">Register a new account?</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

let username = "";
let password = "";


export default defineComponent({
    name: 'LoginView',
});
</script>
