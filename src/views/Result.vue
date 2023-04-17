<template>
  <div class="result flex-col">
    <button class="button back" @click="goBackACB()">
      <span class="material-symbols-rounded">keyboard_backspace</span>
    </button>
    <div class="result-main-info flex-col">
      <div class="result-content flex-row">
        <div class="loading-skeleton result-content-poster" v-if="!poster"></div>
        <img class="result-content-poster" v-else loading="lazy" :src="poster" />
        <div class="result-content-info flex-col flex-start">
          <h1 class="result-content-info--title">{{ title }}</h1>
          <p class="result-content-info--overview">{{ overview }}</p>
          <div class="result-content-more-info flex-row flex-center-start">
            <div class="result-content-more-info--primary flex-col flex-center-start">
              <p>Rating: {{ vote_average }}</p>
              <p>Release date: {{ release_date }}</p>
            </div>
            <div
              class="result-content-more-info--secondary flex-col flex-center-start"
            >
              <div class="flex-row flex-center">
                <button
                  v-for="(genre, index) in genres"
                  :key="index"
                  :genre="genre"
                >
                  {{ genre.name }}
                </button>
              </div>
              <div class="flex-row flex-center">
                <button
                  v-for="(language, index) in languages"
                  :key="index"
                  :language="language"
                >
                  {{ language.english_name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-buttons flex-row flex-center">
        <button @click="handleLikedACB">
          <span class="material-symbols-rounded">favorite</span>
        </button>
        <button @click="handleWatchlistACB">
          <span class="material-symbols-rounded">bookmark</span>
        </button>
        <button @click="handleSeenACB">
          <span class="material-symbols-rounded">task_alt</span>
        </button>
        <button @click="handleDislikedACB">
          <span class="material-symbols-rounded">block</span>
        </button>
      </div>
    </div>

    <div class="detailed-info flex-col">
      <div class="info-container flex-row flex-center">
        <div class="info-card flex-col width-45">
          <h1>Title</h1>
          <p>Information</p>
        </div>
        <div class="info-card flex-col">
          <h1>Title</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet
            justo venenatis nunc dignissim maximus quis sed erat.
          </p>
        </div>
      </div>
      <div class="info-container flex-row flex-center">
        <div class="info-card flex-col">
          <h1>Title</h1>
          <p>Information</p>
        </div>
        <div class="info-card flex-col width-15">
          <h1>Title</h1>
          <p>Information</p>
        </div>
      </div>
      <div class="info-container flex-row flex-center">
        <div class="info-card flex-col">
          <h1>Title</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet
            justo venenatis nunc dignissim maximus quis sed erat. Nullam
            ultrices sodales risus vel fringilla. Sed dictum sit amet ex eu
            commodo. Nulla vel ornare felis. Duis sed ante sed tellus tincidunt
            maximus. Proin malesuada sodales commodo. Fusce aliquam ullamcorper
            nisl, id finibus nulla. Quisque nec sem rutrum, commodo mi vitae,
            lobortis urna. Praesent et purus sit amet sapien tempus consequat a
            ac arcu. Nulla at hendrerit neque, vel elementum mauris.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Fusce suscipit lectus eu facilisis
            condimentum. Cras vitae eros metus. Duis eu sodales dui, eget
            fringilla ligula
          </p>
        </div>
        <div class="info-card flex-col">
          <h1>Title</h1>
          <p>Information</p>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="similar-list-container flex-center flex-col">
    <p>Similar Movies</p>
    <div class="similar-list flex-row flex-center">
      <content-card
        v-for="(movie, index) in movies"
        :key="index"
        :movie="movie"
      />
    </div>
  </div> -->
</template>

<script lang="ts">

import { defineComponent } from "vue";
import "./../style.css";
import MovieCard from "../components/MovieCard.vue";
import {model, searchMedia, getTrending, getMedia, getSimilarMedia} from "../model/model";
import { MediaType } from '../types/types';

export default defineComponent({
  name: "Result",
  components: {
    MovieCard,
  },
  async mounted() {
    const id = this.$route.query.id;
      if (id) {
        const mediaID = JSON.parse(id as string);
        console.log("Media from query parameter:", mediaID);
        this.retrieveMediaData(mediaID);
        // this.retrieveSimilarMedia(mediaID);
      }
  },
  methods: {
    async retrieveMediaData(id: string) {
      const movie: any | undefined = await getMedia(MediaType.MOVIE, id);
      if (movie) {
        console.log("dataMediaMounted", movie);
        this.updateData(movie);
      }
    },
    updateData(response: any) {
      console.log("Response",response)
      this.title = response.data.title;
      this.poster = response.data.poster_path ? `https://image.tmdb.org/t/p/w500${
        response.data.poster_path
      }`: "/src/assets/no-poster.svg";
      this.overview = response.data.overview;
      this.vote_average = response.data.vote_average;
      this.release_date = response.data.release_date;
      this.languages = response.data.spoken_languages;
      this.genres = response.data.genres;
    },
    async retrieveSimilarMedia(id:string) {
      const movie: any | undefined = await getSimilarMedia(MediaType.MOVIE, id);
      if (movie) {
        console.log("dataSimilarMediaMounted", movie);
        this.movies = movie.data.results.splice(0, 8);
      }
    },
    goBackACB() {
      console.log("Back button clicked");
      this.$router.go(-1); // Go back one step in Vue Router history
    },
    //TODO!
    handleLikedACB() {
      // Handle click event for the "liked" button
      console.log("Liked button clicked");
      // Add your custom logic here
    },
    handleWatchlistACB() {
      // Handle click event for the "watchlist" button
      console.log("Watchlist button clicked");
      // Add your custom logic here
    },
    handleSeenACB() {
      // Handle click event for the "seen" button
      console.log("Seen button clicked");
      // Add your custom logic here
    },
    handleDislikedACB() {
      // Handle click event for the "disliked" button
      console.log("Disliked button clicked");
      // Add your custom logic here
    },
  },
  data() {
    return {
      id: "",
      title: "",
      overview: "",
      poster: "",
      genres: [] as any[],
      vote_average: "",
      release_date: "",
      languages: [] as any[],
      movies: [
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
        {
          title: "",
          poster_path: "",
        },
      ],
    };
  },
});
</script>
