let tasks = [];
let hideDoneTasks = false;
const button = document.querySelector('.js-form');

button.addEventListener("submit", (event) => {
    event.preventDefault();
    showheader();
    taskPush();
    



})