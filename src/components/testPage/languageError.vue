<script setup></script>

<template>
  <div class="language-error">
    Смените раскладку клавиатуры на английскую
  </div>
</template>

<style>
.language-error {
  background-color: rgb(201, 80, 80);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 24px;
  padding: 16px;
  border-radius: 8px;
  transform: translateY(calc(100% + 8px));
}
</style>
