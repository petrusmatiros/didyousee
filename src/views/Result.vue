<template>
  <div class="result flex-col">
    <div class="main-info flex-col">
      <div class="content flex-row">
        <img class="loading-skeleton" loading="lazy" :src="poster_path" />
        <div class="content-info flex-col flex-start">
          <h1 class="content-info--title">{{ title }}</h1>
          <p class="content-info--overview">{{ overview }}</p>
          <div class="content-more-info flex-row flex-center-start">
            <div class="content-more-info--primary flex-col flex-center-start">
              <p>Rating: {{ vote_average }}</p>
              <p>Release date: {{ release_date }}</p>
            </div>
            <div
              class="content-more-info--secondary flex-col flex-center-start"
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
          <i class="material-symbols-outlined">favorite</i>
        </button>
        <button @click="handleWatchlistACB">
          <i class="material-symbols-outlined">bookmark</i>
        </button>
        <button @click="handleSeenACB">
          <i class="material-symbols-outlined">task_alt</i>
        </button>
        <button @click="handleDislikedACB">
          <i class="material-symbols-outlined">block</i>
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
      <movie-card
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
import {movie, listing } from "../model/model";
import { model, searchMovie, getTrending, getMedia, getSimilarMedia} from "../model/model";

export default defineComponent({
  name: "Result",
  components: {
    MovieCard,
  },
  async mounted() {
    const id = this.$route.query.id;
      if (id) {
        const mediaID : string = JSON.parse(id as string);
        console.log("Media from query parameter:", mediaID);
        this.retrieveMediaData(mediaID);
      }
  },
  methods: {
    async retrieveMediaData(id: string) {
      const movie : movie = await getMedia(id);
      console.log("retrieveMediaData", movie);
      if (movie) {
        this.updateData(movie);
      }
    },
    updateData(movie : movie) {
      this.title = movie.title;
      this.poster_path = movie.poster_path as string;
      this.overview = movie.overview;
      this.vote_average = movie.vote_average;
      this.release_date = movie.release_date;
      this.languages = movie.spoken_languages;
      this.genres = movie.genres;
    },
    async retrieveSimilarMedia(id:string) {
      const movies: listing<movie> = await getSimilarMedia(id);
      if (movies) {
        console.log("dataSimilarMediaMounted", movies);
        this.movies = movies.results.splice(0, 8);
      }
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
    const movies : movie[] | any[] = [
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
      ];
    return {
      id: "",
      title: "",
      overview: "",
      poster_path: "",
      genres: [],
      vote_average: 0,
      release_date: "",
      languages: [],
      movies,
    };
  },
});
</script>
