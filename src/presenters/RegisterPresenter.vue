<script lang="ts">
import { defineComponent } from 'vue'
import RegisterView from "../views/RegisterView.vue";

export default defineComponent({
    name: "RegisterPresenter",
    components: {
        RegisterView,
    },
    props: {
    },
    setup(props: any) {
        function handleCreateAccountACB(username: string, mail: string, password: string, confirm_password: string) {
            console.log("Register clicked!");
            console.log("Username:", username)
            console.log("Mail:", mail)
            console.log("Password:", password)
            console.log("Confirm Password:", confirm_password)
        }

        return {
            handleCreateAccountACB,
        };
    },
});
</script>
<template>
    <RegisterView @handleCreateAccount="handleCreateAccountACB" />
</template>