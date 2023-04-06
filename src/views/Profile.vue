<template>
  <div>
    <h1>{{ message }}</h1>
    <p>THIS IS THE PROFILE RESULT VIEW</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './../style.css'

export default defineComponent({
  name: 'Profile',
  mounted() {
    // TODO: Ändra till token! Auth!
    const isValidCookie = 0;

    if (!isValidCookie) {
      // Omdirigera till inloggningssidan
      this.$router.push('/login');
    }
  },
  data() {
    return {
      message: 'PROFILE RESULT',
    }
  },
})
</script>
