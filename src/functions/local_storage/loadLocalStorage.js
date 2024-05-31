import modifyTask from '../modifytask.js';
import printTask from '../domcontroller.js';
import { addProjectToList } from '../domcontroller.js';
import { Project } from '../projects.js';

export function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    printTask(task.task, task.dueDate, task.priority, task.state);
  });
  modifyTask();
}

export function loadProjectsFromLocalStorage() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  /*if (!projects.includes('General')) {
    projects.push('General');
    localStorage.setItem('projects', JSON.stringify(projects));
  }*/

  projects.forEach((project) => {
    const projectInstance = new Project(project.name, project.tasks);
    addProjectToList(projectInstance);
  });
}
