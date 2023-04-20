<script lang="ts">
import { defineComponent } from 'vue'
import LoginView from "../views/LoginView.vue";

export default defineComponent({
    name: "LoginPresenter",
    components: {
        LoginView,
    },
    props: {
    },
    setup(props: any) {
        function handleLoginACB(username: string, password: string) {
            console.log("Login clicked!");
            console.log("Username:", username)
            console.log("Password:", password)
        }

        return {
            handleLoginACB,
        };
    },
});
</script>
<template>
    <LoginView @handleLogin="handleLoginACB" />
</template>