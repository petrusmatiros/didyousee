<template>
  <div class="list-card flex-row flex-start-center gap-full">
    <div
      v-if="!($props.list?.title || $props.list?.name)"
      class="loading-skeleton list-card flex-row flex-start-center gap-full"
    ></div>
    <div v-else class="list-card flex-row flex-start-center gap-full">
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
        <span class="material-symbols-rounded" @click="deleteClickACB()"
          >delete</span
        >
        <button @click="handleClickACB()"> View</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { auth, app } from "../firebaseConfig";
import "./../style.css";
import {
  addContentToList,
  removeContentFromList,
  toggleContentToList,
  getUserData,
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
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    async deleteClickACB() {
      // console.log("Delete!", this.$props.list);
      // const userID = auth.currentUser?.uid || "";
      // console.log("USERID", userID)
      // console.log("LIST", this.$props.list?.title || this.$props.list?.name)
      // console.log("mediaid", this.$props.list.id)
      // console.log("mediaType",this.$props.list.mediaType)
      removeContentFromList(userID, this.$props.model.currentState.name || this.$props.list?.name, this.$props.list.id, this.$props.list.mediaType)
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
