import './style.css';
import {
  format,
  addDays,
  subDays,
  compareAsc,
  differenceInDays,
} from 'date-fns';
import printTask, { createProject } from './functions/domcontroller.js';
import NewTask from './functions/newtask.js';
import {
  loadProjectsFromLocalStorage,
  loadTasksFromLocalStorage,
} from './functions/local_storage/loadLocalStorage.js';

document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage();
  loadProjectsFromLocalStorage();
  //Add project button
  const newProject = document.getElementById('add-project');
  newProject.addEventListener('click', () => {
    createProject();
  });
  //Add Task button
  const newTask = document.getElementById('new-task');
  newTask.addEventListener('click', () => {
    NewTask();
  });

  class Note {
    constructor(title, description) {
      this.title = title;
      this.description = description;
    }
  }
});
