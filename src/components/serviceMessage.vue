<script setup>
defineProps({
  message: String
});
</script>

<template>
  <div class="service-message">{{ message }}</div>
</template>

<style>
.service-message {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translateY(calc(100% + 8px));
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  font-size: 24px;
  text-align: center;
  background-color: rgb(201, 80, 80);
}

.service-message_blue {
  background-color: rgb(88, 143, 245);
}
</style>
