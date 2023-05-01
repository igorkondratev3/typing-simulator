<script setup>
import { RouterLink } from 'vue-router';
import TestStatistic from '@/components/testPage/testStatistic.vue';

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
  <main class="complete-page">
    <div class="complete-page__message complete-message">
      <TestStatistic :accuracy="accuracy" :printSpeed="printSpeed" />
      <p class="complete-message__value">
        Вы печатаете текст на английском языке со скоростью
        {{ printSpeed }} {{ printSpeedDeclination(Number(printSpeed)) }} в
        минуту и с точность {{ accuracy }} %.
      </p>
    </div>
    <RouterLink class="complete-page__test-link" to="/test">
      Пройти тест повторно
    </RouterLink>
  </main>
</template>

<style>
.complete-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-top: 32px;
}

.complete-page__message {
  max-width: 600px;
  padding: 16px;
  border-radius: 8px;
  background-color: rgba(88, 143, 245, 0.459);
}

.complete-message__value {
  margin-top: 24px;
  font-size: 24px;
  text-align: justify;
}

.complete-page__test-link {
  margin-top: 16px;
  padding: 16px;
  border: none;
  border-radius: 8px;
  font-size: 24px;
  color: black;
  text-decoration: none;
  background-color: rgb(88, 143, 245);
}

.complete-page__test-link:focus {
  outline: 1px solid black;
  outline-offset: 2px;
}
</style>
