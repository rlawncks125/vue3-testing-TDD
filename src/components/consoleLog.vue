<template>
  <div>
    <p>console log teseting</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  console.log("console log testing");
  console.log("onMounted");
});
</script>

<style scoped></style>
