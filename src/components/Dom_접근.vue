<template>
  <h2>Dom접근</h2>
  <label for="textInput"></label>
  <input type="text" id="textInput" placeholder="이메일 입력" />
  <button class="btn" @click="clickEvent">클릭</button>
  <p ref="testRef">ref 접근 방법입니다.</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const testRef = ref();
    const clickEvent = () => {
      return 0;
    };
    return {
      clickEvent,
      testRef,
    };
  },
});
</script>

<style scoped></style>
