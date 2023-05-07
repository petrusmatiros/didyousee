<script setup lang="ts">
import "./../style.css";
import ReviewCard from "../components/ReviewCard.vue";
import CastCard from "../components/CastCard.vue";
import WatchProviders from "../components/WatchProviders.vue";
import Carousel from "../components/Carousel.vue";

const emit = defineEmits([
  "handleLiked",
  "handleWatchlist",
  "handleSeen",
  "handleDisliked",
  "goBack",
  "goToReviewPage",
  "goToCastPage",
]);

function handleLikedACB() {
  emit("handleLiked");
}
function handleWatchlistACB() {
  emit("handleWatchlist");
}
function handleSeenACB() {
  emit("handleSeen");
}
function handleDislikedACB() {
  emit("handleDisliked");
}
function goBackACB() {
  emit("goBack");
}
function goToReviewPageACB() {
  emit("goToReviewPage");
}
function goToCastPageACB() {
  emit("goToCastPage");
}
</script>

<template>
  <!-- <div class="overlay"></div> -->
  <div class="backdrop loading-skeleton" v-if="!(
      $props.model.currentMovie.backdrop_path ||
      $props.model.currentSeries.backdrop_path
    )"></div>
  <div
    v-else
    class="backdrop"
    :style="{
      backgroundImage: `linear-gradient(to bottom, rgba(48, 49, 53, 0.0), rgba(59, 60, 64, 1.0)), url(${
        $props.model.currentMovie.backdrop_path ||
        $props.model.currentSeries.backdrop_path
      })`,
    }"
  ></div>
  <div class="result gap-full flex-col">
    <div class="result-main-info gap-full flex-col">
      <div class="result-content gap-full flex-row">
        <div
          class="loading-skeleton result-content-poster"
          v-if="
            !(
              $props.model.currentMovie.poster_path ||
              $props.model.currentSeries.poster_path
            )
          "
        ></div>
        <img
          class="result-content-poster"
          v-else
          loading="lazy"
          :src="
            $props.model.currentMovie.poster_path ||
            $props.model.currentSeries.poster_path
          "
        />
        <div
          class="loading-skeleton result-content-info gap-double flex-col flex-start"
          v-if="
            !(
              $props.model.currentMovie.title || $props.model.currentSeries.name
            )
          "
        ></div>
        <div v-else class="result-content-info gap-double flex-col flex-start">
          <div class="flex-col gap-quarter">
            <div
              class="result-content-info--top flex-row flex-start-center gap-half"
            >
              <h1 class="flex-row">
                {{
                  $props.model.currentMovie.title ||
                  $props.model.currentSeries.name
                }}
              </h1>

              <!-- <select v-if="$props.model.currentSeries.seasons.length > 0" class="button">
                    <option value="default" selected>All Seasons</option>
                    <option v-for="(season, index) in $props.model.currentSeries.seasons" :value="'s' + (index + 1)" :key="'season' + index">
                      {{ season.name }}
                    </option>
                  </select> -->
            </div>
            <div
              class="result-content-info--details gap-half flex-row flex-start-center"
            >
              <!-- Date -->
              <!-- <span v-if="$props.model.currentMovie.release_date?.split('-')[0]">●</span> -->
              <p>
                {{
                  $props.model.currentMovie.release_date?.split("-")[0] ||
                  $props.model.currentSeries.first_air_date?.split("-")[0]
                }}
              </p>

              <!-- Created by -->
              <span
                v-if="
                  $props.model.currentMovie.created_by &&
                  $props.model.currentMovie.created_by[0]?.name
                "
                >●</span
              >

              <p
                v-if="
                  $props.model.currentMovie.created_by &&
                  $props.model.currentMovie.created_by[0]?.name
                "
              >
                {{
                  $props.model.currentMovie.created_by &&
                  $props.model.currentMovie.created_by[0]?.name
                }}
              </p>

              <span v-if="$props.model.currentSeries.created_by[0]?.name"
                >●</span
              >
              <p v-if="$props.model.currentSeries.created_by[0]?.name">
                {{ $props.model.currentSeries.created_by[0]?.name }}
              </p>

              <!-- Runtime or Average episode runtime -->
              <span v-if="$props.model.currentMovie.runtime">●</span>
              <span v-if="$props.model.currentSeries.episode_run_time[0]"
                >●</span
              >

              <p v-if="$props.model.currentMovie.runtime">
                {{
                  Math.floor($props.model.currentMovie.runtime / 60)
                    .toString()
                    .padEnd(2, "h")
                }}
                {{
                  ($props.model.currentMovie.runtime % 60)
                    .toString()
                    .padEnd(3, "m")
                }}
              </p>

              <p v-if="$props.model.currentSeries.episode_run_time[0]">
                {{
                  Math.floor(
                    $props.model.currentSeries.episode_run_time[0] / 60
                  )
                    .toString()
                    .padEnd(2, "h")
                }}
                {{
                  ($props.model.currentSeries.episode_run_time[0] % 60)
                    .toString()
                    .padEnd(3, "m")
                }}
              </p>

              <!-- Status -->
              <span v-if="$props.model.currentMovie.status">●</span>
              <span v-if="$props.model.currentSeries.status">●</span>
              <p v-if="$props.model.currentMovie.status">
                {{ $props.model.currentMovie.status }}
              </p>
              <p v-if="$props.model.currentSeries.status">
                {{ $props.model.currentSeries.status }}
              </p>

              <!-- Series -->
              <!-- Episodes -->
              <span v-if="$props.model.currentSeries.number_of_episodes"
                >●</span
              >
              <p v-if="$props.model.currentSeries.number_of_episodes">
                {{
                  $props.model.currentSeries.number_of_episodes + " episodes"
                }}
              </p>

              <!-- Seasons -->
              <span v-if="$props.model.currentSeries.number_of_seasons">●</span>
              <p v-if="$props.model.currentSeries.number_of_seasons">
                {{ $props.model.currentSeries.number_of_seasons + " seasons" }}
              </p>
            </div>
          </div>

          <p
            v-if="
              $props.model.currentMovie.overview ||
              $props.model.currentSeries.overview
            "
            class="result-content-info--overview"
          >
            {{
              $props.model.currentMovie.overview ||
              $props.model.currentSeries.overview
            }}
          </p>

          <div
            class="result-content-more-info gap-double flex-col flex-center-start"
          >
            <div
              v-if="
                ($props.model.currentMovie.vote_average &&
                  $props.model.currentMovie.formatted_vote_count) ||
                ($props.model.currentSeries.vote_average &&
                  $props.model.currentSeries.formatted_vote_count) ||
                $props.model.currentSeries.last_episode_to_air?.air_date ||
                $props.model.currentSeries.next_episode_to_air?.air_date
              "
              class="result-content-more-info--primary gap-half flex-row flex-center-start"
            >
              <div
                class="flex-row flex-center-start gap-quarter"
                v-if="
                  ($props.model.currentMovie.vote_average &&
                    $props.model.currentMovie.formatted_vote_count) ||
                  ($props.model.currentSeries.vote_average &&
                    $props.model.currentSeries.formatted_vote_count)
                "
              >
                <span class="material-symbols-rounded">star</span>
                <div class="flex-col gap-quarter p-0 rating">
                  <p>
                    Rating:
                    {{
                      $props.model.currentMovie.vote_average ||
                      $props.model.currentSeries.vote_average
                    }}/10
                  </p>
                  <p class="rating-count">
                    {{
                      $props.model.currentMovie.formatted_vote_count ||
                      $props.model.currentSeries.formatted_vote_count
                    }}
                  </p>
                </div>
              </div>
              <div
                v-if="$props.model.currentSeries.last_episode_to_air?.air_date"
              >
                Latest episode:
                {{ $props.model.currentSeries.last_episode_to_air?.air_date }}
              </div>
              <div
                v-if="$props.model.currentSeries.next_episode_to_air?.air_date"
              >
                Next episode:
                {{ $props.model.currentSeries.next_episode_to_air?.air_date }}
              </div>
            </div>
            <div
              class="result-content-more-info--secondary gap-half flex-row flex-start-center"
            >
              <div
                v-if="$props.model.currentMovie.genres.length !== 0"
                class="gap-half flex-row flex-start-center"
              >
                <button
                  class="button"
                  v-for="(genre, index) in $props.model.currentMovie.genres"
                  :key="index"
                  :genre="genre"
                >
                  {{ genre.name }}
                </button>
              </div>
              <div
                v-if="$props.model.currentSeries.genres.length !== 0"
                class="gap-half flex-row flex-start-center"
              >
                <button
                  class="button"
                  v-for="(genre, index) in $props.model.currentSeries.genres"
                  :key="index"
                  :genre="genre"
                >
                  {{ genre.name }}
                </button>
              </div>
              <div
                v-if="$props.model.currentMovie.spoken_languages.length !== 0"
                class="gap-half flex-row flex-start-center"
              >
                <button
                  class="button"
                  v-for="(language, index) in $props.model.currentMovie
                    .spoken_languages"
                  :key="index"
                  :language="language"
                >
                  {{ language.english_name }}
                </button>
              </div>
              <div
                v-if="$props.model.currentSeries.spoken_languages.length !== 0"
                class="gap-half flex-row flex-start-center"
              >
                <button
                  class="button"
                  v-for="(language, index) in $props.model.currentSeries
                    .spoken_languages"
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

      <!-- <div class="list-buttons gap-full flex-row flex-center">
            <button class="button gap-quarter flex-row flex-center">
              <h1>Add to list</h1>
              <span class="material-symbols-rounded">library_add</span>
            </button>
          </div>   -->
      <div class="list-buttons gap-full flex-row flex-center">
        <button class="button gap-quarter" @click="handleLikedACB">
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

    <div
      v-if="
        ($props.model.currentMovie.video ||
          $props.model.currentSeries.video) !== ''
      "
      class="video-player-container"
      id="video-player-container"
    >
      <iframe
        loading="lazy"
        :key="
          $props.model.currentMovie.video || $props.model.currentSeries.video
        "
        class="contentVideoPlayer"
        :src="
          $props.model.currentMovie.video || $props.model.currentSeries.video
        "
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>

    <div
      v-if="
        $props.model.currentMovie.credits.cast.length > 0 ||
        $props.model.currentMovie.credits.crew.length > 0 ||
        $props.model.currentSeries.credits.cast.length > 0 ||
        $props.model.currentSeries.credits.crew.length > 0 ||
        $props.model.currentMovie.reviews.length > 0 ||
        $props.model.currentSeries.reviews.length > 0 ||
        $props.model.currentMovie.budget ||
        $props.model.currentMovie.revenue
      "
      class="detailed-info gap-full flex-col"
    >
      <div
        v-if="
          $props.model.currentMovie.credits.cast.length > 0 ||
          $props.model.currentMovie.credits.crew.length > 0 ||
          $props.model.currentSeries.credits.cast.length > 0 ||
          $props.model.currentSeries.credits.crew.length > 0
        "
        class="info-container gap-full flex-row flex-center"
      >
        <div
          v-if="
            $props.model.currentMovie.credits.cast.length > 0 ||
            $props.model.currentMovie.credits.crew.length > 0 ||
            $props.model.currentSeries.credits.cast.length > 0 ||
            $props.model.currentSeries.credits.crew.length > 0
          "
          class="info-card gap-half flex-col"
        >
          <div
            class="flex-row flex-start-center button button-secondary fixed-button"
          >
            <h1 class="fixed-button" @click="goToCastPageACB">Cast</h1>
            <span class="material-symbols-rounded p-0">chevron_right</span>
          </div>
          <CastCard
            :cast="
              $props.model.currentMovie?.credits?.cast[0] ||
              $props.model.currentSeries.credits?.cast[0]
            "
          />
        </div>
      </div>

      <div
        v-if="
          $props.model.currentMovie.reviews.length > 0 ||
          $props.model.currentSeries.reviews.length > 0
        "
        class="info-container gap-full flex-row flex-center"
      >
        <div
          v-if="
            $props.model.currentMovie.reviews.length > 0 ||
            $props.model.currentSeries.reviews.length > 0
          "
          class="info-card gap-half flex-col"
        >
          <div
            class="flex-row flex-start-center button button-secondary fixed-button"
          >
            <h1 class="fixed-button" @click="goToReviewPageACB">Reviews</h1>
            <span class="material-symbols-rounded p-0">chevron_right</span>
          </div>
          <ReviewCard
            :review="
              $props.model.currentMovie?.reviews[0] ||
              $props.model.currentSeries?.reviews[0]
            "
          />
        </div>

        <!-- <div class="info-card gap-quarter flex-col width-25">
              <h1>Watch providers</h1>
              <WatchProviders :watch_providers="$props.model.currentMovie.watch_providers || $props.model.currentSeries.watch_providers"></WatchProviders>
              <p>Provided by JustWatch</p>
            </div> -->
      </div>

      <!-- ONLY FOR MOVIE -->
      <div
        v-if="
          $props.model.currentMovie.budget || $props.model.currentMovie.revenue
        "
        class="info-container gap-full flex-row flex-center"
      >
        <div
          v-if="$props.model.currentMovie.budget"
          class="info-card gap-half flex-col"
        >
          <h1>Budget</h1>
          <span>
            {{ $props.model.currentMovie.formatted_budget }}
          </span>
        </div>

        <div
          v-if="$props.model.currentMovie.revenue"
          class="info-card gap-half flex-col"
        >
          <h1>Revenue</h1>
          <span
            :class="
              $props.model.currentMovie.revenue >
              $props.model.currentMovie.budget
                ? 'revenue-positive'
                : $props.model.currentMovie.revenue <
                  $props.model.currentMovie.budget
                ? 'revenue-negative'
                : 'nothing'
            "
          >
            {{ $props.model.currentMovie.formatted_revenue }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="
      $props.model.recommendedMovies.length > 0 ||
      $props.model.recommendedSeries.length > 0 ||
      $props.model.similarMovies.length > 0 ||
      $props.model.similarSeries.length > 0
    "
    class="similar-list-container gap-double flex-center flex-col"
  >
    <div
      v-if="$props.model.recommendedMovies.length > 0"
      class="carousel flex-col flex-center-start"
    >
      <div class="carousel-title">
        <h1>Recommended Movies</h1>
      </div>
      <Carousel
        :media="$props.model.recommendedMovies"
        :media-type="'movie'"
        :label="'Recommended Movies'"
      ></Carousel>
    </div>

    <div
      v-if="$props.model.recommendedSeries.length > 0"
      class="carousel flex-col flex-center-start"
    >
      <div class="carousel-title">
        <h1>Recommended Series</h1>
      </div>
      <Carousel
        :media="$props.model.recommendedSeries"
        :media-type="'tv'"
        :label="'Recommended Series'"
      ></Carousel>
    </div>

    <div
      v-if="$props.model.similarMovies.length > 0"
      class="carousel flex-col flex-center-start"
    >
      <div class="carousel-title">
        <h1>Similar Movies</h1>
      </div>
      <Carousel
        :media="$props.model.similarMovies"
        :media-type="'movie'"
        :label="'Similar Movies'"
      ></Carousel>
    </div>

    <div
      v-if="$props.model.similarSeries.length > 0"
      class="carousel flex-col flex-center-start"
    >
      <div class="carousel-title">
        <h1>Similar Series</h1>
      </div>
      <Carousel
        :media="$props.model.similarSeries"
        :media-type="'tv'"
        :label="'Similar Series'"
      ></Carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentView",
  components: {
    ReviewCard,
    CastCard,
    WatchProviders,
    Carousel,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const backdrop = document.getElementsByClassName(
        "backdrop"
      )[0] as HTMLElement;
      if (backdrop) {
        let blurAmount = (4 * scrollTop) / (scrollHeight - clientHeight);
  
        if (blurAmount > 3) {
          blurAmount = 3;
        }
  
        backdrop.style.filter = `blur(${blurAmount*0.95}rem) brightness(0.75)`;

        backdrop.style.transition = "filter 0.3s ease";
      }
    };

    const addScrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    };

    const removeScrollListener = () => {
      window.removeEventListener("scroll", handleScroll);
    };

    addScrollListener();
  },
});
</script>
