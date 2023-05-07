<script setup lang="ts">
import "./../style.css";

const emit = defineEmits(["handleCreateAccount"]);

function handleCreateAccountACB(
  username: string,
  mail: string,
  password: string,
  confirm_password: string
) {
  emit("handleCreateAccount", username, mail, password, confirm_password);
}
</script>

<template>
  <div class="top gap-full flex-col flex-center">
    <div class="credentials-container gap-double flex-col flex-center">
      <div class="flex-col flex-center gap-quarter m-medium">
        <img
          src="/src/assets/didyousee.svg"
          onerror="this.src='/src/assets/no-content.svg';"
          alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
          decoding="async"
          fetchpriority="high"
        />
        <div class="flex-col flex-center gap-half">
          <h1 class="credentials-title">Register</h1>
          <p class="credentials-subtitle">
            Your search for greatness awaits...
          </p>
        </div>
      </div>
      <form class="credentials-form flex-col flex-center gap-double">
        <div class="flex-col flex-center gap-half">
          <div class="flex-col flex-center-start">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="credentials"
              required
              v-model="username"
            />
          </div>
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
            <label for="mail">Password</label>
            <input
              type="password"
              id="password"
              name="credentials"
              required
              v-model="password"
            />
          </div>
          <div class="flex-col flex-center-start">
            <label for="mail">Confirm password</label>
            <input
              type="password"
              id="confirm_password"
              name="credentials"
              required
              v-model="confirm_password"
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
            @click.prevent="
              handleCreateAccountACB(username, mail, password, confirm_password)
            "
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
import { defineComponent } from "vue";

let mail = "";
let username = "";
let password = "";
let confirm_password = "";

export default defineComponent({
  name: "RegisterView",
  props: {
    credentialsError: {
      type: Object,
      required: false,
    },
  },
});
</script>
