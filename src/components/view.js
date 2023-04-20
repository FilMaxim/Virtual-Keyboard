import setCaretPosition from './positionCaret';

export default class View {
  constructor() {
    const app = document.querySelector('#root');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    this.textArea = document.createElement('textarea');
    this.textArea.classList.add('keyboard__text');
    this.textArea.focus();
    this.textArea.placeholder = 'Введите ваш текст....';
    this.textArea.autofocus = true;

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');
    this.wrapper.append(this.textArea, this.keyboard);
    app.append(this.wrapper);
  }

  displayKey(arrValues, datakey) {
    // Delete all nodes
    if (this.keyboard.firstChild) {
      console.log(this.keyboard.querySelectorAll('.keyboard--key'));
      this.keyboard.childNodes.forEach((el, index) => {
        // eslint-disable-next-line no-param-reassign
        el.textContent = arrValues[index];
      });
      // this.keyboard.removeChild(this.keyboard.firstChild);
    } else {
      arrValues.forEach((key, index) => {
        const button = document.createElement('button');
        button.classList.add(
          'keyboard--key',
          datakey[index].group,
        );
        button.id = datakey[index].code;
        button.type = 'button';
        button.textContent = key;
        this.keyboard.append(button);
      });
    }
    // Create keys
  }

  clickMousedown(handler, handlerChange) {
    let idKey;
    // Кнопка мыши нажата над элементом.
    this.keyboard.addEventListener('mousedown', (event) => {
      idKey = event.target.id;
      if (event.target.classList.contains('keyboard--key') && idKey !== 'CapsLock') {
        event.target.classList.add('hover');
      } else if (idKey === 'CapsLock') { event.target.classList.toggle('hover'); }
      // функционал на буквы и цифра по group === 'alphanumeric';
      if (event.target.classList.contains('alphanumeric')) {
        this.textArea.setRangeText(handler(idKey), this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
        this.textArea.focus();
      }
      // функционал на BACKSPACE;
      if (idKey === 'Backspace') {
        if (this.textArea.selectionStart !== 0) {
          const posDelete = this.textArea.selectionStart - 1;
          const valueArr = this.textArea.value.split('');
          valueArr.splice(posDelete, 1);
          this.textArea.value = valueArr.join('');
          setCaretPosition(this.textArea, posDelete);
        }
      }
      // функционал на TAB;
      if (idKey === 'Tab') {
        this.textArea.setRangeText('    ', this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
        this.textArea.focus();
      }
      // функционал на DELETE;
      if (idKey === 'Delete') {
        if (this.textArea.selectionStart !== 0) {
          const posDelete = this.textArea.selectionStart;
          const valueArr = this.textArea.value.split('');
          valueArr.splice(posDelete, 1);
          this.textArea.value = valueArr.join('');
          setCaretPosition(this.textArea, posDelete);
        }
      }
      // функционал на CAPS LOCK;
      if (idKey === 'CapsLock') {
        handlerChange();
      }
      // функционал на ShiftLeft or ShiftRight;
      if (idKey === 'ShiftLeft' || idKey === 'ShiftRight') {
        handlerChange();
      }
      // функционал на Enter;
      if (idKey === 'Enter') {
        this.textArea.setRangeText('\n', this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
        this.textArea.focus();
      }
    });
    // Кнопка мыши отпущена над элементом.
    this.keyboard.addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('keyboard--key') && idKey !== 'CapsLock') {
        event.target.classList.remove('hover');
      }
      // функционал на ShiftLeft or ShiftRight;
      if (idKey === 'ShiftLeft' || idKey === 'ShiftRight') {
        handlerChange();
      }
    });
    // Мышь ушла с элемента.
    this.keyboard.addEventListener('mouseout', (event) => {
      if (event.target.classList.contains('keyboard--key') && idKey !== 'CapsLock') {
        event.target.classList.remove('hover');
      }
    });
  }
}
