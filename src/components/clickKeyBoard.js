import data from './data';
import textArea from './pageDom';

const clickKeyboard = (event) => {
  let positionInArr;
  if (event.code) {
    positionInArr = data.findIndex((el) => el.code === event.code);
  } else {
    positionInArr = data.findIndex((el) => el.code === event.target.id);
  }

  // функционал на буквы и цифра по group === 'alphanumeric';
  if (data[positionInArr] && data[positionInArr].group === 'alphanumeric') {
    textArea.setRangeText(arrValue[positionInArr], textArea.selectionStart, textArea.selectionEnd, 'end');
    textArea.focus();
  }
  console.log(positionInArr);
};

export default clickKeyboard;
