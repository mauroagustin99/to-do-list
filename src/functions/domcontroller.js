import { saveProjecToLocalStorage } from './local_storage/saveToLocalStorage.js';
import { getCurrentProject, setCurrentProject } from './projectcontroller.js';
import modifyTask from './modifytask.js';
import {
  deleteProjectFromLocalStorage,
  deleteTaskFromProject,
} from './local_storage/deleteFromLocalStorage.js';

let modal; //Creating modal to just making it once per session

export default function printTask(name, date, priority, state, taskIndex) {
  const tasksContainer = document.getElementById('tasks-container');

  //Making task and adding it to the task container
  const task = document.createElement('div');
  task.classList.add('task');

  const taskstate = document.createElement('input'); //State
  taskstate.type = 'checkbox';
  taskstate.checked = state;

  const taskname = document.createElement('p');
  taskname.textContent = name;
  taskname.setAttribute('contenteditable', 'true');

  const taskdate = document.createElement('input');
  taskdate.type = 'date';
  taskdate.value = date;

  const taskpriority = document.createElement('select');
  taskpriority.classList.add('priority-select');
  taskpriority.innerHTML = `
  <option value="High">High</option>
  <option value="Medium">Medium</option>
  <option value="Low">Low</option>
`;
  taskpriority.value = priority;

  const taskdeletebtn = document.createElement('button');
  taskdeletebtn.classList.add('delete-task');
  taskdeletebtn.textContent = 'Delete Task';

  // Add event listener for deleting the task
  taskdeletebtn.addEventListener('click', () => {
    deleteTaskFromProject(taskIndex);
    task.remove(); // Remove the task element from the DOM
  });

  task.appendChild(taskstate);
  task.appendChild(taskname);
  task.appendChild(taskdate);
  task.appendChild(taskpriority);
  task.appendChild(taskdeletebtn);

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

      // Remove event listeners
      modal
        .querySelector('#modal-form')
        .removeEventListener('submit', submitHandler);
      closeBtn.removeEventListener('click', closeHandler);
      cancelBtn.removeEventListener('click', cancelHandler);
      window.removeEventListener('click', windowClickHandler);
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
          <input type="radio" id="low-priority" name="options" value="Low" required />
          <label for="option1">Low</label><br />
          <input type="radio" id="medium-priority" name="options" value="Medium" />
          <label for="option2">Medium</label><br />
          <input type="radio" id="high-priority" name="options" value="High" />
          <label for="option3">High</label><br />

          <button type="submit">Guardar</button>
          <button type="button" id="cancelBtn">Cancelar</button>
          </fieldset>
        </form>
  `;

  document.body.appendChild(modal); // Append modal to the body

  return modal;
}

export function createProject() {
  const projectList = document.getElementById('project-list');
  const newProject = document.createElement('input');
  newProject.type = 'text';
  newProject.placeholder = 'Project Name';

  const newLi = document.createElement('li');
  newLi.appendChild(newProject);
  projectList.appendChild(newLi);
  // Focus the input so the user can start typing immediately
  newProject.focus();

  // Add event listeners for when the user finishes typing
  newProject.addEventListener('blur', () => {
    saveProjecToLocalStorage(newProject, newLi, projectList);
    selectProject(newLi); //Select new project as current
  });

  newProject.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      saveProjecToLocalStorage(newProject, newLi, projectList);
      selectProject(newLi);
    }
  });
}

export function addProjectToList(project) {
  const projectList = document.getElementById('project-list');
  const listItem = document.createElement('li');

  listItem.textContent = project.getProjectName();
  projectList.appendChild(listItem);
}

export function clearProjectList() {
  const projectList = document.getElementById('project-list');
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }
}

function clearTaskList() {
  const taskList = document.getElementById('tasks-container');
  taskList.innerHTML = '';
}

function selectProject(li) {
  const projectList = document.getElementById('project-list');

  // Clear task container before loading current project tasks
  clearTaskList();

  // Remove current-project css class and delete button in all projects
  projectList.querySelectorAll('li').forEach((item) => {
    item.classList.remove('current-project');
    const deleteButton = item.querySelector('.delete-button');
    if (deleteButton) {
      item.removeChild(deleteButton);
    }
  });

  // Add current-project css class to the current project
  li.classList.add('current-project');

  // Set clicked project to current project
  const projectName = li.textContent.trim();
  setCurrentProject(projectName);

  // Show current project tasks
  const currentProject = getCurrentProject();
  if (currentProject) {
    currentProject.tasks.forEach((task, index) => {
      printTask(task.task, task.dueDate, task.priority, task.state, index);
    });
    modifyTask();
  }

  // Add delete button if project is not 'General'
  if (projectName !== 'General') {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    li.appendChild(deleteButton);

    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent triggering the click event on the li element
      projectList.removeChild(li);
      deleteProjectFromLocalStorage(projectName);
    });
  }
}

export function initializeProjectSelection() {
  const projectList = document.getElementById('project-list');

  projectList.querySelectorAll('li').forEach((li) => {
    li.addEventListener('click', () => selectProject(li));
  });

  // Automatically select the "General" project on page load
  const generalProjectLi = Array.from(projectList.querySelectorAll('li')).find(
    (li) => li.textContent.trim() === 'General'
  );

  if (generalProjectLi) {
    selectProject(generalProjectLi);
  }
}
