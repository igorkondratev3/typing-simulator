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
  width: 48px;
  height: 48px;
  margin-right: 8px;
}

@media (max-width: 501px) {
  .restart-button__icon {
    width: 32px;
    height: 32px;
  }
}

@media (max-width: 415px) {
  .restart-button {
    transform: translateX(0);
  }
}
</style>
