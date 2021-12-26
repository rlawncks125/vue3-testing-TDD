<template>
  <h2>부모 컴포</h2>
  <div>
    <h2>자식 컴포</h2>
    <child-compo @childEvent="getEmit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import childCompo from "@/components/하위컴포넌트/하위emit.vue";

export default defineComponent({
  components: { childCompo },
  setup() {
    const getEmit = (msg: string) => {};

    return { getEmit };
  },
});
</script>

<style scoped></style>
