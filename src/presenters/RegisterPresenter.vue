<script lang="ts">
import { defineComponent, reactive } from "vue";
import RegisterView from "../views/RegisterView.vue";
import { createUserWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { auth, app } from "../firebaseConfig";
import { useRouter } from "vue-router";
import { ErrorMessage } from "../types/types";

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
    const router = useRouter();
    const credentialsError:ErrorMessage = reactive({ errorMessage: undefined, errors: [] });

    function handleCreateAccountACB(
      username: string,
      mail: string,
      password: string,
      confirm_password: string
    ) {
      console.log("Register clicked!");
      console.log("Username:", username);
      console.log("Mail:", mail);

      createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
          // Signed in :: https://firebase.google.com/docs/auth/web/password-auth
          const user = userCredential.user;
          console.log("User", user);
          console.log("Created account!", userCredential);
          router.push("/profile");
        })
        .catch((error) => {
          if (error.code === AuthErrorCodes.INVALID_EMAIL) {
            const m = "Invalid email.";
            credentialsError.errors.push({ type: "email", message: m});
            credentialsError.errorMessage = m;
          } else if (AuthErrorCodes.EMAIL_EXISTS) {
            const m = "Email already exists.";
            credentialsError.errors.push({
              type: "email",
              message: m,
            });
            credentialsError.errorMessage = m;
          }
          else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
            const m = "Password is too weak.";
            credentialsError.errors.push({
              type: "password",
              message: m,
            });
            credentialsError.errorMessage = m;
          } else {
            const m = "An error occurred while creating your account.";
            credentialsError.errors.push({
              type: "general",
              message: m,
            });
            credentialsError.errorMessage = m;
          }
        });
    }
    return {
      handleCreateAccountACB,
      credentialsError,
    };
  },
});
</script>
<template>
  <RegisterView
    @handleCreateAccount="handleCreateAccountACB"
    v-bind:credentialsError="credentialsError"
  />
</template>
