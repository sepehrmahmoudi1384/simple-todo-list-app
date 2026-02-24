import {
  createElement,
  addTodo,
  removeTodo,
  toggleCompleteTodo, 
  fetchTasksFromLocalStorage
} from "./functions.js";


// finding elements in the page
const taskList = document.getElementById("taskList");
const inputTaskTitle = document.getElementById("inputTaskTitle");
const btnAddTask = document.getElementById("addTask");

renderTodoList();

// add todo-task to todo-list
btnAddTask.addEventListener("click", (e) => {
  if (inputTaskTitle.value.trim() !== "") {
    addTodo(inputTaskTitle.value);
    refreshTodoTitleInput();
    renderTodoList();
  }
});

inputTaskTitle.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && inputTaskTitle.value.trim() !== "") {
    addTodo(inputTaskTitle.value.trim());
    refreshTodoTitleInput();
    renderTodoList();
  }
});

function refreshTodoTitleInput() {
  inputTaskTitle.value = "";
  inputTaskTitle.focus();
}

function renderTodoList() {
  taskList.innerHTML = "";

  const todos = fetchTasksFromLocalStorage();

  todos.forEach((todo) => {

    const task = createElement(
      "li",
      taskList,
      ["class=task-item"]
    );

    const title = createElement(
      "p",
      task,
      ["class=task-title"]
    );
    title.innerText = todo.taskTitle;

    const actionsTask = createElement(
      'span',
      task,
      ['class=actions-task']
    );


    const btnCompleteTask = createElement(
      'button',
      actionsTask,
      [`class=complete-task ${todo.completed ? 'task-complete' : ''}`]
    );

    // complete task button icon
    createElement('i', btnCompleteTask, ['class=fa fa-check-circle-o']);

    btnCompleteTask.addEventListener("click", () => {
      toggleCompleteTodo(todo.id);
      renderTodoList();
    });

    const btnRemoveTask = createElement(
      "button",
      actionsTask,
      ["class=remove-task"]
    );

    // remove task button icon
    createElement('i', btnRemoveTask, ['class=fa fa-times']);

    btnRemoveTask.addEventListener("click", () => {
      removeTodo(todo.id);
      renderTodoList();
    });

  });
}
