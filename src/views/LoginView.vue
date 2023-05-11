<script setup lang="ts">
import "./../style.css";

const emit = defineEmits(["handleLogin", "handleGoogleLogin"])

function handleLoginACB(mail: string, password: string) {emit("handleLogin", mail, password);}
function handleGoogleLoginACB() {emit("handleGoogleLogin");}
</script>

<template>
  <div class="mt-large2 gap-full flex-col flex-center">
    <div class="credentials-container gap-double flex-col flex-center">
      <div class="flex-col flex-center gap-quarter m-medium">
        <img
          src="../assets/didyousee.svg"
          onerror="this.src='/src/assets/no-content.svg';"
          alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
          decoding="async"
          fetchpriority="high"
        />
        <div class="flex-col flex-center gap-half">
          <h1 class="credentials-title">Login</h1>
          <p class="credentials-subtitle">Welcome back!</p>
        </div>
      </div>
      <form class="credentials-form flex-col flex-center gap-double">
        <div class="flex-col flex-center gap-half">
          <div class="flex-col flex-center-start">
            <label for="mail">Email</label>
            <input
              type="text"
              id="mail"
              name="credentials"
              required
              v-model="mail"
            />
          </div>
          <div class="flex-col flex-center-start">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="credentials"
              required
              v-model="password"
            />
          </div>
          <div class="flex-row flex-center-start">
            <p
              id="credentials-error-message"
              class="credentials-error-message"
              v-if="credentialsError?.errorMessage"
            >
              {{ credentialsError?.errorMessage }}
            </p>
          </div>
        </div>
        <div class="credentials-button-container flex-col flex-center">
          <button
            class="button credentials-submit-button"
            @click.prevent="handleLoginACB(mail, password)"
          >
            Login
          </button>
          <button class="credentials-submit-button" @click.prevent="handleGoogleLoginACB()">
            Login with Google
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
import { defineComponent } from "vue";

let mail = "";
let password = "";

export default defineComponent({
  name: "LoginView",
  props: {
    credentialsError: {
      type: Object,
      required: false,
    },
  },
});
</script>
