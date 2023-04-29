<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="start-page">
    <div class="start-page__message-block message-block">
      <img class="message-block__icon" src="/src/assets/svg/keyboard.svg" />
      <p class="message-block__message">
        Тренажер слепой печати позволит вам узнать насколько быстро и
        качественно вы способны печатать текст на английском языке. Вам будет
        предложено напечатать небольшой фрагмент текста, после чего вы сможете
        ознакомиться с результатами.
      </p>
    </div>
    <RouterLink to="/test">
      <button class="start-page__start-test">Пройти тест печати</button>
    </RouterLink>
  </main>
</template>

<style>
.start-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-top: 96px;
}

.start-page__message-block {
  max-width: 600px;
  background-color: rgba(88, 143, 245, 0.459);
  padding: 16px;
  border-radius: 8px;
}

.message-block__icon {
  width: 48px;
  height: 48px;
  position: absolute;
  left: -4px;
  top: -40px;
}

.message-block__message {
  font-size: 24px;
  text-align: justify;
}

.start-page__start-test {
  border: none;
  padding: 16px;
  font-size: 24px;
  background-color: rgb(88, 143, 245);
  cursor: pointer;
  border-radius: 8px;
  margin-top: 16px;
}
</style>
