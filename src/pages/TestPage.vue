<script setup>
import { ref, onMounted } from 'vue';
const arrayOfLetters = ref([]);
const letterNumber = ref(0);
const letterError = ref(false);
const getText = async () => {
  try {
    const response = await fetch(
      'https://baconipsum.com/api/?type=meat-and-filler&paras=1' //пользовательский ввод
    );
    const json = await response.json();
    arrayOfLetters.value.push(...json[0].replaceAll('  ', ' ')); //текст возвращается с двумя пробелами перед началом следующего предложения
  } catch (error) {
    console.error(error);
    //компонент вывода ошибки
  }
};
getText();

const checkPressedKey = (event) => {
  if (letterNumber.value === arrayOfLetters.value.length) return; //убрать когда сделаю переход на другую страницу при окончании, проверить возврат

  if (event.key === arrayOfLetters.value[letterNumber.value]) {
    letterNumber.value++;
    letterError.value = false;
  } else letterError.value = true;

  if (letterNumber.value === arrayOfLetters.value.length) console.log('ehf');
};

const typingTest = ref(null);
onMounted(() => {
  typingTest.value.focus();
}); //заменить на после нажатия кнопки
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
