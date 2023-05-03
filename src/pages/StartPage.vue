<script setup>
import { RouterLink } from 'vue-router';
import TheKeyboard from '@/components/theKeyboard.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>

<template>
  <div class="start-page page-wrapper">
    <TheHeader :hideHeaderLess550Height="false" />
    <main class="start-page__main">
      <div class="start-page__message-and-link">
        <p class="start-page__message">
          Тренажер слепой печати позволит вам узнать насколько быстро и
          качественно вы способны печатать текст на английском языке. Вам будет
          предложено напечатать небольшой фрагмент текста, после чего вы сможете
          ознакомиться с результатами.
        </p>
        <RouterLink class="start-page__test-link test-link" to="/test">
          <button class="test-link__button" tabindex="-1">
            Пройти тест печати
          </button>
        </RouterLink>
      </div>
      <TheKeyboard language="english" />
      <div class="fgh"></div>
      <div class="fghs"></div>
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
  max-width: calc(var(--base) * 6);
  margin-top: calc(var(--base) * 0.32);
}

.start-page__message {
  padding: calc(var(--base) * 0.16);
  border-radius: calc(var(--base) * 0.08);
  font-size: calc(var(--base) * 0.24);
  text-align: justify;
  background-color: rgba(88, 143, 245, 0.459);
}

.start-page__test-link {
  display: block;
  margin-top: calc(var(--base) * 0.04);
  border-radius: calc(var(--base) * 0.08);
  text-decoration: none;
}

.start-page__test-link:focus {
  outline: calc(var(--base) * 0.01) solid black;
  outline-offset: calc(var(--base) * 0.02);
}

.test-link__button {
  width: 100%;
  padding: calc(var(--base) * 0.16);
  border: none;
  border-radius: calc(var(--base) * 0.08);
  cursor: pointer;
  font-size: calc(var(--base) * 0.24);
  color: black;
  background-color: rgb(88, 143, 245);
}

@media (max-width: 600px) {
  .start-page__message-and-link {
    margin-top: 0;
  }
}
</style>
