<script lang="ts">
import { defineComponent } from "vue";
import CastView from "../views/CastView.vue";

export default defineComponent({
  name: "CastPresenter",
  components: {
    CastView,
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props: any) {
  }
});
</script>
<template>
  <CastView :model="model" />
</template>
