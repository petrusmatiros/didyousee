<template>
  <div class="top flex-col flex-center">
    <div class="credentials-container flex-col flex-center">
      <img
        src="../assets/didyousee.svg"
        alt="didyousee logo. an owl holding a binocular, looking for the next movie/series"
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
        <label for="mail">Mail</label>
        <input
          type="text"
          id="mail"
          name="credentials"
          required
          v-model="mail"
        />
        <label for="mail">Password</label>
        <input
          type="text"
          id="password"
          name="credentials"
          required
          v-model="password"
        />
        <label for="mail">Confirm password</label>
        <input
          type="text"
          id="confirm_password"
          name="credentials"
          required
          v-model="confirm_password"
        />
        <div class="credentials-button-container flex-col flex-center">
          <button
            class="credentials-submit-button"
            @click="handleCreateAccount"
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
import "./../style.css";

export default defineComponent({
  name: "Register",
  data() {
    return {
      username: "",
      mail: "",
      password: "",
      confirm_password: "",
    };
  },
  methods: {
    handleCreateAccount() {
      console.log("Register clicked!");
      console.log("Username", this.username);
      //this.username och this.password för att få användarnamn och lösenord från input-fälten
    },
  },
});
</script>
