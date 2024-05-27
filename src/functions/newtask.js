import printTask from './domcontroller.js';
import { overlay } from './domcontroller.js';
import modifyTask from './modifytask.js';
import { saveTasktoLocalStorage } from './saveToLocalStorage.js';

class Task {
  constructor(task, dueDate, priority, state) {
    this.task = task;
    this.dueDate = dueDate;
    this.priority = priority;
    this.state = state;
  }
}

export default function NewTask() {
  overlay()
    .then((formData) => {
      const myTask = new Task(
        formData.taskName,
        formData.dueDate,
        formData.priority,
        false
      );
      saveTasktoLocalStorage(myTask);
      printTask(myTask.task, myTask.dueDate, myTask.priority, myTask.state);
      modifyTask();
    })
    .catch((error) => {
      console.error(error);
    });
}
