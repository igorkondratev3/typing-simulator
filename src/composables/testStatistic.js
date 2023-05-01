import { ref } from 'vue';

export const useTestStatistic = () => {
  const currentLetterNumber = ref(0);
  const printSpeed = ref(0);
  const accuracy = ref(100);
  let letterErrorCount = 0;
  let startPrintTime = 0;
  let printSpeedCalcInterval;
  let accuracyStep = 0;

  const checkAndStartTest = () => {
    if (!startPrintTime) {
      startPrintTime = Date.now();
      printSpeedCalcInterval = setInterval(() => {
        printSpeed.value = Math.round(
          currentLetterNumber.value /
            ((Date.now() - startPrintTime) / 1000 / 60)
        );
      }, 1000);
    }
  };

  const stopTest = () => {
    clearInterval(printSpeedCalcInterval);
    printSpeed.value = Math.round(
      currentLetterNumber.value / ((Date.now() - startPrintTime) / 1000 / 60)
    );
  };

  const calcAccuracyStep = (numberOfLetters) =>
    (accuracyStep = 100 / numberOfLetters);

  const calcAccuracy = () => (accuracy.value -= accuracyStep);

  const normalizeAccuracy = (numberOfLetters) => {
    if (accuracy.value < 0) accuracy.value = 0;
    if (letterErrorCount === numberOfLetters) accuracy.value = 0;
  };

  const increaseError = () => {letterErrorCount++; console.log(letterErrorCount)};

  const resetStatistic = () => {
    clearInterval(printSpeedCalcInterval);
    currentLetterNumber.value = 0;
    printSpeed.value = 0;
    accuracy.value = 100;
    letterErrorCount = 0;
    startPrintTime = 0;
    printSpeedCalcInterval = undefined;
    accuracyStep = 0;
  };

  return {
    printSpeed,
    currentLetterNumber,
    accuracy,
    increaseError,
    checkAndStartTest,
    stopTest,
    calcAccuracyStep,
    calcAccuracy,
    normalizeAccuracy,
    resetStatistic
  };
};
