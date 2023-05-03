<script setup>
import { computed } from 'vue';
const props = defineProps({
  hideHeaderLess550Height: Boolean
}); //поменять название
const hideHeader = computed(() =>
  props.hideHeaderLess550Height ? 'none' : 'flex'
);
</script>

<template>
  <header class="header">
    <h1>Тренажер слепой печати</h1>
  </header>
</template>

<style>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: calc(var(--base) * 0.24);
  font-size: calc(var(--base) * 0.32);
  text-align: center;
  user-select: none;
}

@media (max-width: 820px) {
  .header {
    font-size: calc(var(--base) * 0.24);
  }
}

@media (max-width: 600px) {
  .header {
    font-size: calc(var(--base) * 0.18);
  }
}

@media (max-height: 600px) {
  .header {
    display: v-bind(hideHeader);
  }
}
</style>
