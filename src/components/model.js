export default class Model {
  constructor() {
    this.data = JSON.parse(JSON.stringify(require('../keyboard.json')));
    this.arrdata = this.arrValueFunc('key');
    this.statusEn = ['key', 'shiftKey'];
    this.statusRu = ['ru_key', 'ru_shift'];
    this.statusShift = false;
    this.statusLanguage = false;
  }

  arrValueFunc = (status) => this.data.map((el) => {
    if (el.group === 'alphanumeric') return el[status];
    if (el.group === 'service') return el.key;
    return false;
  });

  printAlphanumeric = (id) => {
    const positionInArr = this.data.findIndex((el) => el.code === id);
    return this.arrdata[positionInArr];
  };

  changeKeyboard = (render) => {
    this.statusShift = !this.statusShift;
    if (!this.statusLanguage) {
      this.arrdata = this.statusShift ? this.arrValueFunc('shiftKeyEN') : this.arrValueFunc('key');
    } else {
      this.arrdata = this.statusShift ? this.arrValueFunc('shiftKeyRu') : this.arrValueFunc('keyRu');
    }

    render(this.arrdata, this.data);
  };
}
