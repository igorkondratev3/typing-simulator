<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <main class="start-page">
    <div class="start-page__message start-message">
      <img
        class="start-message__icon"
        src="/src/assets/svg/keyboard.svg"
        alt="keyboard"
      />
      <p class="start-message__message">
        Тренажер слепой печати позволит вам узнать насколько быстро и
        качественно вы способны печатать текст на английском языке. Вам будет
        предложено напечатать небольшой фрагмент текста, после чего вы сможете
        ознакомиться с результатами.
      </p>
    </div>
    <RouterLink class="start-page__link" to="/test">
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

.start-page__message {
  max-width: 600px;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(88, 143, 245, 0.459);
}

.start-message__icon {
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  width: 48px;
  height: 48px;
}

.start-message__message {
  font-size: 24px;
  text-align: justify;
}

.start-page__link {
  margin-top: 16px;
  border-radius: 8px;
}

.start-page__link:focus {
  outline: 1px solid black;
  outline-offset: 2px;
}

.start-page__start-test {
  padding: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  background-color: rgb(88, 143, 245);
}
</style>
