<script setup lang="ts">
import './../style.css';

</script>

<template>
    <div class="error-404 flex-col flex-center">
        <h1>404</h1>
        <p>Oops! Seems that the page you're looking for was lost to universal entropy...or it's just missing ¯\_(ツ)_/¯</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PageNotFoundView',
});
</script>
