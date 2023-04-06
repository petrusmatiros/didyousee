<template>
  <div>
    <h1>{{ message }}</h1>
    <p>THIS IS THE PROFILE RESULT VIEW</p>
  </div>
</template>

<script lang="ts">
import './../style.css'

export default ({
  name: 'Profile',
  data() {
    return {
      message: 'PROFILE RESULT',
    }
  },
})
</script>
