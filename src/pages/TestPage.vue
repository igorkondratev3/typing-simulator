<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import TestSetup from '@/components/testPage/testSetup.vue';
import TestStatistic from '@/components/testPage/testStatistic.vue';
import RestartButton from '@/components/testPage/restartButton.vue';
import TheHeader from '@/components/TheHeader.vue';
import { checkLanguage } from '@/helpers/testPage.js';
import { useTestStatistic } from '@/composables/testStatistic.js';
const TheKeyboard = defineAsyncComponent(() =>
  import('@/components/theKeyboard.vue')
);
const ServiceMessage = defineAsyncComponent(() =>
  import('@/components/serviceMessage.vue')
);

const setupModal = ref(null);
onMounted(() => {
  setupModal.value.showModal();
});

const arrayOfLetters = ref([]);
const testPage = ref(null);
const seenKeyboardLS = JSON.parse(
  localStorage.getItem('testSetup')
)?.seenKeyboard;
const seenKeyboard = ref(seenKeyboardLS ?? true);
const goToTest = (text, keyboardVisibility) => {
  seenKeyboard.value = keyboardVisibility;
  arrayOfLetters.value = [...text[0].replaceAll('  ', ' ')]; //текст возвращается с двумя пробелами перед началом следующего предложения
  calcAccuracyStep(arrayOfLetters.value.length);
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
  checkAndStartTest,
  stopTest,
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

const checkPressedKey = (event) => {
  if (!checkLanguage(event.key, isLanguageError)) return;
  checkAndStartTest();

  setPressedKey(event.key);

  if (event.key !== arrayOfLetters.value[currentLetterNumber.value]) {
    if (!isLetterError.value) {
      calcAccuracy();
      normalizeAccuracy(arrayOfLetters.value.length);
      increaseError();
    }
    isLetterError.value = true;
  }

  if (event.key === arrayOfLetters.value[currentLetterNumber.value]) {
    currentLetterNumber.value++;
    isLetterError.value = false;
  }

  if (currentLetterNumber.value === arrayOfLetters.value.length) {
    stopTest();
    normalizeAccuracy(arrayOfLetters.value.length);
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
    @keydown.tab.prevent=""
    @keydown.space.prevent="checkPressedKey({ key: ' ' })"
  >
    <TheHeader />
    <main class="typing-test">
      <div class="typing-test__statistic-and-content">
        <TestStatistic
          :accuracy="accuracy.toFixed(2)"
          :printSpeed="String(printSpeed)"
        />
        <div class="typing-test__text-content text-content">
          <span
            class="text-content__letter"
            v-for="(letter, index) of arrayOfLetters"
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
        v-if="seenKeyboard"
        language="english"
        :necessaryKey="arrayOfLetters[currentLetterNumber]?.toUpperCase()"
        :pressedKey="pressedKey?.toUpperCase()"
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
  padding-top: 32px;
}

.typing-test__text-content {
  width: 600px;
  min-height: 200px;
  padding: 16px;
  border: 1px solid black;
  border-radius: 16px;
  user-select: none;
  font-size: 24px;
  text-align: justify;
  background-color: rgb(253, 240, 222);
}

.text-content__letter {
  border-radius: 2px;
  letter-spacing: 0.5px;
}

.text-content__letter_current {
  padding-left: 2px;
  padding-right: 2px;
  font-weight: 700;
  background-color: rgb(178, 178, 180);
}

.text-content__letter_error {
  background-color: rgb(240, 84, 84);
}

.text-content__letter_completed {
  color: rgb(77, 77, 231);
}
</style>
