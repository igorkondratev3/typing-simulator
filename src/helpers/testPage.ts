import type { Ref } from 'vue';

export interface TextObj {
  [index: string]: string;
}

export const getText = async (sentences: number): Promise<TextObj> => {
  try {
    const response = await fetch(
      `https://baconipsum.com/api/?type=meat-and-filler&sentences=${sentences}`
    );
    const json: undefined | string = await response.json();
    if (!json) throw new Error('Отсутствует текст');
    return { text: json };
  } catch (error) {
    console.error(error);
    return { error: 'Ошибка при получении текста. Попробуйте еще раз.' };
  }
};

export const showServiceMessage = (isLanguageError: Ref<boolean>): void => {
  if (!isLanguageError.value) {
    isLanguageError.value = true;
    setTimeout(() => (isLanguageError.value = false), 2500);
  }
};

export const checkLanguage = (letter: string): boolean => {
  if ((letter >= 'А' && letter <= 'я') || letter === 'ё' || letter === 'Ё')
    return false;
  return true;
};

export const preventScrolling = (event: KeyboardEvent): void => {
  if (event.key === ' ') event.preventDefault();
};
