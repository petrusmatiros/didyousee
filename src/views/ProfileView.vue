<template>
  <div class="mt-large2 profile-container gap-full flex-col flex-center">
    <h1>Profile</h1>
    <div class="profile-lists flex-col flex-center gap-full">
      <div class="profile-list-card-container flex-row flex-center gap-full">
        <div @click="goToWatchListACB()" class="profile-list-card">
          Watchlist
        </div>
        <div @click="goToSeenListACB()" class="profile-list-card">Seen</div>
      </div>
      <div class="profile-list-card-container flex-row flex-center gap-full">
        <div @click="goToLikedListACB()" class="profile-list-card">Liked</div>
        <div @click="goToDislikedListACB()" class="profile-list-card">
          Disliked
        </div>
      </div>
    </div>
    <button class="button" @click="logoutClickACB()">Logout</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProfileView',
    methods: {
        goToWatchListACB() {
            this.goToListACB("watch");
        },

        goToSeenListACB() {
            this.goToListACB("seen");
        },

        goToLikedListACB() {
            this.goToListACB("liked");
        },

        goToDislikedListACB() {
            this.goToListACB("disliked");
        },
        goToListACB(listType: string) {
            this.$emit("goToList", listType);
        },

        logoutClickACB() {
            this.$emit("logoutClick");
        },
    },
    data() {
      return {

      };
    },
});
</script>
