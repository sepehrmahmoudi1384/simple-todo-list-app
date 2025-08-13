const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");

let counter = -1;

addTask.addEventListener("click", function () {
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
    }
});

function removeTask(taskId) {
    const task = document.querySelector(`[data-task-id="${taskId}"]`);
    taskList.removeChild(task);
}
