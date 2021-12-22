<template>
  <div>{{ propsData }}</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

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
