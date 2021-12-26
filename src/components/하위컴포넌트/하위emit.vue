<template>
  <button @click="onClickEvent">하위 호출</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["childEvent"],
  setup(_, { emit }) {
    const onClickEvent = () => {
      emit("childEvent", { msg: "자식" });
      emit("childEvent", { msg: "자식2" });
    };

    return { onClickEvent };
  },
});
</script>

<style scoped></style>
