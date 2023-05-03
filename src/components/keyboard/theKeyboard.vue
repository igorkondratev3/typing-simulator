<script setup>
import { computed } from 'vue';
import { defineLook } from './defineLook.js';

const props = defineProps({
  language: String,
  pressedKey: String,
  necessaryKey: String,
  isCapsEnabled: Boolean
});

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

const keys = computed(() => letters[props.language] || letters.english);
const formattedPressedKey = computed(() => {
  if (props.pressedKey === 'ShiftLeft') return 'SHIFT-L';
  if (props.pressedKey === 'ShiftRight') return 'SHIFT-R';
  return props.pressedKey?.toUpperCase();
});
const formattedNecessaryKey = computed(() => props.necessaryKey?.toUpperCase());
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
            'keyboard__necessary-key': formattedNecessaryKey === key,
            'keyboard__pressed-key': formattedPressedKey === key,
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
  --button-width: calc(var(--base) * 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: calc(var(--base) * 0.16);
}

.keyboard__row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-top: calc(var(--base) * 0.02);
  margin-bottom: calc(var(--base) * 0.02);
}

.keyboard__row_center {
  align-self: center;
}

.keyboard__key {
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--button-width);
  height: var(--button-width);
  margin-left: calc(var(--base) * 0.02);
  margin-right: calc(var(--base) * 0.02);
  border-radius: calc(var(--base) * 0.08);
  overflow: hidden;
  font-size: calc(var(--button-width) * 0.35);
  text-align: center;
  user-select: none;
  background-color: rgba(199, 211, 207, 0.534);
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
  outline: calc(var(--base) * 0.01) solid black;
  outline-offset: calc(var(--base) * 0.02);
}

.keyboard__pressed-key {
  background-color: rgba(92, 91, 91, 0.5);
}

.keyboard__caps-enabled::after {
  position: absolute;
  content: '*';
  top: calc(var(--base) * 0.02);
  right: calc(var(--base) * 0.02);
}

@media (max-width: 820px) {
  .keyboard {
    --button-width: calc(var(--base) * 0.35);
  }
}

@media (max-width: 600px) {
  .keyboard {
    --button-width: calc(var(--base) * 0.2);
  }
}
</style>
