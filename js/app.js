import TodoTask from "./TodoTask.js";

// finding elements in the page
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");

// initialize local storage
if (!localStorage.getItem('todos')) {
  localStorage.setItem('todos', '[]');
}

const fetchTasksFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
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
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeByIndex(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
}

function removeTask(taskId) {
  const todos = fetchTasksFromLocalStorage();
  removeByIndex(todos, taskId);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function refreshTaskList() {
  taskList.innerHTML = "";

  fetchTasksFromLocalStorage().forEach((todo, taskId) => {
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
