<script lang="ts">
import { defineComponent } from 'vue'
import ProfileView from "../views/ProfileView.vue";
import { auth, app } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "AboutPresenter",
    components: {
        ProfileView,
    },
    props: {
        model: {
            type: Object,
            required: true,
        },
    },
    setup(props: any) {
        const router = useRouter()
        const user = auth.currentUser; // Kollar ifall användaren är inloggad!

        function logoutClickACB() {
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log("Signed-out!")
            }).catch((error) => {
                // An error happened.
                console.warn("Error Sign-out!")
            });
            router.push('/login');
        }

        if (!user) {
            // Omdirigera till inloggningssidan
            router.push('/login');
        }
        return {
            logoutClickACB,
        };
    },
});
</script>
<template>
    <ProfileView @logoutClick="logoutClickACB" />
</template>
