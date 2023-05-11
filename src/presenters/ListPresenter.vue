<script lang="ts">
import { defineComponent } from "vue";
import ListView from "../views/ListView.vue";
import { useRouter, useRoute } from "vue-router";
import { auth } from "../firebaseConfig";

export default defineComponent({
  name: "ListPresenter",
  components: {
    ListView,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  watch: {
    "$route.params": {
      handler() {
        this.updateList();
      },
      immediate: false,
    },
  },
  mounted() {
    const router = useRouter();
    const user = auth.currentUser; // Kollar ifall användaren är inloggad!

    if (!user) {
      // Omdirigera till inloggningssidan
      router.push("/login");
    }
  },
  setup(props: any) {
    const route = useRoute();

    const userID = auth.currentUser?.uid || "";

    async function updateList() {
      // reset list
      const listName = route.query.name as string;
      props.model.currentState.name = listName;
      await props.model.fetchPersistance(userID);
      
      const list = props.model.state[listName]
      await props.model.fetchCurrentList(list);
    }
    updateList();

    return {
        userID,
        updateList,
    };
  },
});
</script>
<template>
  <ListView :model="model" />
</template>
