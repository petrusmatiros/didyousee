<script lang="ts">
import { defineComponent } from 'vue'
import PageNotFoundView from "../views/PageNotFoundView.vue";

export default defineComponent({
    name: "PageNotFoundPresenter",
    components: {
        PageNotFoundView
    },
    setup(props: any) {

        return {
        };
    },
});
</script>
<template>
    <PageNotFoundView />
</template>