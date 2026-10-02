const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList")



function addTask(){
    const task = taskInput.value.trim();

    if (task === ""){
        return;
    }

    const li = document.createElement("li");
    li.textContent = task;
    const checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';

    taskList.appendChild(checkbox);
    taskList.appendChild(li);

};
addTaskBtn.addEventListener("click", addTask);

