export default class Model {
  constructor() {
    this.data = JSON.parse(JSON.stringify(require('../keyboard.json')));

    this.statusShift = false;
    this.statusCaps = false;
    this.statusLanguage = JSON.parse(localStorage.getItem('this.statusLanguage')) || false;
    this.arrdata = this.statusLanguage ? this.arrValueFunc('keyRu') : this.arrValueFunc('key');
  }

  commit() {
    localStorage.setItem('this.statusLanguage', JSON.stringify(this.statusLanguage));
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

  changeLanguage = (render) => {
    this.statusLanguage = !this.statusLanguage;
    this.statusShift = !this.statusShift;
    this.commit();
    return this.changeKeyboard(render);
  };

  changeCaps = (render) => {
    if (this.statusCaps) {
      this.statusCaps = !this.statusCaps;
      render(this.arrdata, this.data);
    } else {
      this.statusCaps = !this.statusCaps;
      const arrdata1 = this.arrdata.map((el) => ((el.length === 1) ? el.toUpperCase() : el));
      render(arrdata1, this.data);
    }
  };
}
