<script lang="ts">
import { defineComponent } from 'vue'
import ListView from "../views/ListView.vue";

export default defineComponent({
    name: "ListPresenter",
    components: {
        ListView,
    },
    setup(props: any) {

        return {
        };
    },
});
</script>
<template>
    <ListView/>
</template>