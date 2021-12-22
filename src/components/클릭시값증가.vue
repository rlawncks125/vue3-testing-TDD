<template>
  <h1>{{ count }}</h1>
  <button @click="add">증가</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const count = ref(0);

    const add = () => {
      count.value += 1;
    };

    return { count, add };
  },
});
</script>

<style scoped></style>
