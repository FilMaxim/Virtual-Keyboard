import './style.css';
import Controller from './components/controller';
import Model from './components/model';
import View from './components/view';

// eslint-disable-next-line no-unused-vars
const app = new Controller(new Model(), new View());
