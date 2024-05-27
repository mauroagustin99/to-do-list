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
import modifyTask from './functions/modifytask.js';

document.addEventListener('DOMContentLoaded', () => {
  //newTask button
  const newTask = document.getElementById('new-task');
  newTask.addEventListener('click', () => {
    NewTask();
  });

  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach((task) => {
      printTask(task.task, task.dueDate, task.priority, task.state);
    });
    modifyTask();
  }

  loadTasksFromLocalStorage();

  class Note {
    constructor(title, description) {
      this.title = title;
      this.description = description;
    }
  }
});
