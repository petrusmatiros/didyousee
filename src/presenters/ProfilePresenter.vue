<script lang="ts">
import { defineComponent } from 'vue'
import ProfileView from "../views/ProfileView.vue";
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "AboutPresenter",
    components: {
        ProfileView,
    },
    setup(props: any) {
    const router = useRouter()

    console.log("Profile console log...")

    // TODO: Ändra till token! Auth!
    const isValidCookie = 0;

    if (!isValidCookie) {
      // Omdirigera till inloggningssidan
      router.push('/login');
    }
        return {
        };
    },
});
</script>
<template>
    <ProfileView/>
</template>