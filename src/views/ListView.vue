<script setup lang="ts">
import './../style.css';
import ListCard from './../components/ListCard.vue';

</script>

<template>
    <div class="mt-large2 gap-full flex-col flex-center">
        <h1>List</h1>
        <!-- TODO ListCard with v-for -->
        <div class="list-container flex-col flex-center-start">
            <ListCard>Card</ListCard>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ListView',
    components: {
        ListCard,
    },
});
</script>
