<template>
  <label for="textInput"></label>
  <input type="text" id="textInput" />
  <button class="btn" @click="clickEvent">클릭</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const clickEvent = () => {};
    return {
      clickEvent,
    };
  },
});
</script>

<style scoped></style>
