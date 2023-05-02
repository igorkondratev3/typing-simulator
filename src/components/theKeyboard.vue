<script setup>
import { computed } from 'vue';
const props = defineProps({
  language: String,
  pressedKey: String,
  necessaryKey: String,
  isCapsEnabled: Boolean
});
//перенести в другой файл

const letters = {
  english: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BS'],
    ['TAB', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
    ['CAPS', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'ENTER'],
    ['SHIFT-L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'SHIFT-R'],
    [' ']
  ],
  russian: [
    ['Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'BS'],
    ['TAB', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '\\'],
    ['CAPS', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'ENTER'],
    ['SHIFT-L', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.', 'SHIFT-R'],
    [' ']
  ]
};

const colors = [
  ['`', 'v', 'v', 'g', 't', 'y', 'y', 'o', 't', 'g', 'v', 'v', 'v', 'BS'],
  ['TAB', 'v', 'g', 't', 'y', 'y', 'o', 'o', 't', 'g', 'v', 'v', 'v', '\\'],
  ['CAPS', 'v', 'g', 't', 'y', 'y', 'o', 'o', 't', 'g', 'v', 'v', 'ENTER'],
  ['SHIFT-L', 'v', 'g', 't', 'y', 'y', 'o', 'o', 't', 'g', 'v', 'SHIFT-R'],
  [' ']
];

const keys = computed(() => letters[props.language]);

const defineLook = (rowIndex, keyIndex, key) => {
  const look = {};

  switch (key) {
    case '`':
      look['keyboard__key_quarter-to'] = true;
      break;
    case 'Ё':
      look['keyboard__key_quarter-to'] = true;
      break;
    case 'TAB':
      look['keyboard__key_one-quarter'] = true;
      break;
    case '\\':
      look['keyboard__key_one-quarter'] = true;
      break;
    case 'CAPS':
      look['keyboard__key_one-half'] = true;
      break;
    case 'BS':
      look['keyboard__key_quarter-to-two'] = true;
      break;
    case 'ENTER':
      look['keyboard__key_double'] = true;
      break;
    case 'SHIFT-L':
      look['keyboard__key_two-quarter'] = true;
      break;
    case 'SHIFT-R':
      look['keyboard__key_two-quarter'] = true;
      break;
    case ' ':
      look['keyboard__key_nine-quarter'] = true;
      break;
  }

  switch (colors[rowIndex][keyIndex]) {
    case 'v':
      look['keyboard__key_violet'] = true;
      break;
    case 't':
      look['keyboard__key_turquoise'] = true;
      break;
    case 'g':
      look['keyboard__key_green'] = true;
      break;
    case 'y':
      look['keyboard__key_yellow'] = true;
      break;
    case 'o':
      look['keyboard__key_orange'] = true;
      break;
  }

  return look;
};
</script>

<template>
  <div class="keyboard">
    <div
      class="keyboard__row"
      v-for="(row, rowIndex) of keys"
      :key="'row' + rowIndex"
      :class="{ keyboard__row_center: row.length === 1 }"
    >
      <div
        class="keyboard__key"
        v-for="(key, keyIndex) of row"
        :key="'key' + key"
        :class="
          Object.assign({}, defineLook(rowIndex, keyIndex, key), {
            'keyboard__necessary-key': props.necessaryKey === key,
            'keyboard__pressed-key': props.pressedKey === key,
            'keyboard__caps-enabled': props.isCapsEnabled && key === 'CAPS'
          })
        "
      >
        {{ key }}
      </div>
    </div>
  </div>
</template>

<style>
.keyboard {
  --button-width: 50px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media(max-width: 820px) {
  .keyboard {
    --button-width: 35px;
  }
}

@media(max-width: 600px) {
  .keyboard {
    --button-width: 20px;
  }
}

.keyboard__row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: 2px;
  margin-bottom: 2px;
}

.keyboard__row_center {
  align-self: center;
}

.keyboard__key {
  background-color: rgba(199, 211, 207, 0.534);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  margin-left: 2px;
  margin-right: 2px;
  width: var(--button-width);
  height: var(--button-width);
  font-size: calc(var(--button-width) * 0.35);
  user-select: none;
}

.keyboard__key_quarter-to {
  width: calc(var(--button-width) * 0.75);
}

.keyboard__key_one-quarter {
  width: calc(var(--button-width) * 1.25);
}

.keyboard__key_one-half {
  width: calc(var(--button-width) * 1.5);
}

.keyboard__key_quarter-to-two {
  width: calc(var(--button-width) * 1.75);
}

.keyboard__key_double {
  width: calc(var(--button-width) * 2);
}

.keyboard__key_two-quarter {
  width: calc(var(--button-width) * 2.25);
}

.keyboard__key_nine-quarter {
  width: calc(var(--button-width) * 9.25);
}

.keyboard__key_violet {
  background-color: rgb(211, 69, 240, 0.534);
}

.keyboard__key_turquoise {
  background-color: rgb(69, 240, 217, 0.534);
}

.keyboard__key_green {
  background-color: rgb(103, 240, 69, 0.534);
}

.keyboard__key_yellow {
  background-color: rgba(247, 244, 67, 0.534);
}

.keyboard__key_orange {
  background-color: rgba(250, 198, 100, 0.534);
}

.keyboard__necessary-key {
  outline: 1px solid black;
  outline-offset: 2px;
}

.keyboard__pressed-key {
  background-color: rgba(92, 91, 91, 0.5);
}

.keyboard__caps-enabled::after {
    position: absolute;
    content: '*';
    top: 2px;
    right: 2px;
  }
</style>
