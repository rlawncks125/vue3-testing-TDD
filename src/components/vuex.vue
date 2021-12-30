<template>
  <div class="count" data-testid="카운트">{{ count }}</div>
  <h2 class="asyncData">{{ title }}</h2>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const store = useStore();
    const data = reactive({
      count: computed(() => store.state.count),
      title: computed(() => store.state.title),
    });
    return { ...toRefs(data) };
  },
});
</script>

<style scoped></style>
