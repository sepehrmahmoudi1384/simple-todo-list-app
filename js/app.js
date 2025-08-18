import TodoTask from "./TodoTask.js";

// finding elements in the page
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");

// all todo-task stored in this array
let todos = [];

// add todo-task to todo-list
addTaskBtn.addEventListener("click", (e) => {
  if (taskInput.value.trim() !== "") {
    addTaskToTodos(taskInput.value);
    cleanTaskInput();
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && taskInput.value.trim(taskInput.value) !== "") {
    addTaskToTodos();
    cleanTaskInput();
  }
});

function cleanTaskInput() {
  taskInput.value = "";
  taskInput.focus();
}

function addTaskToTodos(taskTitle) {
  todos.push(new TodoTask(taskTitle));
  refreshTaskList();
}

function removeTask(taskId) {
  todos = todos.filter((_, index) => index != taskId);
  refreshTaskList();
}

function refreshTaskList() {
  taskList.innerHTML = "";

  todos.forEach((todo, taskId) => {
    const task = createElement("li", taskList, ["class", "task-item"]);

    const title = createElement("p", task, ["class", "task-title"]);
    title.innerText = todo.taskTitle;

    const btnRemoveTask = createElement("button", task, [
      "class",
      "remove-task",
    ]);
    btnRemoveTask.innerHTML = `<i class="fa fa-times"></i>`;
    btnRemoveTask.addEventListener("click", () => {
      removeTask(taskId);
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
