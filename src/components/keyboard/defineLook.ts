const colors: ReadonlyArray<ReadonlyArray<string>> = [
  ['`', 'v', 'v', 'g', 't', 'y', 'y', 'o', 't', 'g', 'v', 'v', 'v', 'BS'],
  ['TAB', 'v', 'g', 't', 'y', 'y', 'o', 'o', 't', 'g', 'v', 'v', 'v', '\\'],
  ['CAPS', 'v', 'g', 't', 'y', 'y', 'o', 'o', 't', 'g', 'v', 'v', 'ENTER'],
  ['SHIFT-L', 'v', 'g', 't', 'y', 'y', 'o', 'o', 't', 'g', 'v', 'SHIFT-R'],
  [' ']
];

interface Look {
  [index: string]: boolean;
}

export const defineLook = (
  rowIndex: number,
  keyIndex: number,
  key: string
): Look => {
  const look: Look = {};

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
