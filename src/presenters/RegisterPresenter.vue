<script lang="ts">
import { defineComponent, reactive } from 'vue'
import RegisterView from "../views/RegisterView.vue";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth, app } from "../firebaseConfig";
import { useRouter } from 'vue-router'

export default defineComponent({
    name: "RegisterPresenter",
    components: {
        RegisterView,
    },
    props: {
        model: {
            type: Object,
            required: true,
        },
    },
    setup(props: any) {
        const router = useRouter()
        const obj = reactive({ errorMessage: undefined });

        function handleCreateAccountACB(username: string, mail: string, password: string, confirm_password: string) {
            console.log("Register clicked!");
            console.log("Username:", username)
            console.log("Mail:", mail)
            console.log("Password:", password)
            console.log("Confirm Password:", confirm_password)

            createUserWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // Signed in :: https://firebase.google.com/docs/auth/web/password-auth
                    const user = userCredential.user;
                    console.log("User", user)
                    console.log("Signed in!", userCredential)
                    router.push('/profile');
                })
                .catch((error) => {
                    console.log(error.message);
                    obj.errorMessage = error.message;
                });
        }
        return {
            handleCreateAccountACB,
            obj,
        };
    },
});
</script>
<template>
    <RegisterView @handleCreateAccount="handleCreateAccountACB" v-bind:errorMessage="obj.errorMessage" />
</template>
