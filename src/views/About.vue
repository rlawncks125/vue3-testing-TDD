<template>
  <div class="about">
    <h1>This is an about page {{ axiosData }}</h1>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const axiosData = ref();

    onMounted(async () => {
      const data = (await axios.get("/test")).data;

      axiosData.value = data.data;
    });

    return { axiosData };
  },
});
</script>

<style scoped></style>
