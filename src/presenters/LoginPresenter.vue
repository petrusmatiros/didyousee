<script lang="ts">
import { defineComponent, reactive } from 'vue'
import LoginView from "../views/LoginView.vue";
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth, app } from "../firebaseConfig";
import { useRouter } from 'vue-router'
import { ErrorMessage } from "../types/types";


export default defineComponent({
    name: "LoginPresenter",
    components: {
        LoginView,
    },
    props: {
        model: {
            type: Object,
            required: true,
        },
    },
    setup(props: any) {
        const router = useRouter()
        const credentialsError:ErrorMessage = reactive({ errorMessage: undefined, errors: [] });

        function handleLoginACB(mail: string, password: string) {
            console.log("Login clicked!");
            console.log("Email:", mail)
            console.log("Password:", password)

            signInWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // Signed in :: https://firebase.google.com/docs/auth/web/password-auth
                    const user = userCredential.user;
                    console.log("User", user)
                    console.log("Signed in!", userCredential)
                    router.push('/profile');
                })
                .catch((error) => {
                    console.log("Wrong Email/Password!");
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    credentialsError.errorMessage = "Wrong Email/Password!";
                    console.log("Error:", credentialsError)
                });
        }
        return {
            handleLoginACB,
            credentialsError
        };
    },
});
</script>
<template>
    <LoginView 
    @handleLogin="handleLoginACB"
    v-bind:credentialsError="credentialsError"
    />
</template>
