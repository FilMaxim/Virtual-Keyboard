import setCaretPosition from './positionCaret';

export default class View {
  constructor() {
    const body = document.querySelector('body');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper');

    this.title = document.createElement('h1');
    this.title.innerHTML = 'Виртуальная клавиатура';

    this.textArea = document.createElement('textarea');
    this.textArea.classList.add('keyboard__text');
    this.textArea.focus();
    this.textArea.placeholder = 'Введите ваш текст....';
    this.textArea.autofocus = true;

    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard');

    this.audio = document.createElement('audio');
    this.audio.id = 'alarm';
    this.source = document.createElement('source');
    this.source.src = 'images/click.mp3';
    this.audio.append(this.source);

    this.description = document.createElement('div');
    this.description.classList.add('description');
    this.description.innerHTML = `Клавиатура создана в операционной системе Windows 11.\n
    Для переключения языка комбинация: левыe ctrl + alt.`;

    this.wrapper.append(this.title, this.textArea, this.keyboard, this.audio, this.description);
    body.append(this.wrapper);

    this.statusShift = false;
    this.statusLang = 'EN';
    this.statusCTRL = false;
    this.statusALT = false;
  }

  displayKey(arrValues, datakey) {
    // Delete all nodes
    if (this.keyboard.firstChild) {
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

  keyDeleteBackspase(shift = 0) {
    const posDelete = this.textArea.selectionStart - shift;
    const valueArr = this.textArea.value.split('');
    valueArr.splice(posDelete, 1);
    this.textArea.value = valueArr.join('');
    setCaretPosition(this.textArea, posDelete);
  }

  keyTabEnter(value) {
    this.textArea.setRangeText(value, this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
    this.textArea.focus();
  }

  eventServise(idKey, handler, handlerShift, handlerCaps, handleLanguage, keyRepeat = false) {
    if (!idKey) return;
    const el = this.keyboard.querySelector(`#${idKey}`);
    if (el === null) {
      return;
    }
    if (!keyRepeat) this.audio.play();

    const elementClik = this.keyboard.querySelector(`#${idKey}`);
    if (idKey && elementClik && idKey !== 'CapsLock') {
      elementClik.classList.add('hover');
    } else if (idKey === 'CapsLock' && !keyRepeat) { this.keyboard.querySelector('#CapsLock').classList.toggle('hover'); }

    // функционал на буквы и цифра по group === 'alphanumeric';
    if (el.classList.contains('alphanumeric')) {
      this.textArea.setRangeText(handler(idKey), this.textArea.selectionStart, this.textArea.selectionEnd, 'end');
      this.textArea.focus();
    }
    // функционал на BACKSPACE;
    if (idKey === 'Backspace') {
      if (this.textArea.selectionStart !== 0) {
        this.keyDeleteBackspase(1);
      }
    }
    // функционал на DELETE;
    if (idKey === 'Delete') {
      this.keyDeleteBackspase();
    }

    // функционал на CAPS LOCK;
    if (idKey === 'CapsLock' && !keyRepeat) {
      handlerCaps();
    }

    // функционал на ShiftLeft and ShiftRight;
    if (idKey === 'ShiftLeft' || idKey === 'ShiftRight') {
      if (!this.statusShift) {
        handlerShift();
        this.statusShift = !this.statusShift;
      }
    }

    // функционал на TAB
    if (idKey === 'Tab') this.keyTabEnter('    ');

    // функционал на Enter;
    if (idKey === 'Enter') this.keyTabEnter('\n');

    // функционал на ArrowUp;
    if (idKey === 'ArrowUp') this.keyTabEnter('▲');

    // функционал на ArrowDown;
    if (idKey === 'ArrowDown') this.keyTabEnter('▼');

    // функционал на ArrowLeft;
    if (idKey === 'ArrowLeft') {
      const posDelete = this.textArea.selectionStart - 1;
      setCaretPosition(this.textArea, posDelete);
    }

    // функционал на ArrowRight;
    if (idKey === 'ArrowRight') {
      const posDelete = this.textArea.selectionStart + 1;
      setCaretPosition(this.textArea, posDelete);
    }

    // раскладка клавиатуры CTRL + ALT
    if (idKey === 'AltLeft') this.statusALT = !this.statusALT;
    if (idKey === 'ControlLeft') this.statusCTRL = !this.statusCTRL;
    if (this.statusALT && this.statusCTRL) handleLanguage();
  }

  clickMousedown(handler, handlerShift, handlerCaps, handleLanguage) {
    let idKey;

    // ----Кнопка мыши нажата над элементом-----
    this.keyboard.addEventListener('mousedown', (event) => {
      idKey = event.target.id;

      this.eventServise(idKey, handler, handlerShift, handlerCaps, handleLanguage);
    });
    // ----Кнопка мыши отпущена над элементом----
    this.keyboard.addEventListener('mouseup', (event) => {
      if (event.target.classList.contains('keyboard--key') && idKey !== 'CapsLock') {
        event.target.classList.remove('hover');
      }
      // функционал на ShiftLeft or ShiftRight;
      if (event.target.id === 'ShiftLeft' || event.target.id === 'ShiftRight') {
        if (this.statusShift) {
          handlerShift();
          this.statusShift = false;
        }
      }
      // раскладка клавиатуры CTRL + ALT
      if (idKey === 'AltLeft' || idKey === 'ControlLeft') {
        if (idKey === 'AltLeft') this.statusALT = !this.statusALT;
        if (idKey === 'ControlLeft') this.statusCTRL = !this.statusCTRL;
      }
    });
    // ----Мышь ушла с элемента----
    this.keyboard.addEventListener('mouseout', (event) => {
      if (event.target.classList.contains('keyboard--key') && idKey !== 'CapsLock') {
        event.target.classList.remove('hover');
      }
    });
    // ----Нажата кнопка на клавиатуре----
    document.addEventListener('keydown', (event) => {
      const keyRepeat = event.repeat;
      idKey = event.code;
      if (this.keyboard.querySelector(`#${idKey}`)) {
        event.preventDefault();
      }
      this.eventServise(idKey, handler, handlerShift, handlerCaps, handleLanguage, keyRepeat);
    });

    // ----Отпущена кнопка на клавиатуре----
    document.addEventListener('keyup', (event) => {
      if (idKey !== 'CapsLock' && this.keyboard.querySelector(`#${event.code}`)) {
        this.keyboard.querySelector(`#${event.code}`).classList.remove('hover');
      }
      // функционал на ShiftLeft or ShiftRight;
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        if (this.statusShift) {
          handlerShift();
          this.statusShift = false;
        }
      }
      // раскладка клавиатуры CTRL + ALT
      if (event.code === 'AltLeft') this.statusALT = !this.statusALT;
      if (event.code === 'ControlLeft') this.statusCTRL = !this.statusCTRL;
    });
  }
}
