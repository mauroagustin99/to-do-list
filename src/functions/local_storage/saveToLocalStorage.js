import { updateProjectsInLocalStorage } from './updateLocalStorage.js';
import { Project } from '../projects.js';

export function saveTasktoLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function saveProjecToLocalStorage(input, listItem, projectList) {
  const projectName = input.value.trim(); //Removes whitespace from both end start
  if (projectName) {
    listItem.textContent = projectName;
    updateProjectsInLocalStorage(projectList);
  } else {
    projectList.removeChild(listItem);
    updateProjectsInLocalStorage(projectList);
  }
}
