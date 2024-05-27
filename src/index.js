import './style.css';
import {
  format,
  addDays,
  subDays,
  compareAsc,
  differenceInDays,
} from 'date-fns';
import printTask from './functions/domcontroller.js';
import NewTask from './functions/newtask.js';
import { loadTasksFromLocalStorage } from './functions/loadLocalStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  //newTask button
  const newTask = document.getElementById('new-task');
  newTask.addEventListener('click', () => {
    NewTask();
  });

  loadTasksFromLocalStorage();

  class Note {
    constructor(title, description) {
      this.title = title;
      this.description = description;
    }
  }
});
