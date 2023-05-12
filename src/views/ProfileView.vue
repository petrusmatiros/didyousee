<template>
  <div class="mt-large2 w100 gap-full flex-col flex-center">
    <h1>Profile</h1>
    <div class="profile-lists flex-col flex-center gap-full">
      <div class="profile-list-card-container flex-row flex-center gap-full">
        <div @click="goToLikedListACB()" class="profile-list-card">Liked</div>
        <div @click="goToWatchListACB()" class="profile-list-card">
          Watchlist
        </div>
      </div>
      <div class="profile-list-card-container flex-row flex-center gap-full">
        <div @click="goToSeenListACB()" class="profile-list-card">Seen</div>
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
import { auth } from "../firebaseConfig";
import { ListType } from '../types/types';


export default defineComponent({
    name: 'ProfileView',
    methods: {
        goToWatchListACB() {
            this.goToListACB(ListType.WATCH.toString());
        },

        goToSeenListACB() {
            this.goToListACB(ListType.SEEN.toString());
        },

        goToLikedListACB() {
            this.goToListACB(ListType.LIKED.toString());
        },

        goToDislikedListACB() {
            this.goToListACB(ListType.DISLIKED.toString());
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
        user: auth.currentUser,
      };
    },
});
</script>
