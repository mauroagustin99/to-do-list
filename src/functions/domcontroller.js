export default function printTask(name, date, priority, state) {
  const tasksContainer = document.getElementById('tasks-container');

  const task = document.createElement('div');
  task.classList.add('task');

  const taskname = document.createElement('p');
  taskname.textContent = name;
  const taskdate = document.createElement('p');
  taskdate.textContent = date;
  const taskpriority = document.createElement('p');
  taskpriority.textContent = priority;
  const taskstate = document.createElement('p');
  taskstate.textContent = state;

  task.appendChild(taskname);
  task.appendChild(taskdate);
  task.appendChild(taskpriority);
  task.appendChild(taskstate);

  tasksContainer.appendChild(task);
}
