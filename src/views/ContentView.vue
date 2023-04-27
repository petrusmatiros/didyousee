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
        <div class="loading-skeleton result-content-poster" v-if="!$props.model.currentContent.poster_path"></div>
        <img class="result-content-poster" v-else loading="lazy" :src="$props.model.currentContent.poster_path" />
        <div class="result-content-info gap-full flex-col flex-start">
          <div class="flex-col">
            <h1 class="result-content-info--title">{{ $props.model.currentContent.title || $props.model.currentContent.name
            }}</h1>
            <!-- TODO: se över flex-center för movies -->
            <div class="gap-half flex-row flex-center"> 

              <!-- Date -->
              <p> {{ $props.model.currentContent.release_date || $props.model.currentContent.first_air_date }}</p>

              <!-- Director-->
              <span>●</span>
              <!-- Series--> <p v-if="$props.model.currentContent.created_by"> {{ $props.model.currentContent.created_by[0].name }}</p>
              <!-- Movies--> <p v-else> Director</p>
              
              <!-- Runtime -->
              <span>●</span>
              <!-- Movies--> <p v-if="$props.model.currentContent.runtime"> {{ Math.floor($props.model.currentContent.runtime / 60) }}:{{ String($props.model.currentContent.runtime % 60).padStart(2, '0') }}</p>
              <!-- Series--> <p v-else> HH:MM</p>

              <!-- Episodes -->
              <span>●</span>
              <!-- Series--> <p v-if="$props.model.currentContent.number_of_episodes"> {{ $props.model.currentContent.number_of_episodes + " episodes" }}</p>
              <!-- Movies--> <p v-else> text</p>

              <!-- Seasons -->
              <span>●</span>
              <!-- Series--> <p v-if="$props.model.currentContent.number_of_seasons">{{ $props.model.currentContent.number_of_seasons + " seasons" }}</p>
              <!-- Movies--> <p v-else> text</p>
            </div>
          </div>
          <p class="result-content-info--overview">{{ $props.model.currentContent.overview }}</p>
          <div class="result-content-more-info gap-full flex-row flex-center-start">
            <div class="result-content-more-info--primary gap-full flex-col flex-center-start">
              <p>Rating: {{ $props.model.currentContent.vote_average }}</p>
              <p>Release date: {{ $props.model.currentContent.release_date || $props.model.currentContent.first_air_date
              }}</p>
            </div>
            <div class="result-content-more-info--secondary gap-full flex-col flex-center-start">
              <div class="gap-full flex-row flex-center">
                <button class="button" v-for="(genre, index) in $props.model.currentContent.genres" :key="index"
                  :genre="genre">
                  {{ genre.name }}
                </button>
              </div>
              <div class="gap-full flex-row flex-center">
                <button class="button" v-for="(language, index) in $props.model.currentContent.spoken_languages"
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

    <div v-if="$props.model.currentContent.video !== ''" class="video-player-container" id="video-player-container">
        <iframe loading="lazy" :key="$props.model.currentContent.video" class="contentVideoPlayer" :src="$props.model.currentContent.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>


    <div class="detailed-info gap-full flex-col">
      <div class="info-container gap-full flex-row flex-center">
        <div class="info-card gap-quarter flex-col">
          <h1>Cast</h1>
          <p>
            Information
          </p>
          <!-- TODO: Filtrera denna och bestäm hur det ska se ut.-->
          <!-- <p>{{ $props.model.currentContent.credits }}</p> -->
        </div>
      </div>
      <div class="info-container gap-full flex-row flex-center">
        <div class="info-card gap-quarter flex-col">
          <h1>Reviews</h1>
          <p>Information</p>
          <!-- TODO: Filtrera denna och bestäm hur det ska se ut.-->
          <!-- <p>{{ $props.model.currentContent.reviews }}</p> -->
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
            <!-- {{ $props.model.currentContent.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} -->
          </p>
        </div>
        <div class="info-card gap-quarter flex-col">
          <h1>Revenue</h1>
          <p>
          <!-- Denna fungerar enbart för Movie -->
          <!-- {{ $props.model.currentContent.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }) }} -->
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