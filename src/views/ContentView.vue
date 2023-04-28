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
        <div class="result-content-info gap-double flex-col flex-start">
          <div class="flex-col gap-quarter">
            <div class="result-content-info--top flex-row flex-start-center gap-half">
              <h1 class="flex-row">{{ $props.model.currentMovie.title || $props.model.currentSeries.name }}</h1>
              <button class="button">Season 1</button>
            </div>
            <!-- TODO: se över flex-center för movies -->
            <div class="result-content-info--details gap-half flex-row flex-start-center"> 

              <!-- Date -->
              <p> {{ $props.model.currentMovie.release_date?.split('-')[0] || $props.model.currentSeries.first_air_date?.split('-')[0] }}</p>

              <!-- Director -->
              <span v-if="$props.model.currentMovie.release_date?.split('-')[0]">●</span>

              <p v-if="$props.model.currentMovie.created_by[0]?.name || $props.model.currentSeries.created_by[0]?.name"> {{ $props.model.currentMovie.created_by[0]?.name || $props.model.currentSeries.created_by[0].name }}</p>
              
              <span v-if="$props.model.currentMovie.created_by || $props.model.currentSeries.created_by[0]?.name">●</span>

              <!-- Runtime or Average episode runtime -->
              <p v-if="$props.model.currentMovie.runtime"> {{ Math.floor($props.model.currentMovie.runtime / 60).toString().padEnd(2, 'h') }} {{ ($props.model.currentMovie.runtime % 60).toString().padEnd(3, 'm') }}</p>

              <p v-else-if="$props.model.currentSeries.episode_run_time[0]"> {{ Math.floor($props.model.currentSeries.episode_run_time[0] / 60).toString().padEnd(2, 'h') }}:{{ ($props.model.currentSeries.episode_run_time[0] % 60).toString().padEnd(3, 'm') }}</p>

              <!-- Status -->
              <span v-if="$props.model.currentMovie.status || $props.model.currentSeries.status ">●</span>
              
              <p v-if="$props.model.currentMovie.status || $props.model.currentSeries.status"> {{ $props.model.currentMovie.status || $props.model.currentSeries.status }}</p>

              <!-- Series--> 
              <!-- Episodes -->
              <span v-if="$props.model.currentSeries.number_of_episodes">●</span>
             <p v-if="$props.model.currentSeries.number_of_episodes"> {{ $props.model.currentSeries.number_of_episodes + " episodes" }}</p>

              <!-- Seasons -->
              <span v-if="$props.model.currentSeries.number_of_seasons">●</span>
              <p v-if="$props.model.currentSeries.number_of_seasons">{{ $props.model.currentSeries.number_of_seasons + " seasons" }}</p>
            </div>
          </div>
          <p class="result-content-info--overview">{{ $props.model.currentMovie.overview || $props.model.currentSeries.overview }}</p>
          <div class="result-content-more-info gap-double flex-col flex-center-start">
             <div class="result-content-more-info--primary gap-half flex-row flex-center-start">
              <div>Rating: {{ $props.model.currentMovie.vote_average  || $props.model.currentSeries.vote_average  }}/10</div>
              <div v-if="$props.model.currentSeries.last_episode_to_air?.air_date">Latest episode: {{ $props.model.currentSeries.last_episode_to_air?.air_date }}</div>
              <div v-if="$props.model.currentSeries.next_episode_to_air?.air_date">Next episode: {{ $props.model.currentSeries.next_episode_to_air?.air_date}}</div>
            </div>
            <div class="result-content-more-info--secondary gap-full flex-row flex-center-start">
              <div v-if="$props.model.currentMovie.genres.length !== 0" class="gap-full flex-row flex-center">
                <button class="button" v-for="(genre, index) in $props.model.currentMovie.genres" :key="index"
                  :genre="genre">
                  {{ genre.name }}
                </button>
              </div>
              <div v-if="$props.model.currentSeries.genres.length !== 0" class="gap-full flex-row flex-center">
                <button class="button" v-for="(genre, index) in $props.model.currentSeries.genres" :key="index"
                  :genre="genre">
                  {{ genre.name }}
                </button>
              </div>
              <div v-if="$props.model.currentMovie.spoken_languages.length !== 0" class="gap-full flex-row flex-center">
                <button class="button" v-for="(language, index) in $props.model.currentMovie.spoken_languages"
                  :key="index" :language="language">
                  {{ language.english_name }}
                </button>
              </div>
              <div v-if="$props.model.currentSeries.spoken_languages.length !== 0" class="gap-full flex-row flex-center">
                <button class="button" v-for="(language, index) in $props.model.currentSeries.spoken_languages"
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
          <!-- TODO -->
          <h1>Watch providers</h1>
          <p>Information</p>
          <p>Provided by JustWatch</p>
        </div>
      </div>
      <div v-if="$props.model.currentMovie.budget || $props.model.currentMovie.revenue" class="info-container gap-full flex-row flex-center">
        <div  class="info-card gap-quarter flex-col">
          <h1>Budget</h1>
          <p>
            <!-- Denna fungerar enbart för Movie -->
            {{ $props.model.currentMovie.formatted_budget}}
          </p>
        </div>
        <div class="info-card gap-quarter flex-col">
          <h1>Revenue</h1>
          <p :class="$props.model.currentMovie.revenue > $props.model.currentMovie.budget ? 'revenue-positive' : $props.model.currentMovie.revenue < $props.model.currentMovie.budget ? 'revenue-positive' : 'nothing'">
          <!-- Denna fungerar enbart för Movie -->
          {{ $props.model.currentMovie.formatted_revenue }}
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