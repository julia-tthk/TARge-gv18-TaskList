//select html elements and and assign their values to the variables
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addTask);
}

function addTask(event){
    console.log(taskInput.value);
    
    event.preventDefault();
}