<script lang="ts">
import { defineComponent, reactive } from 'vue'
import LoginView from "../views/LoginView.vue";
import { signInWithEmailAndPassword, GoogleAuthProvider, getAuth, signInWithPopup, AuthErrorCodes } from "firebase/auth";
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
            // console.log("Login clicked!");
            // console.log("Email:", mail)
            // console.log("Password:", password)

            signInWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // Signed in :: https://firebase.google.com/docs/auth/web/password-auth
                    const user = userCredential.user;
                    // console.log("User", user)
                    // console.log("Signed in!", userCredential)
                    router.push('/profile');
                })
                .catch((error) => {
                    // console.log("Wrong Email/Password!");
                    // const errorCode = error.code;
                    // const errorMessage = error.message;
                    credentialsError.errorMessage = "Wrong Email/Password!";
                    // console.log("Error:", credentialsError)
                });
        }

        const provider = new GoogleAuthProvider();
        function handleGoogleLoginACB() {
            signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                router.push('/profile');
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...

});
        }
        return {
            handleLoginACB,
            credentialsError,
            handleGoogleLoginACB,
        };
    },
});
</script>
<template>
    <LoginView
    @handleLogin="handleLoginACB"
    @handleGoogleLogin="handleGoogleLoginACB"
    v-bind:credentialsError="credentialsError"
    />
</template>
