let tasks = [];
const button = document.querySelector('.js-form');

button.addEventListener("submit", (event) => {
    event.preventDefault();
    showheader();
    taskPush();
    render();
    
})