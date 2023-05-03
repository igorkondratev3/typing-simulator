<script setup>
import { RouterLink } from 'vue-router';
import TestStatistic from '@/components/testPage/testStatistic.vue';
import TheKeyboard from '@/components/keyboard/theKeyboard.vue';
import TheHeader from '@/components/TheHeader.vue';

defineProps({
  accuracy: String,
  printSpeed: String
});

const stateObj = JSON.parse(JSON.stringify(history.state));
stateObj.current = '/typing-simulator/complete';
history.replaceState(stateObj, '', '/typing-simulator/complete');

const printSpeedDeclination = (printSpeed) => {
  if (printSpeed % 100 >= 11 && printSpeed % 100 <= 19) return 'знаков';
  if (printSpeed % 10 === 0) return 'знаков';
  if (printSpeed % 10 === 1) return 'знак';
  if (printSpeed % 10 >= 2 && printSpeed % 10 <= 4) return 'знака';
  return 'знаков';
};
</script>

<template>
  <div class="complete-page page-wrapper">
    <TheHeader :hideHeaderHeightLess600="false" :toHomePageVisibility="true" />
    <main class="complete-page__main">
      <div class="complete-page__message-and-link">
        <div class="complete-page__message complete-message">
          <TestStatistic :accuracy="accuracy" :printSpeed="printSpeed" />
          <p class="complete-message__value">
            Вы печатаете текст на английском языке со скоростью
            {{ printSpeed }} {{ printSpeedDeclination(Number(printSpeed)) }} в
            минуту и с точность {{ accuracy }}%.
          </p>
        </div>
        <RouterLink class="complete-page__test-link test-link" to="/test">
          <button class="test-link__button" tabindex="-1">
            Пройти тест повторно
          </button>
        </RouterLink>
      </div>

      <TheKeyboard language="english" />
    </main>
  </div>
</template>

<style>
.complete-page__main {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
}

.complete-page__message-and-link {
  max-width: calc(var(--base) * 6);
  margin-top: calc(var(--base) * 0.32);
}

.complete-page__message {
  padding: calc(var(--base) * 0.16);
  border-radius: calc(var(--base) * 0.08);
  background-color: rgba(88, 143, 245, 0.459);
}

.complete-message__value {
  margin-top: calc(var(--base) * 0.24);
  font-size: calc(var(--base) * 0.24);
  text-align: justify;
}

.complete-page__test-link {
  display: block;
  margin-top: calc(var(--base) * 0.04);
  border-radius: calc(var(--base) * 0.08);
  text-decoration: none;
}

.complete-page__test-link:focus {
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
  .complete-page__message-and-link {
    margin-top: 0;
  }
}
</style>
