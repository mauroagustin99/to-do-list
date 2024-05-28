import modifyTask from './modifytask.js';
import printTask from './domcontroller.js';
import { addProjectToList } from './domcontroller.js';

export function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    printTask(task.task, task.dueDate, task.priority, task.state);
  });
  modifyTask();
}

export function loadProjectsFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  projects.forEach((projectName) => addProjectToList(projectName));
}
