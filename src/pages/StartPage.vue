<script setup>
import { RouterLink } from 'vue-router';
import TheKeyboard from '@/components/theKeyboard.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <div class="start-page page-wrapper">
    <TheHeader :hideHeaderLess550Height="false"/>
    <main class="start-page__main">
      <div class="start-page__message-and-link">
        <p class="start-page__message">
          Тренажер слепой печати позволит вам узнать насколько быстро и
          качественно вы способны печатать текст на английском языке. Вам будет
          предложено напечатать небольшой фрагмент текста, после чего вы сможете
          ознакомиться с результатами.
        </p>
        <RouterLink class="start-page__test-link" to="/test">
          <button class="start-page__button" tabindex="-1">
            Пройти тест печати
          </button>
        </RouterLink>
      </div>
      <TheKeyboard language="english" />
    </main>
  </div>
</template>

<style>
.start-page__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

.start-page__message-and-link {
  max-width: 600px;
  margin-top: 32px;
}

@media (max-width: 600px) {
  .start-page__message-and-link {
    margin-top: 0;
  }
}

.start-page__message {
  padding: 16px;
  border-radius: 8px;
  font-size: 24px;
  text-align: justify;
  background-color: rgba(88, 143, 245, 0.459);
}

.start-page__test-link {
  display: block;
  margin-top: 4px;
  text-decoration: none;
}

.start-page__test-link:focus {
  outline: 1px solid black;
  outline-offset: 2px;
}

.start-page__button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  background-color: rgb(88, 143, 245);
}

@media (min-width: 2200px) {
  .start-page__message, .start-page__button {
  padding: 0.7vmax;
  border-radius: 0.4vmax;
  font-size: 1.2vmax;
}

.start-page__test-link {
  margin-top: 0.2vmax;
}

.start-page__message-and-link {
  max-width: 30vmax;
  margin-top: 1.7vmax;
}
}

/*@media (min-height: 1200px) {
  .header {
    font-size: 1.5vmax;
  }
}*/
</style>
