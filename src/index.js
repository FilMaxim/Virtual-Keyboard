import './style.css';
import Controller from './components/controller';
import Model from './components/model';
import View from './components/view';

const app = new Controller(new Model(), new View());
