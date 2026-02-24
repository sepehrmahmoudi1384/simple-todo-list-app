import { TodoTask } from "./TodoTask.js";


export function createElement(tagName, parentElement, attrs) {
  const element = document.createElement(tagName);
  attrs.forEach((attr) => {
    const [property, value] = attr.split('=');
    element.setAttribute(property, value);
  });
  parentElement.appendChild(element);
  return element;
}

export function removeTodo(taskId) {
  const todos = fetchTasksFromLocalStorage();
  const index = todos.findIndex(todo => todo.id === taskId);
  todos.splice(index, 1);
  syncTodoList(todos);
}

export function toggleCompleteTodo(taskId) {
  const todos = fetchTasksFromLocalStorage();
  const task = todos.find(todo => todo.id === taskId);
  task.completed = !task.completed;
  syncTodoList(todos);
}

export function addTodo(taskTitle) {
  const todos = fetchTasksFromLocalStorage();
  todos.push(new TodoTask(taskTitle));
  syncTodoList(todos);
}

export function fetchTasksFromLocalStorage(){
  return JSON.parse(localStorage.getItem('todos') || []);
}

function syncTodoList(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}