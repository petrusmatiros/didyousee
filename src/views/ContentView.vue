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
  <div class="result gap-full flex-col">
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
    <div class="result-main-info gap-full flex-col">
      <div class="result-content gap-full flex-row">
        <div class="loading-skeleton result-content-poster" v-if="!($props.model.currentMovie.poster_path || $props.model.currentSeries.poster_path)"></div>
        <img class="result-content-poster" v-else loading="lazy" :src="($props.model.currentMovie.poster_path || $props.model.currentSeries.poster_path)" />
        <div class="result-content-info gap-full flex-col flex-start">
          <div class="flex-col">
            <div class="flex-row gap-half">
              <h1 class="result-content-info--title">{{ $props.model.currentMovie.title || $props.model.currentSeries.name }}</h1>
              <button class="button">Season 1</button>
            </div>
            <!-- TODO: se över flex-center för movies -->
            <div class="gap-half flex-row flex-start-center"> 

              <!-- Date -->
              <p> {{ $props.model.currentMovie.release_date?.split('-')[0] || $props.model.currentSeries.first_air_date?.split('-')[0] }}</p>

              <!-- Director-->
              <span>●</span>
              <!-- TODO, created by -->
              <!-- Series--> <p v-if="$props.model.currentMovie.created_by"> {{ $props.model.currentSeries.created_by[0].name }}</p>
              <!-- Movies--> <p v-else> Director</p>
              
              <!-- Runtime -->
              <span>●</span>

              <!-- Movies--> <p v-if="$props.model.currentMovie.runtime"> {{ Math.floor($props.model.currentMovie.runtime / 60).toString().padStart(2, '0') }}:{{ ($props.model.currentMovie.runtime % 60).toString().padStart(2, '0') }}</p>
              <p v-else-if="$props.model.currentSeries.episode_run_time[0]"> {{ Math.floor($props.model.currentSeries.episode_run_time[0] / 60).toString().padStart(2, '0') }}:{{ ($props.model.currentSeries.episode_run_time[0] % 60).toString().padStart(2, '0') }}</p>
              <!-- Series--> <p v-else> {{$props.model.currentSeries.status }}</p>


              <!-- Episodes -->
              <span v-if="$props.model.currentSeries.number_of_episodes">●</span>
              <!-- Series--> <p v-if="$props.model.currentSeries.number_of_episodes"> {{ $props.model.currentSeries.number_of_episodes + " episodes" }}</p>
              <!-- Movies--> <p v-else></p>

              <!-- Seasons -->
              <span v-if="$props.model.currentSeries.number_of_seasons">●</span>
              <!-- Series--> <p v-if="$props.model.currentSeries.number_of_seasons">{{ $props.model.currentSeries.number_of_seasons + " seasons" }}</p>
              <!-- Movies--> <p v-else></p>
            </div>
          </div>
          <p class="result-content-info--overview">{{ $props.model.currentMovie.overview ||$props.model.currentSeries.overview }}</p>
          <div class="result-content-more-info gap-full flex-row flex-center-start">
             <div class="result-content-more-info--primary gap-full flex-col flex-center-start">
              <p>Rating: {{ $props.model.currentMovie.vote_average  || $props.model.currentSeries.vote_average  }}/10</p>
              <p v-if="$props.model.currentSeries.last_episode_to_air">Latest episode: {{ $props.model.currentSeries.last_episode_to_air?.air_date }}</p>
              <p v-if="$props.model.currentSeries.next_episode_to_air">Next episode: {{ $props.model.currentSeries.next_episode_to_air?.air_date}}</p>



            </div>
            <div class="result-content-more-info--secondary gap-full flex-col flex-center-start">
              <div class="gap-full flex-row flex-center">
                <button class="button" v-for="(genre, index) in ($props.model.currentMovie.genres || $props.model.currentSeries.genres)" :key="index"
                  :genre="genre">
                  {{ genre.name }}
                </button>
              </div>
              <div class="gap-full flex-row flex-center">
                <button class="button" v-for="(language, index) in ($props.model.currentMovie.spoken_languages || $props.model.currentSeries.spoken_languages)"
                  :key="index" :language="language">
                  {{ language.english_name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list-buttons gap-full flex-row flex-center">
        <button class="button gap-quarter flex-row flex-center">
          <h1>Add to list</h1>
          <span class="material-symbols-rounded">library_add</span>
        </button>
      </div>
      <div class="list-buttons gap-full flex-row flex-center">
        <button class="button gap-quarter" @click="handleLikedACB()">
          <span class="material-symbols-rounded">favorite</span>
        </button>
        <button class="button gap-quarter" @click="handleWatchlistACB">
          <span class="material-symbols-rounded">bookmark</span>
        </button>
        <button class="button gap-quarter" @click="handleSeenACB">
          <span class="material-symbols-rounded">task_alt</span>
        </button>
        <button class="button gap-quarter" @click="handleDislikedACB">
          <span class="material-symbols-rounded">block</span>
        </button>
      </div>
    </div>

    <div v-if="($props.model.currentMovie.video || $props.model.currentSeries.video) !== ''" class="video-player-container" id="video-player-container">
        <iframe loading="lazy" :key="($props.model.currentMovie.video || $props.model.currentSeries.video) " class="contentVideoPlayer" :src="($props.model.currentMovie.video || $props.model.currentSeries.video) " title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>


    <div class="detailed-info gap-full flex-col">
      <div class="info-container gap-full flex-row flex-center">
        <div class="info-card gap-quarter flex-col">
          <h1>Cast</h1>
          <p>
            Information
          </p>
          <!-- TODO: Filtrera denna och bestäm hur det ska se ut.-->
          <!-- <p>{{ $props.model.currentMovie.credits || $props.model.currentSeries.credits  }}</p> -->
        </div>
      </div>
      <div class="info-container gap-full flex-row flex-center">
        <div class="info-card gap-quarter flex-col">
          <h1>Reviews</h1>
          <p>Information</p>
          <!-- TODO: Filtrera denna och bestäm hur det ska se ut.-->
          <!-- <p>{{ $props.model.currentMovie.reviews || $props.model.currentSeries.reviews }}</p> -->
        </div>
         <div class="info-card gap-quarter flex-col width-25">
          <h1>Watch providers</h1>
          <p>Information</p>
          <p>Provided by JustWatch</p>
        </div>
      </div>
      <div class="info-container gap-full flex-row flex-center">
        <div class="info-card gap-quarter flex-col">
          <h1>Budget</h1>
          <p>
            <!-- Denna fungerar enbart för Movie -->
            <!-- {{ $props.model.currentMovie.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} -->
          </p>
        </div>
        <div class="info-card gap-quarter flex-col">
          <h1>Revenue</h1>
          <p>
          <!-- Denna fungerar enbart för Movie -->
          <!-- {{ $props.model.currentMovie.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} -->
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="similar-list-container gap-full flex-center flex-col">
      <p>Similar Movies</p>
      <div class="similar-list gap-full flex-row flex-center">
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