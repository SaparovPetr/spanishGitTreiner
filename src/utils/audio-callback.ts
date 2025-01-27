import { AppMode, TOneWord } from '@utils-types';

/**
 * воспроизведение аудио из публичного api SkyEng
 * @param array массив из стора, первый элемент которого воспроизведется
 */
export const audioCallback = (array: TOneWord[]) => {
  if (localStorage.getItem('currientMode') === 'es400') {
    const audioObj = new Audio(array[0].audioURL);
    audioObj.play();
  } else {
    const audioObj = new Audio(
      `https://vimbox-tts.skyeng.ru/api/v1/tts?text=${array[0].targetWord}&lang=en&voice=male_2`
    );
    audioObj.play();
  }
};
