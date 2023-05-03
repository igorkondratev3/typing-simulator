<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import {
  checkLanguage,
  showServiceMessage,
  preventScrolling
} from '@/helpers/testPage.js';
import { useTestStatistic } from '@/composables/testStatistic.js';
import TestSetup from '@/components/testPage/testSetup.vue';
import TestStatistic from '@/components/testPage/testStatistic.vue';
import RestartButton from '@/components/testPage/restartButton.vue';
import TheHeader from '@/components/TheHeader.vue';
const TheKeyboard = defineAsyncComponent(() =>
  import('@/components/keyboard/theKeyboard.vue')
);
const ServiceMessage = defineAsyncComponent(() =>
  import('@/components/serviceMessage.vue')
);

const setupModal = ref(null);
onMounted(() => {
  setupModal.value.showModal();
});

const testPage = ref(null);
const letters = ref([]);
const keyboardVisibilityLS = JSON.parse(
  localStorage.getItem('testSetup')
)?.keyboardVisibility;
const keyboardVisibility = ref(keyboardVisibilityLS ?? true);
const goToTest = (text, isKeyboardSeen) => {
  keyboardVisibility.value = isKeyboardSeen;
  letters.value = [...text[0].replaceAll('  ', ' ')]; //текст возвращается с двумя пробелами перед началом следующего предложения
  calcAccuracyStep(letters.value.length);
  setupModal.value.close();
  testPage.value.focus();
};

const router = useRouter();
const isLetterError = ref(false);
const isLanguageError = ref(false);
const {
  currentLetterNumber,
  printSpeed,
  accuracy,
  increaseError,
  startTest,
  finishTest,
  calcAccuracyStep,
  calcAccuracy,
  normalizeAccuracy,
  resetStatistic
} = useTestStatistic();

const pressedKey = ref('');
const setPressedKey = (key) => {
  pressedKey.value = key;
  setTimeout(() => (pressedKey.value = ''), 50);
};

const isCapsEnabled = ref(false);
const changeCaps = (event) => {
  isCapsEnabled.value = !event.getModifierState('CapsLock');
  setPressedKey('CAPS');
};

let isTestStarted = false;

const checkPressedKey = (event) => {
  preventScrolling(event);
  if (!checkLanguage(event.key, isLanguageError)) {
    showServiceMessage(isLanguageError);
    return;
  }

  if (!isTestStarted) {
    isCapsEnabled.value = event.getModifierState('CapsLock');
    startTest();
    isTestStarted = true;
  }

  setPressedKey(event.key);

  if (event.key !== letters.value[currentLetterNumber.value]) {
    if (!isLetterError.value) {
      calcAccuracy();
      normalizeAccuracy(letters.value.length);
      increaseError();
    }
    isLetterError.value = true;
  }

  if (event.key === letters.value[currentLetterNumber.value]) {
    currentLetterNumber.value++;
    isLetterError.value = false;
  }

  if (currentLetterNumber.value === letters.value.length) {
    finishTest();
    normalizeAccuracy(letters.value.length);
    router.push({
      name: 'CompletePage',
      query: {
        accuracy: accuracy.value.toFixed(2),
        printSpeed: String(printSpeed.value)
      }
    });
  }
};

const restartTest = () => {
  resetStatistic();
  isTestStarted = false;
  isLetterError.value = false;
  pressedKey.value = '';
  setupModal.value.showModal();
};
</script>

<template>
  <dialog class="dialog" ref="setupModal" @cancel.prevent="">
    <TestSetup @goToTest="goToTest" />
  </dialog>
  <div
    class="test-page page-wrapper"
    ref="testPage"
    tabindex="1"
    @keypress="checkPressedKey"
    @keydown.tab.prevent="checkPressedKey"
    @keydown.backspace="setPressedKey('BS')"
    @keydown.caps-lock="changeCaps"
    @keydown.shift.exact="setPressedKey($event.code)"
  >
    <TheHeader
      :hideHeaderHeightLess600="keyboardVisibility"
      :toHomePageVisibility="true"
    />
    <main class="typing-test">
      <div class="typing-test__statistic-and-content">
        <TestStatistic
          :accuracy="accuracy.toFixed(2)"
          :printSpeed="String(printSpeed)"
        />
        <div class="typing-test__text-content text-content">
          <span
            class="text-content__letter"
            v-for="(letter, index) of letters"
            :key="index + letter"
            :class="{
              'text-content__letter_current': index === currentLetterNumber,
              'text-content__letter_completed': index < currentLetterNumber,
              'text-content__letter_error':
                index === currentLetterNumber && isLetterError
            }"
          >
            {{ letter }}
          </span>
          <RestartButton @restartTest="restartTest" />
          <ServiceMessage
            message="Смените раскладку клавиатуры на английскую"
            v-if="isLanguageError"
          />
        </div>
      </div>
      <TheKeyboard
        v-if="keyboardVisibility"
        language="english"
        :necessaryKey="letters[currentLetterNumber]"
        :pressedKey="pressedKey"
        :isCapsEnabled="isCapsEnabled"
      />
    </main>
  </div>
</template>

<style>
.dialog {
  border: none;
}

.test-page:focus {
  outline: none;
}

.typing-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  margin-top: calc(var(--base) * 0.32);
}

.typing-test__text-content {
  width: calc(var(--base) * 6);
  min-height: calc(var(--base) * 2);
  padding: calc(var(--base) * 0.16);
  border: calc(var(--base) * 0.01) solid black;
  border-radius: calc(var(--base) * 0.16);
  user-select: none;
  font-size: calc(var(--base) * 0.24);
  text-align: justify;
  background-color: rgb(253, 240, 222);
}

.text-content__letter {
  border-radius: calc(var(--base) * 0.02);
  letter-spacing: calc(var(--base) * 0.005);
}

.text-content__letter_current {
  padding-left: calc(var(--base) * 0.02);
  padding-right: calc(var(--base) * 0.02);
  font-weight: 700;
  background-color: rgb(178, 178, 180);
}

.text-content__letter_error {
  background-color: rgb(240, 84, 84);
}

.text-content__letter_completed {
  color: rgb(77, 77, 231);
}

@media (max-width: 700px) {
  .typing-test__text-content {
    width: calc(var(--base) * 4);
  }
  .typing-test {
    margin-top: 0;
  }
}

@media (max-width: 501px) {
  .typing-test__text-content {
    width: calc(var(--base) * 3.2);
  }
}

@media (max-width: 415px) {
  .typing-test__text-content {
    padding-bottom: calc(var(--base) * 0.32);
  }
}
</style>
