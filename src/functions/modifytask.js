import { updateTaskInLocalStorage } from './local_storage/updateLocalStorage.js';

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
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].state = taskState.checked; // Use checked option
      updateTaskInLocalStorage(tasks);
    });

    taskName.addEventListener('input', () => {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].task = taskName.textContent; // Use written value
      updateTaskInLocalStorage(tasks);
    });

    taskDate.addEventListener('input', () => {
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].dueDate = taskDate.value; // Use value chosen on calendary
      updateTaskInLocalStorage(tasks);
    });

    taskPriority.addEventListener('change', () => {
      // Cambiado a change event
      let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks[index].priority = taskPriority.value; // Use value chosen on the select
      updateTaskInLocalStorage(tasks);
    });
  });
}
