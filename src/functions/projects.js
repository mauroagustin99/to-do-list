import printTask from './domcontroller.js';
import modifyTask from './modifytask.js';

export function loadProjectsFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem('projects')) || {};
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';
  if (!projects['General']) {
    projects['General'] = [];
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  Object.keys(projects).forEach((project) => {
    const projectItem = document.createElement('li');
    projectItem.textContent = project;
    projectItem.addEventListener('click', () => {
      loadTasks(project);
    });
    projectList.appendChild(projectItem);
  });
}

export function createProject(name) {
  const projects = JSON.parse(localStorage.getItem('projects')) || {};
  if (!projects[name]) {
    projects[name] = [];
    localStorage.setItem('projects', JSON.stringify(projects));
    loadProjectsFromLocalStorage();
  }
}

function loadTasks(project) {
  const projects = JSON.parse(localStorage.getItem('projects')) || {};
  const tasks = projects[project] || [];
  const tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = '';
  tasks.forEach((task) => {
    printTask(task.task, task.dueDate, task.priority, task.state);
  });
  modifyTask(project); // Pass project name to modifyTask
}
