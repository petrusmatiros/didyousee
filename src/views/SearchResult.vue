<template>
  <div>
    <h1>{{ message }}</h1>
    <p>THIS IS THE SEARCH RESULT VIEW</p>
  </div>
</template>

<script lang="ts">
import './../style.css'

export default ({
  name: 'SearchResult',
  data() {
    return {
      message: 'SEARCH RESULT',
    }
  },
})
</script>
