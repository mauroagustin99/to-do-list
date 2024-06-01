import './style.css';
import {
  format,
  addDays,
  subDays,
  compareAsc,
  differenceInDays,
} from 'date-fns';
import printTask, {
  createProject,
  currentProject,
  initializeProjectSelection,
} from './functions/domcontroller.js';
import NewTask from './functions/newtask.js';
import {
  loadProjectsFromLocalStorage,
  loadTasksFromLocalStorage,
} from './functions/local_storage/loadLocalStorage.js';
import {
  initializeGeneralProject,
  setCurrentProject,
} from './functions/projectcontroller.js';

document.addEventListener('DOMContentLoaded', () => {
  //Load Projects from the local storage
  loadProjectsFromLocalStorage();

  // Initialize "General" project if it doesn't exist
  initializeGeneralProject();

  // Set "General" as the current project each time DOMContent is loaded
  initializeProjectSelection();

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
