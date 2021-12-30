<template>
  <p class="DomData" data-testid="DomData">{{ data }}</p>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import axios from "axios";

export default defineComponent({
  setup() {
    const data = ref();

    onMounted(async () => {
      data.value = await (await axios.get("http://localhost:3030/")).data;
    });

    return { data };
  },
});
</script>

<style scoped></style>
