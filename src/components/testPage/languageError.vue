<script setup></script>

<template>
  <div class="language-error">Смените раскладку клавиатуры на английскую</div>
</template>

<style>
.language-error {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(calc(100% + 8px));
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  font-size: 24px;
  text-align: center;
  background-color: rgb(201, 80, 80);
}
</style>
