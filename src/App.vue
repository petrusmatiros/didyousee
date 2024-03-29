<template>
  <nav class="flex-row flex-center" id="nav">
    <div class="nav-link-container w100 gap-full flex-row flex-space-between-center">
      <div class="flex-row flex-center gap-full">
        <RouterLink to="/" class="nav-link flex-row" id="logo"
          ><img
            src="../src/assets/didyousee.svg"
            onerror="this.src='/src/assets/no-content.svg';"
            alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
            decoding="sync"
            fetchpriority="high"
        /></RouterLink>
      </div>
      <div class="nav-link-right gap-full flex-row flex-center">
        <SearchBar :model="model"></SearchBar>
        <RouterLink
          to="/profile"
          class="nav-link flex-row flex-center"
          id="profile"
          >Profile</RouterLink
        >
      </div>
    </div>
  </nav>
  <div id="toast-notification">
    <div class="flex-row flex-start-center">
      <div class="flex-row flex-start-center">
        <h1 id="toast-noticication-header" class="toast-noticication-header"></h1>
        <p id="toast-notification-text" class="toast-notification-text"></p>
      </div>
    </div>
    <span class="material-symbols-rounded toast-notification-close" @click="closeToastNotification()"
          >close</span
        >
  </div>

  <div class="margin">
    <RouterView v-slot="{ Component }">
      <Suspense>
        <!-- main content -->
        <div>
          <component :is="Component"></component>
        </div>

        <!-- loading state -->
        <template #fallback> Loading... </template>
      </Suspense>
    </RouterView>
  </div>
  <footer class="flex-col flex-seperate gap-full" id="footer">
    <div class="footer-top flex-row flex-center">
      <RouterLink to="/" class="nav-link flex-row" id="logo"
        ><img
          src="/src/assets/didyousee.svg"
          onerror="this.src='/src/assets/no-content.svg';"
          alt="didyousee logo. an owl with a binocular, looking for the next movie/series"
          decoding="sync"
          fetchpriority="high"
      /></RouterLink>
      <RouterLink to="/profile" class="nav-link"></RouterLink>
    </div>
    <div class="footer-bottom flex-col flex-center gap-full">
      <div class="flex-row flex-center">
        <p>Copyright © 2023 didyousee. All rights reserved</p>
      </div>
      <div class="flex-row flex-center gap-quarter">
        <p>
          This product uses
          <a href="https://icons8.com/" target="_blank">Icons8</a> for some
          iconagraphy
        </p>
      </div>
      <div class="flex-row flex-center gap-quarter">
        <p>
          This product uses the TMDb API but is not endorsed or certified by TMDb.
        </p>
        <img
          src="./assets/tmdb_alt_short_blue.svg"
          onerror="this.src='/src/assets/no-content.svg';"
          alt="TMDB alt short logo"
          loading="lazy"
          decoding="async"
        />
    </div>
    </div>
  </footer>
</template>

<script lang="ts">
import "./style.css";
import { RouterView, RouterLink } from "vue-router";
import { defineComponent, reactive } from "vue";
import SearchBar from "../src/components/SearchBar.vue";
import { model } from "../src/model/model";
import noPoster from "../assets/no-poster.svg";
import noBackdrop from "../assets/no-backdrop.svg";
import noContent from "../assets/no-content.svg";

const promiseModel = reactive(model);

export default defineComponent({
  name: "App",
  components: {
    SearchBar,
  },
  methods: {
    closeToastNotification() {
      const toastNotification = document.getElementById("toast-notification") as HTMLElement;
      if (toastNotification) {
        toastNotification.classList.remove("op-100");
      }
    },
  },
  data() {
    return {
      model: promiseModel,
    };
  },
});
</script>

<style>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
}
</style>
