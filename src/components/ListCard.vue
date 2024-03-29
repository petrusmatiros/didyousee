<template>
  <div class="list-card-container flex-row flex-start-center gap-full">
    <div
      v-if="!($props.list?.title || $props.list?.name)"
      class="loading-skeleton list-card flex-row flex-start-center gap-full"
    ></div>
    <div v-else id="list-card" class="list-card flex-row flex-start-center gap-full" @click="handleClickACB()">
      <!-- {{ $props.list }} -->
      <div class="loading-skeleton" v-if="!$props.list?.poster_path"></div>
      <img
        v-else
        :src="$props.list?.poster_path"
        onerror="this.src='/src/assets/no-poster.svg';"
      />
      <div class="flex-col flex-center-start gap-half">
        <h1 v-if="$props.list?.title || $props.list?.name">
          {{ $props.list?.title || $props.list?.name }}
        </h1>
        
        <div class="flex-row flex-center gap-quarter">
          <button class="content-card-button button">{{ capitalizedMediaType($props.list?.mediaType)
          }}</button>
          <button v-if="$props.list?.release_date || $props.list?.first_air_date" class="content-card-button button">{{ ($props.list?.release_date || $props.list?.first_air_date)?.split('-')[0]
          }}</button>
  
          <button v-if="parseFloat($props.list?.vote_average.toFixed(1)) > 0" class="content-card-button button">{{ parseFloat($props.list?.vote_average.toFixed(1)) }}/10</button>
        </div>
        <span class="material-symbols-rounded list-card-delete" @click="deleteClickACB($event)" v-if="authenticated"
          >delete</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { auth, app } from "../firebaseConfig";
import "./../style.css";
import { MediaType } from '../types/types';

import {
  addContentToList,
  removeContentFromList,
  toggleContentToList,
  getUserData,
  persistUserData,
} from "../model/model";

export default defineComponent({
  name: "ListCard",
  props: {
    list: {
      type: Object,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    authenticated: {
      type: true, // boolean/bool is not valid?
      required: true,
    },
  },
  computed: {

  },
  data() {
    return {
      cid: undefined
    };
  },
  methods: {
    
    handleToast() {
      if (!auth.currentUser) {
        return;
      }
      const toastNotification = document.getElementById("toast-notification") as HTMLElement;
  
      if (toastNotification) {
        if (this.cid) {
          clearTimeout(this.cid);
        }
        toastNotification.classList.remove("op-100");
        toastNotification.classList.add("op-100");
        const toastNotificationText = document.getElementById("toast-notification-text") as HTMLElement;
        if (toastNotificationText) {
          const listType = this.$props.model.currentState.name;
          const toastMessage = `Removed content from your ${listType} list`
          toastNotificationText.innerText = toastMessage;
        }
        this.cid = setTimeout(() => {
          toastNotification.classList.remove("op-100");
        }, 5000) as any;
      }
    },
    capitalizedMediaType(mediaType: string): string {
      if (mediaType === MediaType.MOVIE.toString()) {
        return "Movie";
      } else if (mediaType === MediaType.SERIES.toString()) {
        return "Series";
      } else {
        return mediaType;
      }
    },
    async deleteClickACB(event: MouseEvent) {
      console.log(this.authenticated);
      event.stopPropagation();
      const userID = auth.currentUser?.uid || "";

      removeContentFromList(userID, this.$props.model.currentState.name || this.$props.list?.name, this.$props.list.id, this.$props.list.mediaType)
      const index = this.$props.model.currentList.findIndex((list:any) => list.id === this.$props.list.id && list.mediaType === this.$props.list.mediaType);
      if (index !== -1) {
        this.$props.model.currentList.splice(index, 1);
      }

      this.handleToast();
    },
    handleClickACB() {
      // Handle click event for the movie card
      this.$router.push({
        name: "Content",
        query: { type: JSON.stringify(this.$props.list.mediaType), id: JSON.stringify(this.$props.list.id) },
      });
  },
  },
});
</script>
