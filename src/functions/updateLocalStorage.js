export function updateTaskInLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
