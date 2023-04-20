<script setup lang="ts">
import './../style.css';
import { defineEmits } from 'vue';

const emit = defineEmits(["logoutClick"])

function logoutClickACB() {emit("logoutClick")}

</script>

<template>
    <div class="top flex-col flex-center">
        <h1>Profile</h1>
          <button @click="logoutClickACB()">Logout</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProfileView',
});
</script>
