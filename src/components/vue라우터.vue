<template>
  <button @click="redirect">Click to Edit</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const redirect = () => {
      router.push("Dom");
    };

    return { redirect };
  },
});
</script>

<style scoped></style>
