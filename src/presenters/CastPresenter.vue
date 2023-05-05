<script lang="ts">
import { defineComponent } from 'vue'
import CastView from "../views/CastView.vue";

export default defineComponent({
    name: "CastPresenter",
    components: {
        CastView,
    },
    setup(props: any) {

        return {
        };
    },
});
</script>
<template>
    <CastView/>
</template>