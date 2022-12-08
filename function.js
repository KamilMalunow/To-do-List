function render() {
    let htmlString = "";

    for (const task of tasks) {
        htmlString +=
     `
        <div class="tasksGrid">
        <div class="task-done-toggle">
        <button class="toggleDoneButton">${task.done ? "&#10003" : ""}</button>
        </div>

        <span class="tasksText${task.done ? " task-done" : ""}">
        ${task.content}
        </span>

        <div class="deleteTask">
        <button class="deleteTaskButton">&#128465</button>
        </div>
        </div>
    `
    }
    document.querySelector('.tasks').innerHTML = htmlString;
    deleteTask();
    toggleTaskDone();
}


function taskPush() {
    const newTask = document.querySelector('.task-text');
    const newTaskContent = newTask.value.trim();
    if (newTaskContent === "") {
        return;
    }
    tasks.push({
        content: newTaskContent,
    });
    newTask.value = "";
    newTask.focus();
    render();
}

function deleteTask() {
    const removeButtons = document.querySelectorAll('.deleteTaskButton');
    removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
            tasks.splice(index, 1);
            render();
        });
    });
};


function toggleTaskDone() {
    const doneButton = document.querySelectorAll(".toggleDoneButton");
    doneButton.forEach((doneButton, index) => {
        doneButton.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            render()
        });
    });

}