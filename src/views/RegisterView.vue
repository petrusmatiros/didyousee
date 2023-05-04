<script setup lang="ts">
import './../style.css';

const emit = defineEmits(["handleCreateAccount"])

function handleCreateAccountACB(username: string, mail: string, password: string, confirm_password: string) {emit("handleCreateAccount", username, mail, password, confirm_password);}

</script>

<template>
    <div class="top gap-full flex-col flex-center">
      <div class="credentials-container gap-half flex-col flex-center">
        <img
          src="../src/assets/didyousee.svg"
          alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
          decoding="async"
          fetchpriority="high"
        />
        <h1 class="credentials-title">Register</h1>
        <p class="credentials-subtitle">Your search for greatness awaits...</p>
        <form class="credentials-form flex-col flex-center-start">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            name="credentials"
            required
            v-model="username"
          />
          <label for="mail">Email</label>
          <input
            type="text"
            id="mail"
            name="credentials"
            required
            v-model="mail"
          />
          <label for="mail">Password</label>
          <input
            type="password"
            id="password"
            name="credentials"
            required
            v-model="password"
          />
          <label for="mail">Confirm password</label>
          <input
            type="password"
            id="confirm_password"
            name="credentials"
            required
            v-model="confirm_password"
          />
          <div class="credentials-button-container flex-col flex-center">
            <button
              class="credentials-submit-button"
              @click.prevent="handleCreateAccountACB(username, mail, password, confirm_password)"
            >
              Create account
            </button>
            <p class="credentials-link">
              <router-link to="/login">Already have an account?</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>

<script lang="ts">
import { defineComponent } from 'vue';

let mail = "";
let username = "";
let password = "";
let confirm_password = "";

export default defineComponent({
    name: 'LoginView',
});
</script>
