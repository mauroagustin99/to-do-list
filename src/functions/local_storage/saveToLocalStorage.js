import {
  pushTaskToCurrentProject,
  updateProjectsInLocalStorage,
} from './updateLocalStorage.js';
import { Project } from '../projects.js';
import { getCurrentProject } from '../projectcontroller.js';

export function saveTaskToCurrentProject(task) {
  const currentProject = getCurrentProject();

  if (currentProject) {
    currentProject.tasks.push(task); //Push created task to the current proyect
    pushTaskToCurrentProject(currentProject); //Update current project to the local storage with the new task
  }
}

export function saveProjecToLocalStorage(input, listItem, projectList) {
  const projectName = input.value.trim(); //Removes whitespace from both end start
  if (projectName) {
    listItem.textContent = projectName;
    updateProjectsInLocalStorage();
  } else {
    projectList.removeChild(listItem);
    updateProjectsInLocalStorage();
  }
}
