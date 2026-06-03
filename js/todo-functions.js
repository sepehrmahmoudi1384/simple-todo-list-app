// todo-functions.js

import {TodoTask} from "./todo-task.js";

export function addTodo(taskTitle) {
    const todos = fetchTasksFromLocalStorage();
    todos.push(new TodoTask(taskTitle));
    syncTodoList(todos);
}

export function fetchTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos'));
}

function syncTodoList(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function removeTodo(taskId) {
    const todos = fetchTasksFromLocalStorage();
    const index = todos.findIndex(todo => todo.id === taskId);

    if (index !== -1) {
        todos.splice(index, 1);
    }

    syncTodoList(todos);
}

export function toggleCompleteTodo(taskId) {
  const todos = fetchTasksFromLocalStorage();
  const task = todos.find(todo => todo.id === taskId);

  if (!task) return;
  task.completed = !task.completed;

  syncTodoList(todos);
}