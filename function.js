


function render() {
    let htmlString = "";

    for (const task of tasks) {
        htmlString +=
            `
            <li
          class="tasks__item ${hideDoneTasks && task.done ? "tasks__item--hidden" : ""} tasks"
        >
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
        </li>
    `
    }

    document.querySelector('.tasks').innerHTML = htmlString;
    
    renderButtons();
    deleteTask();
    bindButtonsEvents();
    bindtoggleTaskDone();
    console.log(bindButtonsEvents)
}

function showheader() {
    const tasksHeader = document.querySelector('.tasks_header');
    tasksHeader.style.display = "grid";
}







function addNewTask(newTaskContent) {
    tasks = [...tasks, { content: newTaskContent }];
    render();
}

function taskPush() {
    const newTask = document.querySelector('.task-text');
    const newTaskContent = newTask.value.trim();
    if (newTaskContent !== "") {
        addNewTask(newTaskContent);
    }
    newTask.value = "";
    newTask.focus();
    render();

}


function removeTask(taskIndex) {
    tasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1),
    ];
    render();
}


function deleteTask() {
    const removeButtons = document.querySelectorAll('.deleteTaskButton');
    removeButtons.forEach((removeButton, taskIndex) => {
        removeButton.addEventListener("click", () => {
            removeTask(taskIndex)
            render();
        });
    });
};

function toggleTaskDone(index) {
    tasks = [
        ...tasks.slice(0, index),
        {
            ...tasks[index],
            done: !tasks[index].done,
        },
        ...tasks.slice(index + 1),
    ];
    render();
}

function bindtoggleTaskDone() {
    const doneButton = document.querySelectorAll(".toggleDoneButton");
    doneButton.forEach((doneButton, index) => {
        doneButton.addEventListener("click", () => {
            toggleTaskDone(index);
        });
    });

}





function markAllTaskDone() {
    tasks = tasks.map((task) => ({
        ...task,
        done: true,
    }));
    render();
}

function hideShowDoneTask() {
    hideDoneTasks = !hideDoneTasks;
    render();
}

function bindButtonsEvents() {
    const hideShowDoneTaskButton = document.querySelector(".js-hideShowDoneTask");
    const toggleAllTaskDoneButton = document.querySelector(".js-toggleAllDoneTask");

    if (hideShowDoneTaskButton) {
        hideShowDoneTaskButton.addEventListener("click", hideShowDoneTask);
    };

    if (toggleAllTaskDoneButton) {
        toggleAllTaskDoneButton.addEventListener("click", markAllTaskDone);
    };
};




function renderButtons() {
    let buttonsHTMLContent = "";

    if (tasks.length !== 0) {
        buttonsHTMLContent = `
        
        <button 
            class="tasks_functionButtons js-hideShowDoneTask"
            ${tasks.some(({ done }) => done) ? "" : "disabled"}>
                ${hideDoneTasks === true ? "Show" : "Hide"} done
        </button>
        <button 
            class="tasks_functionButtons js-toggleAllDoneTask"${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Mark all as done
        </button>
        
        `;
    }

    document.querySelector(".tasks_header--functionButtons").innerHTML = buttonsHTMLContent;
};