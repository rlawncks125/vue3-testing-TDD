<template>
  <div>stub 컴포넌트 테스트</div>
  <compo-a />
  <compo-b />
  <compo-c />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import compoA from "@/components/하위컴포넌트/컴포A.vue";
import compoB from "@/components/하위컴포넌트/컴포B.vue";
import compoC from "@/components/하위컴포넌트/컴포C.vue";

export default defineComponent({
  components: { compoA, compoB, compoC },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
