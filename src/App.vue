<script setup>
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <div class="wrapper">
    <TheHeader />
    <RouterView />
  </div>
</template>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(232, 238, 233);
}
</style>
