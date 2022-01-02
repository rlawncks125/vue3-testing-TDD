<template>
  <div>{{ propsData }}</div>

  <p data-testid="dsc" ref="pRef">{{ dsc }}</p>
  <input type="text" name="" id="" data-testid="input" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  props: {
    propsData: String,
  },
  setup() {
    const state = "state 나쁨";
    const obj = reactive({
      title: "테스트 합시다.",
      dsc: "테스트 주도",
    });

    return { state, ...toRefs(obj) };
  },
});
</script>

<style scoped></style>
