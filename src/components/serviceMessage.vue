<script setup lang="ts">
defineProps<{
  message: string;
}>();
</script>

<template>
  <div class="service-message">{{ message }}</div>
</template>

<style>
.service-message {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(calc(100% + calc(var(--base) * 0.08)));
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: calc(var(--base) * 0.16);
  border-radius: calc(var(--base) * 0.08);
  font-size: calc(var(--base) * 0.24);
  text-align: center;
  background-color: rgb(201, 80, 80);
}

.service-message_blue {
  background-color: rgb(88, 143, 245);
}
</style>
