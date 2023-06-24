import { ref, onUnmounted, type Ref } from 'vue';

interface TestStatisticInterface {
  printSpeed: Ref<number>;
  currentLetterNumber: Ref<number>;
  accuracy: Ref<number>;
  increaseError: () => number;
  startTest: () => void;
  finishTest: () => void;
  calcAccuracyStep: (numberOfLetters: number) => number;
  calcAccuracy: () => number;
  normalizeAccuracy: (numberOfLetters: number) => void;
  resetStatistic: () => void;
}

export const useTestStatistic = (): TestStatisticInterface => {
  const currentLetterNumber = ref(0);
  const printSpeed = ref(0);
  const accuracy = ref(100);
  let errorCount = 0;
  let startPrintTime = 0;
  let printSpeedCalcInterval: number | undefined = undefined;
  let accuracyStep = 0;

  const startTest: TestStatisticInterface['startTest'] = () => {
    startPrintTime = Date.now();
    printSpeedCalcInterval = setInterval(() => {
      printSpeed.value = Math.round(
        currentLetterNumber.value / ((Date.now() - startPrintTime) / 1000 / 60)
      );
    }, 1000);
  };

  const finishTest: TestStatisticInterface['finishTest'] = () => {
    clearInterval(printSpeedCalcInterval);
    printSpeed.value = Math.round(
      currentLetterNumber.value / ((Date.now() - startPrintTime) / 1000 / 60)
    );
  };
  onUnmounted(() => clearInterval(printSpeedCalcInterval));

  const calcAccuracyStep: TestStatisticInterface['calcAccuracyStep'] = (
    numberOfLetters
  ) => (accuracyStep = 100 / numberOfLetters);

  const calcAccuracy: TestStatisticInterface['calcAccuracy'] = () =>
    (accuracy.value -= accuracyStep);

  const normalizeAccuracy: TestStatisticInterface['normalizeAccuracy'] = (
    numberOfLetters
  ) => {
    if (accuracy.value < 0) accuracy.value = 0;
    if (errorCount === numberOfLetters) accuracy.value = 0;
  };

  const increaseError: TestStatisticInterface['increaseError'] = () =>
    errorCount++;

  const resetStatistic: TestStatisticInterface['resetStatistic'] = () => {
    clearInterval(printSpeedCalcInterval);
    currentLetterNumber.value = 0;
    printSpeed.value = 0;
    accuracy.value = 100;
    errorCount = 0;
    startPrintTime = 0;
    printSpeedCalcInterval = undefined;
    accuracyStep = 0;
  };

  return {
    printSpeed,
    currentLetterNumber,
    accuracy,
    increaseError,
    startTest,
    finishTest,
    calcAccuracyStep,
    calcAccuracy,
    normalizeAccuracy,
    resetStatistic
  };
};
