import clickKeyboard from './clickKeyBoard';
import data from './data';

const renderKeyboard = (dataArr) => {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  dataArr.forEach((element, index) => {
    const button = document.createElement('button');
    button.classList.add(
      'keyboard--key',
      data[index].group,
    );
    button.id = data[index].code;
    button.type = 'button';
    button.textContent = element;

    // Кнопка мыши нажата над элементом.
    button.addEventListener('mousedown', (event) => {
      clickKeyboard(event);
    });

    keyboard.append(button);
  });
  return keyboard;
};

export default renderKeyboard;
