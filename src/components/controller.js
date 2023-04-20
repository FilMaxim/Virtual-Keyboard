export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onTodoListChanged(this.model.arrdata, this.model.data);
    this.view.clickMousedown(this.model.printAlphanumeric, this.handleChange);
  }

  onTodoListChanged = (arrValues, datakey) => {
    this.view.displayKey(arrValues, datakey);
  };

  handleChange = () => {
    this.model.changeKeyboard(this.view.displayKey.bind(this.view));
  };
}
