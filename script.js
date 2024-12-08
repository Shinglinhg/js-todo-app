const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");

var deleteTaskButtons = document.querySelectorAll("#task-list button");
updateDeleteTaskButtons();

function createTaskElement(taskData) {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.id = 'delete-task';
    button.textContent = '×';
    const span = document.createElement('span');
    span.textContent = taskData.text;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = taskData.checked;
    
    checkbox.addEventListener('change', () => {
        saveTasks();
    });

    li.appendChild(button);
    li.appendChild(span);
    li.appendChild(checkbox);
    return li;
}

addTaskButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

function updateDeleteTaskButtons() {
    deleteTaskButtons = document.querySelectorAll("#task-list button");
    deleteTaskButtons.forEach((button) => {
        button.addEventListener("click", (e) => { deleteTask(e.target) });
    });
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function addTask() {
    if (taskInput.value === "") {
        return;
    }
    const taskData = {
        text: taskInput.value,
        checked: false
    };
    taskList.appendChild(createTaskElement(taskData));
    taskInput.value = "";
    saveTasks();
    updateDeleteTaskButtons();
}

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            checked: li.querySelector('input[type="checkbox"]').checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const tasks = JSON.parse(savedTasks);
        taskList.innerHTML = '';
        tasks.forEach(taskData => {
            taskList.appendChild(createTaskElement(taskData));
        });
        updateDeleteTaskButtons();
    }
}

function clearTasks() {
    taskList.innerHTML = "";
    localStorage.removeItem('tasks');
}

document.getElementById("clear-tasks").addEventListener("click", clearTasks);

document.addEventListener('DOMContentLoaded', loadTasks);