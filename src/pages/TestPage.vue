<script setup>
import { ref, onMounted } from 'vue';
const arrayOfLetters = ref([]);
const letterNumber = ref(0);
const letterError = ref(false);
let errorCount = 0;
const sentences = ref(5);

const getText = async () => {
  try {
    const response = await fetch(
      `https://baconipsum.com/api/?type=meat-and-filler&sentences=${sentences.value}` //пользовательский ввод
    );
    const json = await response.json();
    arrayOfLetters.value = [...json[0].replaceAll('  ', ' ')]; //текст возвращается с двумя пробелами перед началом следующего предложения
    differenceAccuracy = 100 / arrayOfLetters.value.length;
  } catch (error) {
    console.error(error);
    //компонент вывода ошибки
  }
};

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
  if (event.key === 'Shift') return; //еще много клавиш
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
  } else {
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
    if (errorCount === arrayOfLetters.value.length) accuracy.value = 0;
    console.log('ehf');
  }
};

let differenceAccuracy = 0;
const accuracy = ref(100);

const setupModal = ref(null);
const typingTest = ref(null);
onMounted(() => {
  //  typingTest.value.focus();
  setupModal.value.showModal();
}); //заменить на после нажатия кнопки

const startGetText = ref(false);
const startTrain = async () => {
  startGetText.value = true;
  await getText();
  startGetText.value = false;
  setupModal.value.close();
  typingTest.value.focus();
};
</script>

<template>
  <dialog class="dialog" ref="setupModal" @cancel.prevent="">
    <div class="dialog__wrapper">
      <div class="dialog__setup-test setup-test">
        <h3 class="setup-test__header">Настройка параметров</h3>
        <h5 class="setup-test__sentences-header">
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
          class="setup-test__start"
          @click="startTrain"
          :disabled="startGetText"
        >
          Начать
        </button>
        <div v-show="startGetText">Грузим</div>
      </div>
    </div>
  </dialog>
  <main
    class="typing-test"
    ref="typingTest"
    tabindex="1"
    @keydown="checkPressedKey"
  >
    <div class="typing-test__statistic-and-content">
      <div class="typing-test__statistic statistic">
        <div class="statistic__icon-and-parameter">
          <img class="statistic__icon" src="/src/assets/svg/speed.svg" />
          <div class="statistic__parameter statistic-parameter">
            <p class="statistic-parameter__header">Скорость:</p>
            <div class="statistic-parameter__value">
              <p class="statistic-parameter__speed">{{ printSpeed }}</p>
              <p>зн/мин</p>
            </div>
          </div>
        </div>
        <div class="statistic__icon-and-parameter">
          <img class="statistic__icon" src="/src/assets/svg/task.svg" />
          <div class="statistic__parameter statistic-parameter">
            <p class="statistic-parameter__header">Точночть:</p>
            <div class="statistic-parameter__value">
              <p class="statistic-parameter__accuracy">
                {{ accuracy.toFixed(2) }}
              </p>
              <p>%</p>
            </div>
          </div>
        </div>
      </div>

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
        <button class="typing-test__restart">
          <img class="statistic__icon" src="/src/assets/svg/restart.svg"/>
        </button>
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

.text-content__letter_current {
  background-color: rgb(199, 199, 216);
  font-weight: 700;
}

.text-content__letter_error {
  background-color: red;
}

.text-content__letter_completed {
  color: blue;
}

.dialog {
  border: none;
}

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

.dialog__setup-test {
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: rgb(186, 187, 190);
  align-items: center;
  border-radius: 8px;
}

.setup-test__header {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
}

.setup-test__sentences-header {
  font-size: 24px;
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

.setup-test__start {
  width: 200px;
  border: none;
  padding: 16px;
  font-size: 24px;
  background-color: rgb(88, 143, 245);
  cursor: pointer;
  border-radius: 8px;
  margin-top: 32px;
}
.statistic {
  display: flex;
  justify-content: space-around;
  font-size: 24px;
}

.statistic__parameter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic__icon-and-parameter {
  display: flex;
  align-items: center;
}

.statistic__icon {
  width: 48px;
  height: 48px;
  margin-right: 8px;
}

.statistic-parameter__value {
  display: flex;
}

.statistic-parameter__speed {
  width: 50px;
  text-align: center;
}

.statistic-parameter__accuracy {
  width: 75px;
  text-align: center;
}

.typing-test__restart {
  position: absolute;
  right: -52px;
  bottom: -8px;
  cursor: pointer;
  background-color: transparent;
  border: none;
}


</style>
