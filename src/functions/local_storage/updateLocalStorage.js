import { Project } from '../projects.js';
import { getTasksForProject } from '../projectcontroller.js';

export function updateTaskInLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateProjectsInLocalStorage() {
  const projects = [];
  console.log(projects);
  const projectList = document.getElementById('project-list');
  projectList.querySelectorAll('li').forEach((li) => {
    const projectName = li.textContent;
    const tasks = getTasksForProject(projectName);
    const projectsObject = new Project(projectName, tasks);
    projects.push(projectsObject);
  });
  localStorage.setItem('projects', JSON.stringify(projects));
}

export function pushTaskToCurrentProject(currentProject) {
  try {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];

    //Search current project index
    const projectIndex = projects.findIndex(
      (project) => project.name === currentProject.name
    );

    if (projectIndex !== -1) {
      // Replace current project with new task added
      projects[projectIndex] = currentProject;

      localStorage.setItem('projects', JSON.stringify(projects));
    } else {
      console.error(
        'El proyecto no se encontró en localStorage:',
        currentProject.name
      );
    }
  } catch (e) {
    console.error('Error actualizando el proyecto en localStorage:', e);
  }
}
