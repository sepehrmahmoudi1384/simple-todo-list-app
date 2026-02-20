import TodoTask from "./TodoTask.js";

// finding elements in the page
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");

// initialize local storage
if (!localStorage.getItem('todos') || localStorage.getItem('todos') == '{}') {   

  localStorage.setItem('todos', '[]');  
}

const fetchTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('todos'));
};

refreshTaskList();

// add todo-task to todo-list
addTaskBtn.addEventListener("click", (e) => {
  if (taskInput.value.trim() !== "") {
    addTaskToTodos(taskInput.value);
    cleanTaskInput();
    refreshTaskList();
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && taskInput.value.trim() !== "") {
    addTaskToTodos(taskInput.value.trim());
    cleanTaskInput();
    refreshTaskList();
  }
});

function cleanTaskInput() {
  taskInput.value = "";
  taskInput.focus();
}

function addTaskToTodos(taskTitle) {
  const todos = fetchTasksFromLocalStorage();
  todos.push(new TodoTask(taskTitle));
  saveTasksInStorage(todos);
}

function saveTasksInStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeTask(taskId) {
  const todos = fetchTasksFromLocalStorage();
  const index = todos.findIndex(todo => todo.id = taskId);
  todos.splice(index, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function completeTask(taskId) {  
  const todos = fetchTasksFromLocalStorage();
  const task = todos.find(todo => todo.id == taskId);  
  task.completed = !task.completed;
  saveTasksInStorage(todos);
}

function refreshTaskList() {
  taskList.innerHTML = "";

  fetchTasksFromLocalStorage().forEach((todo) => {
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
      refreshTaskList();
    });

    const btnRemoveTask = createElement("button", actionsTask, [
      "class",
      "remove-task",
    ]);
    btnRemoveTask.innerHTML = `<i class="fa fa-times"></i>`;
    btnRemoveTask.addEventListener("click", () => {
      removeTask(todo.id);
      refreshTaskList();
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
