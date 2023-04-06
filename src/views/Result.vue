<template>
  <div class="result">
    <div class="main-info">
      <div class="content">
        <img alt="poster"
          src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQA_-tL18_rj9zEcjN6n41NEaJm-kRNF9UeOtvksZ4z_OW6jRA9">
        <div class="content-info">
          <h1>{{ title }}</h1>
          <p>{{ overview }}</p>
        </div>
      </div>
      <div class="list-buttons">
        <button><i class="material-symbols-outlined">favorite</i></button>
        <button><i class="material-symbols-outlined">bookmark</i></button>
        <button><i class="material-symbols-outlined">task_alt</i></button>
        <button><i class="material-symbols-outlined">block</i></button>
      </div>
    </div>
    <div class="detailed-info">
      <div v-for="(value, key) in display" :key="key">
        <h1 v-if="value">{{ key }}:</h1> <p v-if="value">{{ value }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import './../style.css'

export default defineComponent({
  name: 'Result',
  mounted() {
    // Access the movie object from query parameters and parse it into an object
    const movieParam = this.$route.query.id;
    if (movieParam) {
      // TODO: Ändra till MovieID när vi har API:n!
      const movieID = JSON.parse(movieParam as any);
      console.log("Movie from query parameter:", movieID);
      this.title = movieID;
    }
  },
  data() {
    return {
      id: '',
      title: '',
      overview: 'A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.',
      display: {
        genres: 'Drama',    
        poster: '',
        og_lang: 'English',
        release_date: '2003',
        popularity: '0.5',
      }
    }

  },
});
</script>
