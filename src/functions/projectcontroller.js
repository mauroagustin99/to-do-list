import { Project } from './projects.js';
import { loadProjectsFromLocalStorage } from './local_storage/loadLocalStorage.js';

let currentProjectName = null;
let projects = [];
projects = loadProjectsFromLocalStorage();

export function setCurrentProject(name) {
  currentProjectName = name;
  console.log(currentProjectName);
}

export function getCurrentProject() {
  return projects.find((project) => project.name === currentProjectName);
}

export function getTasksForProject(projectName) {
  const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  const project = storedProjects.find((proj) => proj.name === projectName);
  return project ? project.tasks : [];
}

export function initializeGeneralProject() {
  const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
  const generalProject = storedProjects.find(
    (project) => project.name === 'General'
  );

  if (!generalProject) {
    const newGeneralProject = new Project('General');
    storedProjects.push(newGeneralProject);
    localStorage.setItem('projects', JSON.stringify(storedProjects));
    projects = storedProjects;
  }
}
