import printTask from './domcontroller.js';
import { overlay } from './domcontroller.js';
//import { taskDialogContent } from './domcontroller.js';
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
  const prueba = new Task('hola', Date(), 'High', 'pending');
  overlay()
    .then((formData) => {
      const myTask = new Task(
        formData.taskName,
        formData.dueDate,
        formData.priority
      );
      saveTasktoLocalStorage(myTask);
      printTask(myTask.task, myTask.dueDate, myTask.priority, myTask.state);
    })
    .catch((error) => {
      console.error(error);
    });
}
