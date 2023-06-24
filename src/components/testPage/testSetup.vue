<script setup lang="ts">
import { ref } from 'vue';
import { getText, type TextObj } from '@/helpers/testPage.js';
import ServiceMessage from '@/components/serviceMessage.vue';

const emit = defineEmits<{
  goToTest: [textObj: string, keyboardVisibility: boolean];
}>();

interface TestSetup {
  sentences: number;
  keyboardVisibility: boolean;
}

const testSetupLS: undefined | TestSetup = JSON.parse(
  localStorage.getItem('testSetup') || 'undefined'
);
const sentences = ref(testSetupLS?.sentences || 3);
const keyboardVisibility = ref(testSetupLS?.keyboardVisibility ?? true);
const isGettingText = ref(false);
const serviceMessage = ref('');

const goToTest = async () => {
  isGettingText.value = true;
  serviceMessage.value = 'Загружаем текст';
  const textObj: TextObj = await getText(sentences.value);
  if (textObj.error) {
    serviceMessage.value = textObj.error;
    isGettingText.value = false;
    return;
  }

  const testSetup: TestSetup = {
    sentences: sentences.value,
    keyboardVisibility: keyboardVisibility.value
  };
  localStorage.setItem('testSetup', JSON.stringify(testSetup));

  serviceMessage.value = '';
  isGettingText.value = false;
  emit('goToTest', textObj.text, keyboardVisibility.value);
};
</script>

<template>
  <div class="dialog__wrapper">
    <div class="dialog__test-setup test-setup">
      <h2 class="test-setup__header">Настройка параметров теста</h2>
      <div class="test-setup__parameter setup-parameter">
        <h3 class="setup-parameter__header">Количетво предложений в тексте</h3>
        <div class="setup-parameter__parameter sentences">
          <label
            class="sentences__sentence sentence"
            v-for="n in 5"
            :key="n + 'sentences'"
          >
            <h5 class="sentence__value">{{ n }}</h5>
            <input
              class="sentence__radio"
              type="radio"
              name="sentences"
              :autofocus="n === sentences"
              :value="n"
              v-model="sentences"
            />
          </label>
        </div>
      </div>
      <label class="test-setup__parameter setup-parameter">
        <h3 class="setup-parameter__header">Показывать клавиатуру</h3>
        <input
          class="setup-parameter__parameter keyboard-visibility"
          type="checkbox"
          v-model="keyboardVisibility"
          @keyup.enter="keyboardVisibility = !keyboardVisibility"
        />
      </label>
      <button
        class="test-setup__start"
        @click="goToTest"
        :disabled="isGettingText"
      >
        Начать
      </button>
      <ServiceMessage
        v-show="serviceMessage"
        :message="serviceMessage"
        :class="{ 'service-message_blue': isGettingText }"
      />
    </div>
  </div>
</template>

<style>
.dialog__wrapper {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding-left: calc(var(--base) * 0.08);
  padding-right: calc(var(--base) * 0.08);
  background-color: rgba(77, 76, 76, 0.616);
  backdrop-filter: blur(calc(var(--base) * 0.1));
  overflow: auto;
  scrollbar-width: none;
}

.dialog__wrapper::-webkit-scrollbar {
  display: none;
}

.dialog__wrapper::-webkit-scrollbar-track {
  display: none;
}

.dialog__wrapper::-webkit-scrollbar-thumb {
  display: none;
}

.dialog__test-setup {
  margin-bottom: var(--base);
}

.test-setup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--base) * 0.16);
  border-radius: calc(var(--base) * 0.08);
  background-color: rgb(186, 187, 190);
}

.test-setup__header {
  margin-bottom: calc(var(--base) * 0.48);
  font-size: calc(var(--base) * 0.32);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
}

.test-setup__parameter {
  margin-bottom: calc(var(--base) * 0.32);
}

.setup-parameter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.setup-parameter__header {
  font-size: calc(var(--base) * 0.24);
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
}

.setup-parameter__parameter {
  margin-top: calc(var(--base) * 0.08);
}

.sentences {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.sentences__sentence {
  margin-right: calc(var(--base) * 0.08);
  margin-left: calc(var(--base) * 0.08);
}

.sentence {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sentence__value {
  font-size: calc(var(--base) * 0.24);
}

.sentence__radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: calc(var(--base) * 0.2);
  height: calc(var(--base) * 0.2);
  outline: none;
  border: none;
  border-radius: 50%;
  background-color: rgb(221, 231, 231);
  transition: background-color 0.3s linear;
}

.sentence__radio:focus::after {
  position: absolute;
  content: '';
  bottom: calc(var(--base) * -0.2);
  left: calc(var(--base) * 0.04);
  width: calc(var(--base) * 0.12);
  height: calc(var(--base) * 0.12);
  border: solid black;
  border-width: 0 calc(var(--base) * 0.02) calc(var(--base) * 0.02) 0;
  transform: rotate(-135deg);
}

.sentence__radio:checked {
  background-color: rgb(66, 63, 63);
}

.keyboard-visibility {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: calc(var(--base) * 0.2);
  height: calc(var(--base) * 0.2);
  outline: none;
  border: calc(var(--base) * 0.01) solid white;
  border-radius: calc(var(--base) * 0.04);
  background: rgb(232, 238, 233);
  transition: background 0.3s linear, border 0.3s linear;
}

.keyboard-visibility:checked {
  background: rgb(66, 63, 63) url('/src/assets/svg/check.svg');
  background-size: calc(var(--base) * 0.24);
  border: calc(var(--base) * 0.01) solid rgb(66, 63, 63);
}

.keyboard-visibility:focus::before {
  position: absolute;
  content: '';
  top: calc(var(--base) * 0.03);
  left: calc(var(--base) * -0.2);
  width: calc(var(--base) * 0.12);
  height: calc(var(--base) * 0.12);
  border: solid black;
  border-width: 0 calc(var(--base) * 0.02) calc(var(--base) * 0.02) 0;
  transform: rotate(-45deg);
}

.test-setup__start {
  width: 100%;
  padding: calc(var(--base) * 0.16);
  border: none;
  border-radius: calc(var(--base) * 0.08);
  cursor: pointer;
  font-size: calc(var(--base) * 0.24);
  color: black;
  background-color: rgb(88, 143, 245);
}

.test-setup__start:disabled {
  background-color: rgb(161, 163, 163);
}

.test-setup__start:focus {
  outline: calc(var(--base) * 0.01) solid black;
  outline-offset: calc(var(--base) * 0.02);
}

@media (max-height: 600px) {
  .dialog__wrapper {
    justify-content: flex-start;
    padding-top: calc(var(--base) * 0.08);
  }
}
</style>
