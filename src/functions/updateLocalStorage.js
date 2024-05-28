export function updateTaskInLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function updateProjectsInLocalStorage(projectList) {
  const projects = [];
  projectList.querySelectorAll('li').forEach((li) => {
    projects.push(li.textContent);
  });
  localStorage.setItem('projects', JSON.stringify(projects));
}
