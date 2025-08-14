const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");

let taskCounter = 0;

addTask.addEventListener("click", createTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

function createTask() {
    if (taskInput.value.trim() !== "") {
        taskCounter++;
        taskList.innerHTML += `
            <li class="task-item" data-task-id="${taskCounter}">
                <p class="task-title">${taskInput.value}</p>
                <button class="remove-task" onclick="removeTask(${taskCounter})">
                    <i class="fa fa-times"></i>
                </button>
            </li>
        `;
        taskInput.value = "";
        taskInput.focus();
    }
}

function removeTask(taskId) {
    const task = document.querySelector(`[data-task-id="${taskId}"]`);
    taskList.removeChild(task);
}
