<script setup>
import { ref, onMounted } from 'vue';
const arrayOfLetters = ref([]);
const letterNumber = ref(0);
const letterError = ref(false);
let errorCount = 0;
const getText = async () => {
  try {
    const response = await fetch(
      'https://baconipsum.com/api/?type=meat-and-filler&sentences=10' //пользовательский ввод
    );
    const json = await response.json();
    arrayOfLetters.value.push(...json[0].replaceAll('  ', ' ')); //текст возвращается с двумя пробелами перед началом следующего предложения
    differenceAccuracy = 100 / arrayOfLetters.value.length;
  } catch (error) {
    console.error(error);
    //компонент вывода ошибки
  }
};
getText();

/*for (let i = 1; i < 127; i++) {
  console.log(i, String.fromCharCode(i))
}*/

const printSpeed = ref(0);
const startTime = ref(0);
const currentTime = ref(0);
let intervalID = undefined;

const checkPressedKey = (event) => {
  /*if (event.key.charCodeAt() >= 32 && event.key.charCodeAt() <= 126)
    console.log(event.key.charCodeAt())*/
  if (event.key === 'Shift') return;//еще много клавиш
  if (letterNumber.value === arrayOfLetters.value.length) return; //убрать когда сделаю переход на другую страницу при окончании, проверить возврат
  if (!startTime.value) {
    startTime.value = Date.now();
    intervalID = setInterval(() => {
      currentTime.value = Date.now();
      printSpeed.value = Math.round(
        letterNumber.value / ((currentTime.value - startTime.value) / 1000 / 60)
      );
    }, 1000);
  }

  if (event.key === arrayOfLetters.value[letterNumber.value]) {
    letterNumber.value++;
    letterError.value = false;
  } else  {
    if (!letterError.value) {
      accuracy.value -= differenceAccuracy;
      errorCount++;
    }
    if (accuracy.value < 0) accuracy.value = 0;
    letterError.value = true;
  }
  if (letterNumber.value === arrayOfLetters.value.length) {
    clearInterval(intervalID);
    currentTime.value = Date.now();
    printSpeed.value = Math.round(
      letterNumber.value / ((currentTime.value - startTime.value) / 1000 / 60)
    );
    if (errorCount === arrayOfLetters.value.length)
      accuracy.value = 0;
    console.log('ehf');
  }
};

const typingTest = ref(null);
onMounted(() => {
  typingTest.value.focus();
}); //заменить на после нажатия кнопки

let differenceAccuracy = 0;
const accuracy = ref(100);

</script>

<template>
  <main
    class="typing-test"
    ref="typingTest"
    tabindex="1"
    @keydown="checkPressedKey"
  >
    <div class="typing-test__text-content text-content">
      <span
        class="text-content__letter"
        v-for="(letter, index) of arrayOfLetters"
        :key="index + letter"
        :class="{
          'text-content__letter_current': index === letterNumber,
          'text-content__letter_completed': index < letterNumber,
          'text-content__letter_error': index === letterNumber && letterError
        }"
      >
        {{ letter }}
      </span>
    </div>
    <div class="typing-test__print-speed">{{ printSpeed }} зн/мин</div>
    <div class="typing-test__accuracy">{{ accuracy.toFixed(2) }}%</div>
  </main>
</template>

<style>
.typing-test {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
  padding-top: 16px;
  padding-left: 16px;
  background-color: rgb(232, 238, 233);
}

.typing-test:focus {
  outline: none;
}

.typing-test__text-content {
  width: 600px;
  background-color: rgb(253, 240, 222);
  padding: 16px;
  border: 1px solid black;
  border-radius: 16px;
  font-size: 24px;
  user-select: none;
}

.text-content__letter_current {
  background-color: rgb(199, 199, 216);
}

.text-content__letter_error {
  background-color: red;
}

.text-content__letter_completed {
  color: blue;
}
</style>
