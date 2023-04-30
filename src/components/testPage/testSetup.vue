<script setup>
import { ref } from 'vue';
import { getText } from '@/helpers/testPage.js';

const emit = defineEmits(['goToTest']);

const sentences = ref(5);
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
  emit('goToTest', textObj.text);
  gettingTextMessage.value = '';
  isGettingText.value = false;
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
          v-for="n in 10"
          :key="n + 'sentences'"
        >
          <p class="sentence__value">{{ n }}</p>
          <input
            class="sentence__radio"
            type="radio"
            name="sentences"
            :value="n"
            v-model="sentences"
          />
        </label>
      </div>
      <button
        class="test-setup__start"
        @click="goToTest"
        :disabled="isGettingText"
      >
        Начать
      </button>
      <div
        class="test-setup__message"
        :class="{ 'test-setup__message_load': isGettingText }"
        v-show="gettingTextMessage"
      >
        {{ gettingTextMessage }}
      </div>
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
}

.dialog__test-setup {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: rgb(186, 187, 190);
  align-items: center;
  border-radius: 8px;
  margin-bottom: 100px;
}

.test-setup__header {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
}

.test-setup__sentences-header {
  font-size: 24px;
}

.test-setup__start {
  width: 200px;
  border: none;
  padding: 16px;
  font-size: 24px;
  background-color: rgb(88, 143, 245);
  cursor: pointer;
  border-radius: 8px;
  margin-top: 32px;
}

.test-setup__start:disabled {
  background-color: rgb(179, 181, 182);
}

.test-setup__message {
  background-color: rgb(201, 80, 80);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 24px;
  padding: 16px;
  border-radius: 8px;
  transform: translateY(calc(100% + 8px));
}

.test-setup__message_load {
  background-color: rgb(88, 143, 245);
}

.sentences {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}

.sentence {
  margin-right: 8px;
  margin-left: 8px;
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
  border: 1px solid transparent;
  border-radius: 50%;
  background-color: rgb(221, 231, 231);
  transition: background-color 0.3s linear;
}

.sentence__radio:checked {
  background-color: rgb(66, 63, 63);
}

.sentence__radio:focus {
  outline: 2px solid white;
}
</style>
