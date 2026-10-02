const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList")
// const delTaskBtn = document.querySelector("#deleteBtn");


function addTask(){
    const task = taskInput.value.trim();

    if (task === ""){
        return;
    }

    const li = document.createElement('li');
    // li.textContent = task;
    const label = document.createElement('label');
    label.className = 'task-row';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    const customCheck = document.createElement('span');
    customCheck.className = 'custom-check';
    const taskTitle = document.createElement('span');
    taskTitle.className = 'task-title';
    taskTitle.textContent = task;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.classList.add("delete.btn");
    deleteBtn.id ='deleteBtn';


    label.appendChild(checkbox);
    label.appendChild(customCheck);
    label.appendChild(taskTitle);
    label.appendChild(deleteBtn);    
    li.appendChild(label);
    taskList.appendChild(li);


    // Delete task
    deleteBtn.addEventListener("click", function () {

        li.remove();

    });

    // for clearing the input thing after task is added
    taskInput.value = "";

    

};
addTaskBtn.addEventListener("click", addTask);
// funciton for enter key to work and can add tasks on entering it 
taskInput.addEventListener("keydown", function (event){
    if (event.key === "Enter"){
        addTask();
    }
})