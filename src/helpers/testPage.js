export const getText = async (sentences) => {
  try {
    const response = await fetch(
      `https://baconipsum.com/api/?type=meat-and-filler&sentences=${sentences}`
    );
    const json = await response.json();
    return { text: json };
  } catch (error) {
    console.error(error);
    return { error: 'Ошибка при получении текста. Попробуйте еще раз.' };
  }
};

export const checkLanguage = (letter, seenLanguageError) => {
  if ((letter >= 'А' && letter <= 'я') || letter === 'ё' || letter === 'Ё') {
    if (!seenLanguageError.value) {
      seenLanguageError.value = true;
      setTimeout(() => (seenLanguageError.value = false), 3000);
    }
    return false;
  }
  return true;
};
