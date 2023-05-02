<script setup>
import { ref } from 'vue';
import { getText } from '@/helpers/testPage.js';
import ServiceMessage from '@/components/serviceMessage.vue';

const emit = defineEmits(['goToTest']);

const testSetupLS = JSON.parse(localStorage.getItem('testSetup'));

const sentences = ref(testSetupLS?.sentences || 3);
const seenKeyboard = ref(testSetupLS?.seenKeyboard ?? true);
const isGettingText = ref(false);
const gettingTextMessage = ref('');

const goToTest = async () => {
  isGettingText.value = true;
  gettingTextMessage.value = 'Загружаем текст';
  const textObj = await getText(sentences.value);
  if (textObj.error) {
    gettingTextMessage.value = textObj.error;
    isGettingText.value = false;
    return;
  }
  localStorage.setItem(
    'testSetup',
    JSON.stringify({
      sentences: sentences.value,
      seenKeyboard: seenKeyboard.value
    })
  );
  gettingTextMessage.value = '';
  isGettingText.value = false;
  emit('goToTest', textObj.text, seenKeyboard.value);
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
            <p class="sentence__value">{{ n }}</p>
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
          v-model="seenKeyboard"
          @keyup.enter="seenKeyboard = !seenKeyboard"
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
        v-show="gettingTextMessage"
        :message="gettingTextMessage"
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
  padding-left: 8px;
  padding-right: 8px;
  overflow: auto;
  background-color: rgba(77, 76, 76, 0.616);
  backdrop-filter: blur(10px);
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

@media (max-height: 600px) {
  .dialog__wrapper {
    justify-content: flex-start;
    padding-top: 8px;
  }
}

.dialog__test-setup {
  margin-bottom: 100px;
}

.test-setup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background-color: rgb(186, 187, 190);
}

.test-setup__header {
  margin-bottom: 48px;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
}

.test-setup__parameter {
  margin-bottom: 32px;
}

.setup-parameter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.setup-parameter__header {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-align: center;
}

.setup-parameter__parameter {
  margin-top: 8px;
}

.sentences {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.sentences__sentence {
  margin-right: 8px;
  margin-left: 8px;
}

.sentence {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sentence__value {
  font-size: 24px;
}

.sentence__radio {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  border: none;
  border-radius: 50%;
  background-color: rgb(221, 231, 231);
  transition: background-color 0.3s linear;
}

.sentence__radio:focus::after {
  position: absolute;
  content: '';
  bottom: -20px;
  left: 4px;
  width: 12px;
  height: 12px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(-135deg);
}

.sentence__radio:checked {
  background-color: rgb(66, 63, 63);
}

.keyboard-visibility {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  outline: none;
  border: 1px solid white;
  border-radius: 4px;
  background: rgb(232, 238, 233);
  transition: background 0.3s linear, border 0.3s linear;
}

.keyboard-visibility:checked {
  background: rgb(66, 63, 63) url('/src/assets/svg/check.svg');
  border: 1px solid rgb(66, 63, 63);
}

.keyboard-visibility:focus::before {
  position: absolute;
  content: '';
  top: 3px;
  left: -20px;
  width: 12px;
  height: 12px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(-45deg);
}

.test-setup__start {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  background-color: rgb(88, 143, 245);
}

.test-setup__start:disabled {
  background-color: rgb(161, 163, 163);
}

.test-setup__start:focus {
  outline: 1px solid black;
  outline-offset: 2px;
}

@media (min-width: 2200px) {
  .test-setup__start {
    font-size: 1vmax;
}

.test-setup {
  padding: 0.5vmax;
  border-radius: 0.3vmax;
}

.test-setup__start {
  width: 100%;
  padding: 0.5vmax;
  border-radius: 0.3vmax;
}

.setup-parameter__parameter {
  margin-top: 0.3vmax;
}

.test-setup__header {
  margin-bottom: 2vmax;
}

.test-setup__parameter {
  margin-bottom: 1.6vmax;
}

.test-setup__header {
  font-size: 1.5vmax;
}

.setup-parameter__header {
  font-size: 1vmax;
}

.sentence__value {
  font-size: 1vmax;  
}

.sentence__radio {
  width: 1vmax;
  height: 1vmax;
}

.sentences__sentence {
  margin-right: 0.5vmax;
  margin-left: 0.5vmax;
}

.keyboard-visibility {
  width: 1vmax;
  height: 1vmax;
}

.keyboard-visibility:focus::before {
  width: 0.5vmax;
  height: 0.5vmax;
  top: 0.2vmax;
  left: -0.8vmax;
}

.keyboard-visibility:checked {
  background: rgb(66, 63, 63), url('/src/assets/svg/check.svg');
  background-size: 1.1vmax;
}

.sentence__radio:focus::after {
  bottom: -0.8vmax;
  left: 0.25vmax;
  width: 0.5vmax;
  height: 0.5vmax;
}

}

/*@media (min-height: 1200px) {вставить для высоты
  .header {
    font-size: 1.5vmax;
  }
}*/
</style>
