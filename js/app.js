import TodoTask from "./TodoTask.js";

// finding elements in the page
const taskList = document.getElementById("taskList");
const inputTaskTitle = document.getElementById("inputTaskTitle");
const btnAddTask = document.getElementById("addTask");

// initialize local storage
if (!localStorage.getItem('todos') || localStorage.getItem('todos') == '{}') {   

  localStorage.setItem('todos', '[]');  
}

const fetchTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('todos'));
};

loadTasks();

// add todo-task to todo-list
btnAddTask.addEventListener("click", (e) => {
  if (inputTaskTitle.value.trim() !== "") {
    addTaskToList(inputTaskTitle.value);
    cleanInput();
    loadTasks();
  }
});

inputTaskTitle.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && inputTaskTitle.value.trim() !== "") {
    addTaskToList(inputTaskTitle.value.trim());
    cleanInput();
    loadTasks();
  }
});

function cleanInput() {
  inputTaskTitle.value = "";
  inputTaskTitle.focus();
}

function addTaskToList(taskTitle) {
  const todos = fetchTasksFromLocalStorage();
  todos.push(new TodoTask(taskTitle));
  saveTasks(todos);
}

function saveTasks(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTask(taskId) {
  const todos = fetchTasksFromLocalStorage();
  const index = todos.findIndex(todo => todo.id === taskId);
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function completeTask(taskId) {  
  const todos = fetchTasksFromLocalStorage();
  const task = todos.find(todo => todo.id === taskId);  
  task.completed = !task.completed;
  saveTasks(todos);
}

function loadTasks() {
  taskList.innerHTML = "";

  const todos = fetchTasksFromLocalStorage();
  todos.forEach((todo) => {
    const task = createElement("li", taskList, ["class", "task-item"]);

    const title = createElement("p", task, ["class", "task-title"]);
    title.innerText = todo.taskTitle;

    const actionsTask = createElement('span', task, [
      'class',
      'actions-task'
    ]);


    const btnCompleteTask = createElement('button', actionsTask, [
      "class",
      "complete-task",
    ]);

    if (todo.completed) {
      btnCompleteTask.classList.add('task-complete');
    }

    btnCompleteTask.innerHTML = `<i class="fa fa-check-circle-o"></i>`;
    btnCompleteTask.addEventListener("click", () => {
      completeTask(todo.id);
      loadTasks();
    });

    const btnRemoveTask = createElement("button", actionsTask, [
      "class",
      "remove-task",
    ]);
    btnRemoveTask.innerHTML = `<i class="fa fa-times"></i>`;
    btnRemoveTask.addEventListener("click", () => {
      removeTask(todo.id);
      loadTasks();
    });

  });
}

function createElement(tagName, parent = document.body, ...attrs) {
  const ele = document.createElement(tagName);
  attrs.forEach((attr) => {
    ele.setAttribute(attr[0], attr[1]);
  });
  parent.appendChild(ele);
  return ele;
}
