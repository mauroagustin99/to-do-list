import { updateTaskInLocalStorage } from './updateLocalStorage.js';

export default function modifyTask() {
  const tasksContainer = document.getElementById('tasks-container');
  const tasks = tasksContainer.querySelectorAll('.task');

  tasks.forEach((taskDiv, index) => {
    const taskState = taskDiv.querySelector('input[type="checkbox"]');
    const taskName = taskDiv.querySelector('p:nth-child(2)');
    const taskDate = taskDiv.querySelector('p:nth-child(3)');
    const taskPriority = taskDiv.querySelector('p:nth-child(4)');

    taskState.addEventListener('change', () => {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].state = taskState.checked;
      updateTaskInLocalStorage(tasks);
    });

    taskName.addEventListener('input', () => {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].task = taskName.textContent;
      updateTaskInLocalStorage(tasks);
    });

    taskDate.addEventListener('input', () => {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].dueDate = taskDate.textContent;
      updateTaskInLocalStorage(tasks);
    });

    taskPriority.addEventListener('input', () => {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].priority = taskPriority.textContent;
      updateTaskInLocalStorage(tasks);
    });
  });
}
