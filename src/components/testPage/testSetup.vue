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
  localStorage.setItem('testSetup', JSON.stringify({
    sentences: sentences.value,
    seenKeyboard: seenKeyboard.value
  }));
  gettingTextMessage.value = '';
  isGettingText.value = false;
  emit('goToTest', textObj.text, seenKeyboard.value);
};
</script>

<template>
  <div class="dialog__wrapper">
    <div class="dialog__test-setup test-setup">
      <h3 class="test-setup__header">Настройка параметров</h3>
      <h5 class="test-setup__sentences-header">
        Количетво предложений в тексте:
      </h5>
      <div class="sentences">
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
      <h5 class="test-setup__keyboard-visibility-header">
        Показывать клавиатуру
      </h5>
      <input
        class="test-setup__keyboard-visibility"
        type="checkbox"
        v-model="seenKeyboard"
        @keyup.enter="seenKeyboard = !seenKeyboard"
      />
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
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.616);
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

.dialog__test-setup {
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
  padding: 16px;
  border-radius: 8px;
  background-color: rgb(186, 187, 190);
  align-items: center;
}

.test-setup__header {
  margin-bottom: 32px;
  font-size: 32px;
  font-weight: 700;
}

.test-setup__sentences-header {
  font-size: 24px;
}

.sentences {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 8px;
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

.sentence__radio:checked {
  background-color: rgb(66, 63, 63);
}

.sentence__radio:focus {
  outline: 1px solid white;
}

.test-setup__keyboard-visibility-header {
  margin-top: 24px;
  margin-bottom: 8px;
  font-size: 24px;
}

.test-setup__keyboard-visibility {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  outline: 1px solid transparent;
  outline-offset: 2px;
  border: 1px solid white;
  border-radius: 4px;
  background: rgb(232, 238, 233);
  transition: background 0.3s linear, border 0.3s linear;
}

.test-setup__keyboard-visibility:checked {
  background: rgb(66, 63, 63) url('/src/assets/svg/check.svg');
  border: 1px solid rgb(66, 63, 63);
}

.test-setup__keyboard-visibility:focus {
  outline: 2px solid rgb(66, 63, 63);
}

.test-setup__keyboard-visibility:checked:focus {
  outline: 2px solid white;
}

.test-setup__start {
  width: 200px;
  margin-top: 32px;
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
</style>
