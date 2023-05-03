export const getText = async (sentences) => {
  try {
    const response = await fetch(
      `https://baconipsum.com/api/?type=meat-and-filler&sentences=${sentences}`
    );
    const json = await response.json();
    if (!json) throw new Error('Отсутствует текст');
    return { text: json };
  } catch (error) {
    console.error(error);
    return { error: 'Ошибка при получении текста. Попробуйте еще раз.' };
  }
};

export const showServiceMessage = (isLanguageError) => {
  if (!isLanguageError.value) {
    isLanguageError.value = true;
    setTimeout(() => (isLanguageError.value = false), 2500);
  }
};

export const checkLanguage = (letter) => {
  if ((letter >= 'А' && letter <= 'я') || letter === 'ё' || letter === 'Ё')
    return false;
  return true;
};

export const preventScrolling = (event) => {
  if (event.key === ' ') event.preventDefault();
};
