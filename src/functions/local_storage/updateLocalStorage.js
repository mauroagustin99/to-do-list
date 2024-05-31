import { Project } from '../projects.js';
export function updateTaskInLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateProjectsInLocalStorage(projectList) {
  const projects = [];
  projectList.querySelectorAll('li').forEach((li) => {
    const projectsObject = new Project(li.textContent, []);
    projects.push(projectsObject);
  });
  localStorage.setItem('projects', JSON.stringify(projects));
}
