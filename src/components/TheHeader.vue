<script setup>
import { computed } from 'vue';
const props = defineProps({
  hideHeaderHeightLess600: Boolean,
  toHomePageVisibility: Boolean
});

const hideHeader = computed(() =>
  props.hideHeaderHeightLess600 ? 'none' : 'flex'
);
</script>

<template>
  <header class="header">
    <RouterLink
      v-if="toHomePageVisibility"
      class="to-home-page"
      to="/"
      tabindex="-1"
    >
      На главную
    </RouterLink>
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

.to-home-page {
  position: absolute;
  left: 0;
  top: 0;
  text-decoration: none;
  font-size: calc(var(--base) * 0.16);
  font-weight: 700;
  color: black;
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
