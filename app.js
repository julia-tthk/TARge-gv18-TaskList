const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners(){
    //get tasks from local storage on load
    document.addEventListener('DOMContentLoaded', getTasks);
    //add a task to the UI and local storage
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    filter.addEventListener('keyup', filterTasks);
    clearBtn.addEventListener('click', clearTasks);
}

function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        //for each task from tasks array - create an li element
        const li = document.createElement('li');
        //add class name to the li element
        li.className = 'collection-item';
        //create a text-node and append it to the li
        li.appendChild(document.createTextNode(task));
        //create an anchor tag 
        const removeLink = document.createElement('a');
        //ad a class name to the removeLink element
        removeLink.className = 'delete-item secondary-content';
        removeLink.innerHTML = 'X';
        li.appendChild(removeLink);

        //add li element to the ul collection
        taskList.appendChild(li);
    });



}

function addTask(event){
    if(taskInput.value === ''){
        alert('Add a task!');
    } else {
        //create an li element
    const li = document.createElement('li');
    //assign a class name to the html element
    li.className = 'collection-item';
    //add text content to the li element
    li.appendChild(document.createTextNode(taskInput.value));
    //create an anchor tag 
    const removeLink = document.createElement('a');
    //ad a class name to the removeLink element
    removeLink.className = 'delete-item secondary-content';
    removeLink.innerHTML = 'X';
    li.appendChild(removeLink);

    //add li element to the ul collection
    taskList.appendChild(li);
    
    //store the task in local storage
    storeInLocalStorage(taskInput.value);

    taskInput.value = '';
    }
    
    event.preventDefault();
}

function storeInLocalStorage(task){
    //declare an array to read from local storage
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //add the user's task to the tasks array
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function removeTask(event){
    //check if the area clicked contains a .delete-item element

    if(event.target.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete the task?')){
            //remove the entire li element
            event.target.parentElement.remove();

            //Remove from local storage
            removeFromLocalStorage(event.target.parentElement);
        }
    }
}

function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks =  [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index) {
        if(taskItem.textContent.slice(0, -1) === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(event){
    const text = event.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(task => {
        const taskValue = task.firstChild.textContent;
        if(taskValue.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

function clearTasks(){
    //removing elements with while loop and removeChild
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}