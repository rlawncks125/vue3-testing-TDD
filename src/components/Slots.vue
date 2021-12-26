<template>
  <header>
    <slot name="header" />
  </header>

  <main>
    <slot />
  </main>
  <footer>
    <slot name="footer" />
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
