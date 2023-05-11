<script lang="ts">
import { defineComponent } from "vue";
import ProfileView from "../views/ProfileView.vue";
import { auth, app } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { ListType } from "../types/types";

export default defineComponent({
  name: "ProfilePresenter",
  components: {
    ProfileView,
  },
  props: {
    model: {
      type: Object,
      required: true,
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
    const router = useRouter();
    function logoutClickACB() {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          // console.log("Signed-out!");
        })
        .catch((error) => {
          // An error happened.
          // console.warn("Error Sign-out!");
        });
      router.push("/login");
    }

    function goToListACB(listType: string) {
      if (listType) {
        router.push("/profile/" + auth.currentUser.uid + "/list/" + listType.toString());
      }
    }
    return {
      logoutClickACB,
      goToListACB,
    };
  },
});
</script>
<template>
  <ProfileView @logoutClick="logoutClickACB" @goToList="goToListACB" />
</template>
