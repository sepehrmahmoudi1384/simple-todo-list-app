const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");

let counter = -1;

addTask.addEventListener("click", createTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

function createTask() {
    if (taskInput.value.trim() !== "") {
        counter++;
        taskList.innerHTML += `
            <article class="flex-task-item" data-task-id="${counter}">
                <p class="task-title">${taskInput.value}</p>
                <button class="remove-task" onclick="removeTask(${counter})">
                    <i class="fa fa-times"></i>
                </button>
            </article>
        `;
        taskInput.value = "";
        taskInput.focus();
    }
}

function removeTask(taskId) {
    const task = document.querySelector(`[data-task-id="${taskId}"]`);
    taskList.removeChild(task);
}
