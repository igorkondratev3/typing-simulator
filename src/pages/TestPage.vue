<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TestSetup from '@/components/testPage/testSetup.vue';
import TestStatistic from '@/components/testPage/testStatistic.vue';
import RestartButton from '@/components/testPage/restartButton.vue';
import LanguageError from '@/components/testPage/languageError.vue';
import { checkLanguage } from '@/helpers/testPage.js';
import { useTestStatistic } from '@/composables/testStatistic.js';

const setupModal = ref(null);
onMounted(() => {
  setupModal.value.showModal();
});

const arrayOfLetters = ref([]);
const typingTest = ref(null);
const goToTest = (text) => {
  arrayOfLetters.value = [...text[0].replaceAll('  ', ' ')]; //текст возвращается с двумя пробелами перед началом следующего предложения
  calcAccuracyStep(arrayOfLetters.value.length);
  setupModal.value.close();
  typingTest.value.focus();
};

const router = useRouter();
const isLetterError = ref(false);
const isLanguageError = ref(false);
const {
  currentLetterNumber,
  printSpeed,
  accuracy,
  letterErrorCount,
  checkAndStartTest,
  stopTest,
  calcAccuracyStep,
  calcAccuracy,
  normalizeAccuracy,
  resetStatistic
} = useTestStatistic();

const checkPressedKey = (event) => {
  if (!checkLanguage(event.key, isLanguageError)) return;
  checkAndStartTest();

  if (event.key !== arrayOfLetters.value[currentLetterNumber.value]) {
    if (!isLetterError.value) {
      calcAccuracy();
      normalizeAccuracy(arrayOfLetters.value.length);
      letterErrorCount.value++;
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
  setupModal.value.showModal();
};
</script>

<template>
  <dialog class="dialog" ref="setupModal" @cancel.prevent="">
    <TestSetup @goToTest="goToTest" />
  </dialog>
  <main
    class="typing-test"
    ref="typingTest"
    tabindex="1"
    @keypress="checkPressedKey"
  >
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
        <LanguageError v-if="isLanguageError" />
      </div>
    </div>
  </main>
</template>

<style>
.typing-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-top: 16px;
  padding-left: 16px;
}

.typing-test:focus {
  outline: none;
}

.typing-test__text-content {
  width: 600px;
  min-height: 200px;
  background-color: rgb(253, 240, 222);
  padding: 16px;
  border: 1px solid black;
  border-radius: 16px;
  font-size: 24px;
  user-select: none;
  text-align: justify;
}

.text-content__letter {
  letter-spacing: 0.5px;
  border-radius: 2px;
}

.text-content__letter_current {
  background-color: rgb(178, 178, 180);
  font-weight: 700;
  padding-left: 2px;
  padding-right: 2px;
}

.text-content__letter_error {
  background-color: rgb(240, 84, 84);
}

.text-content__letter_completed {
  color: blue;
}

.dialog {
  border: none;
}
</style>
