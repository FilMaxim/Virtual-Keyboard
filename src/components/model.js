export default class Model {
  constructor() {
    this.data = JSON.parse(JSON.stringify(require('../keyboard.json')));

    this.arrKeyEn = ['key', 'shiftKeyEN'];
    this.arrKeyRu = ['keyRu', 'shiftKeyRu'];

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

  change = () => {
    const arrkey = this.statusLanguage ? this.arrKeyRu : this.arrKeyEn;

    if (!this.statusShift && !this.statusCaps) this.arrdata = this.arrValueFunc(arrkey[0]);
    if (this.statusShift && !this.statusCaps) this.arrdata = this.arrValueFunc(arrkey[1]);
    if (!this.statusShift && this.statusCaps) {
      this.arrdata = this.arrValueFunc(arrkey[0]);
      this.arrdata = this.arrdata.map((el) => ((el.length === 1) ? el.toUpperCase() : el));
    }
    if (this.statusShift && this.statusCaps) {
      this.arrdata = this.arrValueFunc(arrkey[1]);
      this.arrdata = this.arrdata.map((el) => ((el.length === 1) ? el.toLowerCase() : el));
    }
  };

  changeShift = (render) => {
    this.statusShift = !this.statusShift;
    this.change();
    render(this.arrdata, this.data);
  };

  changeLanguage = (render) => {
    console.log(111);
    this.statusLanguage = !this.statusLanguage;
    this.commit();
    this.change();
    render(this.arrdata, this.data);
  };

  changeCaps = (render) => {
    this.statusCaps = !this.statusCaps;
    this.change();
    render(this.arrdata, this.data);
  };
}
