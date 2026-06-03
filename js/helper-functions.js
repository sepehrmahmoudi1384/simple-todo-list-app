import { TodoTask } from "./todo-task.js";


export function createElement(tagName, parentElement, attrs) {
  const element = document.createElement(tagName);
  attrs.forEach((attr) => {
    const [property, value] = attr.split('=');
    element.setAttribute(property, value);
  });
  parentElement.appendChild(element);
  return element;
}

