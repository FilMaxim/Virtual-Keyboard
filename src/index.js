import data from './components/data';
import setCaretPosition from './components/positionCaret';
import renderKeyboard from './components/render-keyboard';

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

const textArea = document.createElement('textarea');
textArea.autofocus = true;
textArea.focus();
textArea.placeholder = 'Введите ваш текст....';
textArea.classList.add('keyboard__text');

const arrValueFunc = (status) => data.map((el) => {
  if (el.group === 'alphanumeric') return el[status];
  if (el.group === 'service') return el.key;
  return false;
});

const arrValue = arrValueFunc('key');

const keyboard = renderKeyboard(arrValue);
wrapper.append(textArea, keyboard);
document.body.append(wrapper);

const print = (event) => {
  // активная кнопка, позиция в массиве
  let positionInArr;
  if (event.code) {
    positionInArr = data.findIndex((el) => el.code === event.code);
  } else {
    positionInArr = data.findIndex((el) => el.code === event.target.id);
  }

  if (event.target.classList.contains('keyboard--key')) {
    event.target.classList.add('hover');
  }
  // функционал на буквы и цифра по group === 'alphanumeric';
  if (data[positionInArr] && data[positionInArr].group === 'alphanumeric') {
    textArea.setRangeText(arrValue[positionInArr], textArea.selectionStart, textArea.selectionEnd, 'end');
    textArea.focus();
  }
  // функционал на BACKSPACE;
  if (data[positionInArr] && data[positionInArr].code === 'Backspace') {
    if (textArea.selectionStart !== 0) {
      const posDelete = textArea.selectionStart - 1;
      const valueArr = textArea.value.split('');
      valueArr.splice(posDelete, 1);
      textArea.value = valueArr.join('');
      setCaretPosition(textArea, posDelete);
    }
  }
  // функционал на TAB;
  if (data[positionInArr] && data[positionInArr].code === 'Tab') {
    textArea.setRangeText('    ', textArea.selectionStart, textArea.selectionEnd, 'end');
    textArea.focus();
  }

  // функционал на DELETE;
  if (data[positionInArr] && data[positionInArr].code === 'Delete') {
    if (textArea.selectionStart !== 0) {
      const posDelete = textArea.selectionStart;
      const valueArr = textArea.value.split('');
      valueArr.splice(posDelete, 1);
      textArea.value = valueArr.join('');
      setCaretPosition(textArea, posDelete);
    }
  }
  // функционал на CAPS LOCK;
  if (data[positionInArr] && data[positionInArr].code === 'CapsLock') {
    // arrValue = arrValueFunc('shiftKey');
    document.querySelector('.keyboard').remove();
    // keyboard = renderKeyboard(arrValue);
  }
};

// Кнопка мыши нажата над элементом.

keyboard.addEventListener('mousedown', (event) => {
  print(event);
});

// Кнопка мыши отпущена над элементом.
keyboard.addEventListener('mouseup', (event) => {
  event.target.classList.remove('hover');
});

// Мышь ушла с элемента.
document.addEventListener('mouseout', (event) => {
  event.target.classList.remove('hover');
});

// нажата кнопка на клавиатуре
document.addEventListener('keydown', (event) => {
  event.preventDefault();
  print(event);
  keyboard.querySelector(`#${event.code}`).classList.add('hover');
});

// отпущена кнопка на клавиатуре
document.addEventListener('keyup', (event) => {
  keyboard.querySelector(`#${event.code}`).classList.remove('hover');
});
