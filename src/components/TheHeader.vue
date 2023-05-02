<script setup>
import { computed } from 'vue';
const props = defineProps({
  hideHeaderLess550Height: Boolean
});
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
  padding: 24px;
  font-size: 32px;
  text-align: center;
  user-select: none;
}

@media (max-width: 820px) {
  .header {
    font-size: 24px;
  }
}

@media (max-width: 600px) {
  .header {
    font-size: 18px;
  }
}

@media (max-height: 550px) {
  .header {
    display: v-bind(hideHeader);
  }
}

@media (min-width: 2200px) {
  .header {
    font-size: 1.5vmax;
  }
}

@media (min-height: 1200px) {
  .header {
    font-size: 1.5vmax;
  }
}
</style>
