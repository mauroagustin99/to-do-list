import printTask from './domcontroller.js';

class Task {
  constructor(task, dueDate, priority, state) {
    this.task = task;
    this.dueDate = dueDate;
    this.priority = priority;
    this.state = state;
  }
}

function saveTasktoLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export default function NewTask() {
  const myTask = new Task('Cuarta nota', '2024-05-30', 'High', 'Pending');
  saveTasktoLocalStorage(myTask);
  printTask(myTask.task, myTask.dueDate, myTask.priority, myTask.state);
}
