import './style.css';
import {
  format,
  addDays,
  subDays,
  compareAsc,
  differenceInDays,
} from 'date-fns';

const fechaActual = new Date();
console.log('Fecha actual:', fechaActual);

// Formatear la fecha actual
const fechaFormateada = format(fechaActual, 'yyyy-MM-dd');
console.log('Fecha formateada:', fechaFormateada);

class ToDo {
  constructor(task, dueDate, priority, state) {
    this.task = task;
    this.dueDate = dueDate;
    this.priority = priority;
    this.state = state;
  }
}

class Note {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
}
