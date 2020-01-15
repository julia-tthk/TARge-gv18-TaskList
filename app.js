const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');

loadEventListeners();

function loadEventListeners(){
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);

}

function addTask(event){
    if(taskInput.value === ''){
        alert('Add a task!');
    }
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
        }
    }
}