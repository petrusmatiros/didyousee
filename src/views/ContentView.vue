<script setup lang="ts">
import './../style.css';
import MediaCard from '../components/MediaCard.vue';
import ReviewCard from '../components/ReviewCard.vue';
import CastCard from '../components/CastCard.vue';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import { PosterSize } from '../types/types';


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
            <img class="result-content-poster" v-else loading="lazy" :src="$props.model.currentMovie.poster_path || $props.model.currentSeries.poster_path" />
            <div class="loading-skeleton result-content-info gap-double flex-col flex-start" v-if="!($props.model.currentMovie.title || $props.model.currentSeries.name)"></div>
            <div v-else class="result-content-info gap-double flex-col flex-start">
              <div class="flex-col gap-quarter">
                <div class="result-content-info--top flex-row flex-start-center gap-half">
                  <h1 class="flex-row">{{ $props.model.currentMovie.title || $props.model.currentSeries.name }}</h1>
                  <!-- <select v-if="$props.model.currentSeries.seasons.length > 0" class="button">
                    <option value="default" selected>All Seasons</option>
                    <option v-for="(season, index) in $props.model.currentSeries.seasons" :value="'s' + (index + 1)" :key="'season' + index">
                      {{ season.name }}
                    </option>
                  </select> -->
                </div>
                <!-- TODO: se över flex-center för movies -->
                <div class="result-content-info--details gap-half flex-row flex-start-center"> 
    
                  <!-- Date -->
                  <!-- <span v-if="$props.model.currentMovie.release_date?.split('-')[0]">●</span> -->
                  <p> {{ $props.model.currentMovie.release_date?.split('-')[0] || $props.model.currentSeries.first_air_date?.split('-')[0] }}</p>
    
                  
                  <!-- Created by -->
                  <span v-if="$props.model.currentMovie.created_by && $props.model.currentMovie.created_by[0]?.name">●</span>
    
                  <p v-if="$props.model.currentMovie.created_by && $props.model.currentMovie.created_by[0]?.name"> {{ $props.model.currentMovie.created_by && $props.model.currentMovie.created_by[0]?.name }}</p>
    
                  <span v-if="$props.model.currentSeries.created_by[0]?.name">●</span>
                  <p v-if="$props.model.currentSeries.created_by[0]?.name"> {{ $props.model.currentSeries.created_by[0]?.name }}</p>
                  
    
                  <!-- Runtime or Average episode runtime -->
                  <span v-if="$props.model.currentMovie.runtime">●</span>
                  <span v-if="$props.model.currentSeries.episode_run_time[0]">●</span>
    
                  <p v-if="$props.model.currentMovie.runtime"> {{ Math.floor($props.model.currentMovie.runtime / 60).toString().padEnd(2, 'h') }} {{ ($props.model.currentMovie.runtime % 60).toString().padEnd(3, 'm') }}</p>
    
                  <p v-if="$props.model.currentSeries.episode_run_time[0]"> {{ Math.floor($props.model.currentSeries.episode_run_time[0] / 60).toString().padEnd(2, 'h') }} {{ ($props.model.currentSeries.episode_run_time[0] % 60).toString().padEnd(3, 'm') }}</p>
    
                  <!-- Status -->
                  <span v-if="$props.model.currentMovie.status">●</span>
                  <span v-if="$props.model.currentSeries.status">●</span>
                  <p v-if="$props.model.currentMovie.status"> {{ $props.model.currentMovie.status}}</p>
                  <p v-if="$props.model.currentSeries.status"> {{ $props.model.currentSeries.status }}</p>
    
                  
                  <!-- Series --> 
                  <!-- Episodes -->
                  <span v-if="$props.model.currentSeries.number_of_episodes">●</span>
                  <p v-if="$props.model.currentSeries.number_of_episodes"> {{ $props.model.currentSeries.number_of_episodes + " episodes" }}</p>
                  
                  <!-- Seasons -->
                  <span v-if="$props.model.currentSeries.number_of_seasons">●</span>
                  <p v-if="$props.model.currentSeries.number_of_seasons">{{ $props.model.currentSeries.number_of_seasons + " seasons" }}</p>
                </div>
              </div>
              <p v-if="$props.model.currentMovie.overview || $props.model.currentSeries.overview" class="result-content-info--overview">{{ $props.model.currentMovie.overview || $props.model.currentSeries.overview }}</p>
              <div class="result-content-more-info gap-double flex-col flex-center-start">
                 <div v-if="(($props.model.currentMovie.vote_average && $props.model.currentMovie.formatted_vote_count) || ($props.model.currentSeries.vote_average && $props.model.currentSeries.formatted_vote_count)) || $props.model.currentSeries.last_episode_to_air?.air_date || $props.model.currentSeries.next_episode_to_air?.air_date" class="result-content-more-info--primary gap-half flex-row flex-center-start">
                  <div class="flex-row flex-center-start gap-quarter" v-if="($props.model.currentMovie.vote_average && $props.model.currentMovie.formatted_vote_count)  || ($props.model.currentSeries.vote_average && $props.model.currentSeries.formatted_vote_count)">
                    <span class="material-symbols-rounded">star</span>
                    <div class="flex-col gap-quarter p-0 rating">
                      <p>
                        Rating: {{ $props.model.currentMovie.vote_average  || $props.model.currentSeries.vote_average  }}/10
                      </p>
                      <p class="rating-count ">
                        {{ $props.model.currentMovie.formatted_vote_count || $props.model.currentSeries.formatted_vote_count }}
                      </p>
                    </div>
                  </div>
                  <div v-if="$props.model.currentSeries.last_episode_to_air?.air_date">Latest episode: {{ $props.model.currentSeries.last_episode_to_air?.air_date }}</div>
                  <div v-if="$props.model.currentSeries.next_episode_to_air?.air_date">Next episode: {{ $props.model.currentSeries.next_episode_to_air?.air_date}}</div>
                </div>
                <div class="result-content-more-info--secondary gap-half flex-row flex-start-center">
                  <div v-if="$props.model.currentMovie.genres.length !== 0" class="gap-half flex-row flex-start-center">
                    <button class="button" v-for="(genre, index) in $props.model.currentMovie.genres" :key="index"
                      :genre="genre">
                      {{ genre.name }}
                    </button>
                  </div>
                  <div v-if="$props.model.currentSeries.genres.length !== 0" class="gap-half flex-row flex-start-center">
                    <button class="button" v-for="(genre, index) in $props.model.currentSeries.genres" :key="index"
                      :genre="genre">
                      {{ genre.name }}
                    </button>
                  </div>
                  <div v-if="$props.model.currentMovie.spoken_languages.length !== 0" class="gap-half flex-row flex-start-center">
                    <button class="button" v-for="(language, index) in $props.model.currentMovie.spoken_languages"
                      :key="index" :language="language">
                      {{ language.english_name }}
                    </button>
                  </div>
                  <div v-if="$props.model.currentSeries.spoken_languages.length !== 0" class="gap-half flex-row flex-start-center">
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
              <!-- TODO: Filtrera denna och bestäm hur det ska se ut.-->
              <!-- <p>{{ $props.model.currentMovie.credits || $props.model.currentSeries.credits }}</p> -->
              <!-- Denna är enbart för Movie -->
              <CastCard v-if="$props.model.currentMovie.credits.cast.length > 0" v-for="(cast, index) in $props.model.currentMovie.credits.cast" :key="index" :cast="cast"/>
            </div>
          </div>
          <div class="info-container gap-full flex-row flex-center">
            <div class="info-card gap-quarter flex-col">
              <h1>Reviews</h1>
              <!-- TODO: Filtrera denna och bestäm hur det ska se ut.-->
              <!-- <p>{{ $props.model.currentMovie.reviews || $props.model.currentSeries.reviews }}</p> -->
              <!-- Denna är enbart för Movie -->
              <ReviewCard v-if="$props.model.currentMovie.reviews.length > 0" v-for="(review, index) in $props.model.currentMovie.reviews" :key="index" :review="review"/>
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
              <span>
                <!-- Denna fungerar enbart för Movie -->
                {{ $props.model.currentMovie.formatted_budget}}
              </span>
            </div>
            <div class="info-card gap-quarter flex-col">
              <h1>Revenue</h1>
              <span :class="$props.model.currentMovie.revenue > $props.model.currentMovie.budget ? 'revenue-positive' : $props.model.currentMovie.revenue < $props.model.currentMovie.budget ? 'revenue-negative' : 'nothing'">
              <!-- Denna fungerar enbart för Movie -->
              {{ $props.model.currentMovie.formatted_revenue }}
              </span>
            </div>
          </div>
        </div>
      </div>
    
      <div class="similar-list-container gap-fullr flex-center flex-col">
          <div v-if="$props.model.recommendedMovies.length > 0 " class="carousel flex-col flex-center-start">
          <div class="carousel-title">
            <h1>Recommended Movies</h1>
          </div>
          <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Recommended Movies">
            <SplideSlide v-for="(movie, index) in $props.model.recommendedMovies" :key="index">
              <MediaCard :media="movie" :media-type="'movie'" />
            </SplideSlide>
          </Splide>
        </div>

        <div v-else class="carousel flex-col flex-center-start">
          <div class="carousel-title">
            <h1>Recommended Series</h1>
          </div>
          <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Recommended Series">
            <SplideSlide v-for="(series, index) in $props.model.recommendedSeries" :key="index">
              <MediaCard :media="series" :media-type="'tv'" />
            </SplideSlide>
          </Splide>
        </div>

        <div v-if="$props.model.similarMovies.length > 0" class="carousel flex-col flex-center-start">
          <div class="carousel-title">
            <h1>Similar Movies</h1>
          </div>
          <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Similar Movies">
            <SplideSlide v-for="(movie, index) in $props.model.similarMovies" :key="index">
              <MediaCard :media="movie" :media-type="'movie'" />
            </SplideSlide>
          </Splide>
        </div>

        <div v-else class="carousel flex-col flex-center-start">
          <div class="carousel-title">
            <h1>Similar Series</h1>
          </div>
          <Splide data-splide='{"type":"loop","perPage":5}' :options="{ rewind: true, lazy: true}" aria-label="Similar Series">
            <SplideSlide v-for="(series, index) in $props.model.similarSeries" :key="index">
              <MediaCard :media="series" :media-type="'tv'" />
            </SplideSlide>
          </Splide>
        </div>

      </div>


      <!-- <div class="similar-list-container gap-full flex-center flex-col">
          <p>Recommended content</p>
          <div v-if="$props.model.recommendedMovies" class="similar-list gap-full flex-row flex-center">
            <MediaCard v-for="(movie, index) in $props.model.recommendedMovies" :key="index" :media="movie" :media-type="'movie'"/>
          </div>
          <div v-else-if="$props.model.recommendedSeries" class="similar-list gap-full flex-row flex-center">
            <MediaCard v-for="(series, index) in $props.model.recommendedSeries" :key="index" :media="series" :media-type="'tv'"/>
          </div>
      </div>
      <div class="similar-list-container gap-full flex-center flex-col">
          <p>Similar content</p>
          <div v-if="$props.model.similarMovies" class="similar-list gap-full flex-row flex-center">
            <MediaCard v-for="(movie, index) in $props.model.similarMovies" :key="index" :media="movie" :media-type="'movie'"/>
          </div>
          <div v-else-if="$props.model.similarSeries" class="similar-list gap-full flex-row flex-center">
            <MediaCard v-for="(series, index) in $props.model.similarSeries" :key="index" :media="series" :media-type="'tv'"/>
          </div>
      </div> -->
    </template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ContentView',
  components: {
    MediaCard,
    ReviewCard,
    CastCard,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
});
</script>