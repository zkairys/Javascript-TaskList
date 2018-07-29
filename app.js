const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const cardBody = document.querySelector('.card-body');


loadEvents();

function loadEvents(){
  document.addEventListener('DOMContentLoaded', loadTasks);  
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', deleteTask);
  clearBtn.addEventListener('click', deleteAllTasks);
  filter.addEventListener('keyup', filterTasks);
}

function loadTasks(){
    let tasks;
    if(localStorage.getItem('tasks') !== null){
      tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
      tasks = [];
    }
    
    tasks.forEach(function(element, index){
        displayTasks(element);
    });    

}

function displayTasks(element){
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    const task = document.createTextNode(element);
    li.appendChild(task);
    const a = document.createElement("a");    
    a.style.cursor = 'pointer';      
    a.innerHTML = '<i class="fa fa-remove"></i>';      
    li.appendChild(a);       
    taskList.appendChild(li);
}



function checkErrors(){
    if(taskInput.value === ""){
        return true; 
    } else {
        return false; 
    }
}

function clearInput(){
    taskInput.value = "";
}



function checkDublicate(text){
    if(taskList.hasChildNodes()){
        const taskListChildren = Array.from(taskList.childNodes);
        let taskListChildrenTxt = [];

        taskListChildren.forEach(function(element, index){
            taskListChildrenTxt.push(element.textContent);       
        });  

        if(taskListChildrenTxt.indexOf(text) > -1){
            return true;
        } else {
            return false; 
        }
        
    }
}


function addTask(e){

    if(checkErrors() === true){
        displayError("error-active", "Can not add an empty task");

    } else if(checkDublicate(taskInput.value) === true){
        displayError("dublicate-active", "Dublicate Task");
    } else {
        if(document.querySelector(".alert-danger")){
            cardBody.removeChild(document.querySelector(".alert-danger"));
            
        }
        displayTasks(taskInput.value);
        saveToLocal(taskInput.value);
        clearInput();
    }
       
    e.preventDefault();
}

function displayError(nameClass, message){

    const alert = document.querySelector(".alert");
    if(alert){
        alert.classList = "alert alert-danger " + nameClass;
        alert.textContent = message;
    } else {
        const errordiv = document.createElement("div");
        errordiv.classList = "alert alert-danger " + nameClass; 
        const errorMessage = document.createTextNode(message);
        errordiv.appendChild(errorMessage);
        cardBody.insertBefore(errordiv, form);
    }
}

function deleteTask(e){

    if(e.target.classList.contains("fa-remove")){
      e.target.parentElement.parentElement.remove();

      deleteFromLocalSingle(e.target.parentElement.parentElement.textContent);
    }
}

function deleteFromLocalSingle(text){

    let tasks;
    if(localStorage.getItem('tasks') !== null){
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } else {
        tasks = [];
    }

    tasks.forEach(function(element, index){
        if(text === element){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteAllTasks(){

    if(taskList.hasChildNodes()){
        const taskListChildren = Array.from(taskList.childNodes);
        
        taskListChildren.forEach(function(element, index){
            element.remove();
        });  

        deleteFromLocalAll();
    }
}

function deleteFromLocalAll(text){
    localStorage.clear();
}

function filterTasks(e){
    if(taskList.hasChildNodes()){
        const taskListChildren = Array.from(taskList.childNodes);
        const textInsideTheInput = e.target.value.toLowerCase();
   
        taskListChildren.forEach(function(element, index){

            const elementText = element.textContent;    

            if(elementText.toLowerCase().indexOf(textInsideTheInput) > -1){
                element.style.display = 'flex';
                // bootstrap has d-flex as !important
                if(!element.classList.contains("d-flex")){
                    element.classList.add("d-flex");
                }
            } else {
                element.classList.remove("d-flex");
                element.style.display = 'none';
            }
        });
        
    } 
}

function saveToLocal(task){
    
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
      
}