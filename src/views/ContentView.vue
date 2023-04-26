<script setup lang="ts">
import './../style.css';
import { defineEmits } from 'vue';
import MediaCard from '../components/MediaCard.vue';

const emit = defineEmits(["handleLiked", "handleWatchlist", "handleSeen", "handleDisliked", "goBack"])

function handleLikedACB() { emit("handleLiked") }
function handleWatchlistACB() { emit("handleWatchlist") }
function handleSeenACB() { emit("handleSeen") }
function handleDislikedACB() { emit("handleDisliked") }
function goBackACB() { emit("goBack") }

</script>

<template>
  <div class="result flex-col">
    <button class="button back" @click="goBackACB()">
      <span class="material-symbols-rounded">keyboard_backspace</span>
    </button>
    <!-- <div class="overlay"></div> -->
    <!-- <div class="popup">
            <div class="popup-close"><span class="material-symbols-rounded">close</span></div>
            <h1>Seasons:</h1>
            <p>Season 1</p>
            <p>Season 2</p>
            <p>Season 3</p>
            <p>Season 4</p>
          </div> -->
    <div class="result-main-info flex-col">
      <div class="result-content flex-row">
        <div class="loading-skeleton result-content-poster" v-if="!$props.model.currentContent.poster_path"></div>
        <img class="result-content-poster" v-else loading="lazy" :src="$props.model.currentContent.poster_path" />
        <div class="result-content-info flex-col flex-start">
          <h1 class="result-content-info--title">{{ $props.model.currentContent.title || $props.model.currentContent.name
          }}</h1>
          <p class="result-content-info--overview">{{ $props.model.currentContent.overview }}</p>
          <div class="result-content-more-info flex-row flex-center-start">
            <div class="result-content-more-info--primary flex-col flex-center-start">
              <p>Rating: {{ $props.model.currentContent.vote_average }}</p>
              <p>Release date: {{ $props.model.currentContent.release_date || $props.model.currentContent.first_air_date
              }}</p>
            </div>
            <div class="result-content-more-info--secondary flex-col flex-center-start">
              <div class="flex-row flex-center">
                <button class="button" v-for="(genre, index) in $props.model.currentContent.genres" :key="index"
                  :genre="genre">
                  {{ genre.name }}
                </button>
              </div>
              <div class="flex-row flex-center">
                <button class="button" v-for="(language, index) in $props.model.currentContent.spoken_languages"
                  :key="index" :language="language">
                  {{ language.english_name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-buttons flex-row flex-center">
        <button class="button flex-row flex-center">
          <h1>Add to list</h1>
          <span class="material-symbols-rounded">library_add</span>
        </button>
      </div>
      <div class="list-buttons flex-row flex-center">
        <button class="button" @click="handleLikedACB()">
          <span class="material-symbols-rounded">favorite</span>
        </button>
        <button class="button" @click="handleWatchlistACB">
          <span class="material-symbols-rounded">bookmark</span>
        </button>
        <button class="button" @click="handleSeenACB">
          <span class="material-symbols-rounded">task_alt</span>
        </button>
        <button class="button" @click="handleDislikedACB">
          <span class="material-symbols-rounded">block</span>
        </button>
      </div>
    </div>

    <div class="video-player-container" id="video-player-container">
        <iframe class="contentVideoPlayer" :src="$props.model.currentContent.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>


    <div class="detailed-info flex-col">
      <div class="info-container flex-row flex-center">
        <div class="info-card flex-col">
          <h1>Cast</h1>
          <p>
            Information
            test
          </p>
        </div>
      </div>
      <div class="info-container flex-row flex-center">
        <div class="info-card flex-col">
          <h1>Reviews</h1>
          <p>Information</p>
        </div>
        <div class="info-card flex-col width-25">
          <h1>Watch providers</h1>
          <p>Information</p>
          <p>Provided by JustWatch</p>
        </div>
      </div>
      <div class="info-container flex-row flex-center">
        <div class="info-card flex-col">
          <h1>Budget</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet
            justo venenatis nunc dignissim maximus quis sed erat.
          </p>
        </div>
        <div class="info-card flex-col">
          <h1>Revenue</h1>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContentView',
  components: {
    MediaCard,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
});
</script>