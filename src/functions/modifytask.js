import { updateTaskInProject } from './local_storage/updateLocalStorage.js';
import { getCurrentProject } from './projectcontroller.js';

export default function modifyTask() {
  const tasksContainer = document.getElementById('tasks-container');
  const tasks = tasksContainer.querySelectorAll('.task'); // Select each task on tasksContainer

  //For each task saved on localStore --> select it, change value, update it on localStore
  tasks.forEach((taskDiv, index) => {
    const taskState = taskDiv.querySelector('input[type="checkbox"]');
    const taskName = taskDiv.querySelector('p:nth-child(2)');
    const taskDate = taskDiv.querySelector('input[type="date"]');
    const taskPriority = taskDiv.querySelector('.priority-select');

    taskState.addEventListener('change', () => {
      let projects = JSON.parse(localStorage.getItem('projects')) || [];
      const currentProject = getCurrentProject();
      if (currentProject) {
        const projectIndex = projects.findIndex(
          (project) => project.name === currentProject.name
        );
        if (projectIndex !== -1) {
          projects[projectIndex].tasks[index].state = taskState.checked;
          updateTaskInProject(
            projectIndex,
            index,
            projects[projectIndex].tasks[index]
          );
        }
      }
    });

    taskName.addEventListener('input', () => {
      let projects = JSON.parse(localStorage.getItem('projects')) || [];
      const currentProject = getCurrentProject();
      if (currentProject) {
        const projectIndex = projects.findIndex(
          (project) => project.name === currentProject.name
        );
        if (projectIndex !== -1) {
          projects[projectIndex].tasks[index].task = taskName.textContent;
          updateTaskInProject(
            projectIndex,
            index,
            projects[projectIndex].tasks[index]
          );
        }
      }
    });

    taskDate.addEventListener('input', () => {
      let projects = JSON.parse(localStorage.getItem('projects')) || [];
      const currentProject = getCurrentProject();
      if (currentProject) {
        const projectIndex = projects.findIndex(
          (project) => project.name === currentProject.name
        );
        if (projectIndex !== -1) {
          projects[projectIndex].tasks[index].dueDate = taskDate.value;
          updateTaskInProject(
            projectIndex,
            index,
            projects[projectIndex].tasks[index]
          );
        }
      }
    });

    taskPriority.addEventListener('change', () => {
      let projects = JSON.parse(localStorage.getItem('projects')) || [];
      const currentProject = getCurrentProject();
      if (currentProject) {
        const projectIndex = projects.findIndex(
          (project) => project.name === currentProject.name
        );
        if (projectIndex !== -1) {
          projects[projectIndex].tasks[index].priority = taskPriority.value;
          if (taskPriority.value === 'High') {
            taskPriority.classList.add('high-priority');
          } else if (taskPriority.value === 'Medium') {
            taskPriority.classList.add('medium-priority');
          } else if (taskPriority.value === 'Low') {
            taskPriority.classList.add('low-priority');
          }
          updateTaskInProject(
            projectIndex,
            index,
            projects[projectIndex].tasks[index]
          );
        }
      }
    });
  });
}
