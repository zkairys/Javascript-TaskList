
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const cardBody = document.querySelector('.card-body');
loadEvents();

function loadEvents(){
  // Add task event
  form.addEventListener('submit', addTask);
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


function addTask(e){
    checkErrors();

    if(checkErrors() === false){
        // creating li 
        const li = document.createElement("li");
        //add class to list
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        // grabbing value and creating text node
        const task = document.createTextNode(taskInput.value);
        // insert text inside li
        li.appendChild(task);
        // add link to li
        const a = document.createElement("a");
        //add cursor 
        a.style.cursor = 'pointer';
        // a add remove icon
        a.innerHTML = '<i class="fa fa-remove"></i>';
        // add a insi li  
        li.appendChild(a); 
        // insert li into ul
        taskList.appendChild(li);

        if(cardBody.classList.contains("error-active")){
            cardBody.classList.remove("error-active");
            cardBody.removeChild(document.querySelector(".alert-danger"));
        }
        

        clearInput();
    }  else {
        if(cardBody.classList.contains("error-active")){
            console.log("has class");
        } else {
            const errordiv = document.createElement("div");
            errordiv.classList = "alert alert-danger"; 
            const errorMessage = document.createTextNode("Can not add an empty task, please add a task name");
            errordiv.appendChild(errorMessage);
            cardBody.insertBefore(errordiv, form);

            cardBody.classList.add("error-active");
        }
        
    } 
       
    // prevent form from reloading on submit
    e.preventDefault();
}

