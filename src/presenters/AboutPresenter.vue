<script lang="ts">
import { defineComponent } from 'vue'
import AboutView from "../views/AboutView.vue";

export default defineComponent({
    name: "AboutPresenter",
    components: {
        AboutView,
    },
    setup(props: any) {

        return {
        };
    },
});
</script>
<template>
    <AboutView/>
</template>