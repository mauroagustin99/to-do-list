let modal; //Creating modal to just making it once per session

export default function printTask(name, date, priority, state) {
  const tasksContainer = document.getElementById('tasks-container');

  //Making task and adding it to the task container
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

export function overlay() {
  let formData;
  //Conditional to make modal just once per session
  if (!modal) {
    modal = makeModal();
    document.body.appendChild(modal); // Append modal to the body
  }

  const closeBtn = document.querySelector('.close-btn');
  const cancelBtn = document.getElementById('cancelBtn');
  const body = document.body;

  modal.style.display = 'block'; //Display modal
  body.classList.add('modal-open'); //Should be used to change the body filter when model is open, using css

  //Trying to use a function to return the task object when the form is submitted or a console.log when the form is canceled
  return new Promise((resolve, reject) => {
    //Submit event
    const submitHandler = (event) => {
      event.preventDefault(); // Evita que se envíe el formulario

      // Obtaining form variable values
      const taskName = document.getElementById('task-name').value;
      const dueDate = document.getElementById('due-date').value;
      const priority = document.querySelector(
        'input[name="options"]:checked'
      ).value;

      formData = { taskName, dueDate, priority };

      clean();
      resolve(formData); //Made Promise with formData
    };

    //Close modal btn
    const closeHandler = (event) => {
      event.stopPropagation(); // Evita la propagación del evento

      clean();
      reject('cancelado'); // Denied promise
    };

    //Cancel btn
    const cancelHandler = (event) => {
      event.stopPropagation(); // Evita la propagación del evento

      clean();
      reject('cancelado'); // Denied promise
    };

    //Click outside the modal
    const windowClickHandler = (event) => {
      if (event.target === modal) {
        clean();
        reject('cancelado'); // Denied promise
      }
    };

    //Function to hide and clean the form after closing a modal
    const clean = () => {
      //Hidding modal
      modal.style.display = 'none';
      body.classList.remove('modal-open');

      //Cleaning modal
      document.getElementById('task-name').value = '';
      document.getElementById('due-date').value = '';
      const options = document.querySelectorAll('input[name="options"]');
      options.forEach((option) => {
        option.checked = false; // Desmarca todas las opciones
      });
    };

    // Register event listeners
    document
      .getElementById('modal-form')
      .addEventListener('submit', submitHandler);
    closeBtn.addEventListener('click', closeHandler);
    cancelBtn.addEventListener('click', cancelHandler);
    window.addEventListener('click', windowClickHandler);
  });
}

function makeModal() {
  //Making the modal
  const modal = document.createElement('div');

  modal.classList.add('modal');
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modal.appendChild(modalContent);
  modalContent.innerHTML = `
  <span class="close-btn">&times;</span>
        <form id="modal-form">
        <fieldset>
        <legend id="form-legend">Add new task:</legend>
          <label for="task-name">Task:</label>
          <input type="text" id="task-name" placeholder="Task Name" required>

          <label for="due-date">Due Date:</label>
          <input type="date" id="due-date" name="due-date" required />

          <p class="priority-p">Priority:</p>
          <input type="radio" id="low-priority" name="options" value="low" required />
          <label for="option1">Low</label><br />
          <input type="radio" id="medium-priority" name="options" value="medium" />
          <label for="option2">Medium</label><br />
          <input type="radio" id="high-priority" name="options" value="high" />
          <label for="option3">High</label><br />

          <button type="submit">Guardar</button>
          <button type="button" id="cancelBtn">Cancelar</button>
          </fieldset>
        </form>
  `;

  document.body.appendChild(modal); // Append modal to the body

  return modal;
}

if (module.hot) {
  module.hot.accept();
}
