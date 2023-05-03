<script setup>
defineEmits(['restartTest']);
</script>

<template>
  <button
    class="restart-button"
    tabindex="-1"
    title="Начать заново"
    @click="$emit('restartTest')"
  >
    <img
      class="restart-button__icon"
      src="/src/assets/svg/restart.svg"
      alt="restart"
    />
  </button>
</template>

<style>
.restart-button {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateX(100%);
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.restart-button__icon {
  width: calc(var(--base) * 0.48);
  height: calc(var(--base) * 0.48);
  margin-right: calc(var(--base) * 0.08);
}

@media (max-width: 501px) {
  .restart-button__icon {
    width: calc(var(--base) * 0.32);
    height: calc(var(--base) * 0.32);
  }
}

@media (max-width: 415px) {
  .restart-button {
    transform: translateX(0);
  }
}
</style>
