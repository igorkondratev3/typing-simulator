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
    <div class="complete-page__message-block message-block">
      <TestStatistic :accuracy="accuracy" :printSpeed="printSpeed" />
      <p class="message-block__message">
        Вы печатаете текст на английском языке со скоростью
        {{ printSpeed }} {{ printSpeedDeclination(Number(printSpeed)) }} в
        минуту и с точность {{ accuracy }} %.
      </p>
    </div>
    <RouterLink to="/test">
      <button class="complete-page__start-test">Пройти тест повторно</button>
    </RouterLink>
  </main>
</template>

<style>
.complete-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-top: 96px;
}

.complete-page__message-block {
  max-width: 600px;
  background-color: rgba(88, 143, 245, 0.459);
  padding: 16px;
  border-radius: 8px;
}

.message-block__message {
  font-size: 24px;
  text-align: justify;
  margin-top: 24px;
}

.complete-page__start-test {
  border: none;
  padding: 16px;
  font-size: 24px;
  background-color: rgb(88, 143, 245);
  cursor: pointer;
  border-radius: 8px;
  margin-top: 16px;
}
</style>
