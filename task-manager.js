const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList")



function addTask(){
    const task = taskInput.value;
    console.log(task);
};
addTaskBtn.addEventListener("click", addTask);
