import { updateProjectsInLocalStorage } from './updateLocalStorage.js';

export function deleteProjectFromLocalStorage(projectName) {
  let storedProjects = JSON.parse(localStorage.getItem('projects')) || [];

  // Filtrar los proyectos y eliminar el que tiene el nombre especificado
  storedProjects = storedProjects.filter(
    (project) => project.name !== projectName
  );

  updateProjectsInLocalStorage();
}
