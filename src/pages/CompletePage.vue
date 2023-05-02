<script setup>
import { RouterLink } from 'vue-router';
import TestStatistic from '@/components/testPage/testStatistic.vue';
import TheKeyboard from '@/components/theKeyboard.vue';
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
    <TheHeader :hideHeaderLess550Height="false"/>
    <main class="complete-page__main">
      <div class="complete-page__message-and-link">
        <div class="complete-page__message complete-message">
          <TestStatistic :accuracy="accuracy" :printSpeed="printSpeed" />
          <p class="complete-message__value">
            Вы печатаете текст на английском языке со скоростью
            {{ printSpeed }} {{ printSpeedDeclination(Number(printSpeed)) }} в
            минуту и с точность {{ accuracy }} %.
          </p>
        </div>
        <RouterLink class="complete-page__test-link" to="/test">
          <button class="complete-page__button" tabindex="-1">
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
  max-width: 600px;
  margin-top: 32px;
}

@media (max-width: 600px) {
  .complete-page__message-and-link {
    margin-top: 0;
  }
}

.complete-page__message {
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
  display: block;
  margin-top: 4px;
  text-decoration: none;
}

.complete-page__test-link:focus {
  outline: 1px solid black;
  outline-offset: 2px;
}

.complete-page__button {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  color: black;
  background-color: rgb(88, 143, 245);
}

@media (min-width: 2200px) {
  .complete-page__message, .complete-page__button, .complete-message__value {
  padding: 0.7vmax;
  border-radius: 0.4vmax;
  font-size: 1.2vmax;
}
.complete-page__message-and-link {
  max-width: 30vmax;
  margin-top: 1.7vmax;
}

.complete-page__test-link {
  margin-top: 0.2vmax;
}
}

/*@media (min-height: 1200px) {
  .header {
    font-size: 1.5vmax;
  }
}*/
</style>
