<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const errCall = (err: boolean = false, twoErr: boolean = false) => {
      if (err === true) {
        throw new Error("에러 처리 테스트 입니다.");
      }

      if ((twoErr = true)) {
        throw new Error("두번째 에러 발생");
      }
    };

    return { errCall };
  },
});
</script>

<style scoped></style>
