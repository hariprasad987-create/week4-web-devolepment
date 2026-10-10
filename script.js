const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");

const filterAll = document.getElementById("filterAll");
const filterPending = document.getElementById("filterPending");
const filterCompleted = document.getElementById("filterCompleted");

let tasks = [];
let currentFilter = "all"; // default filter

function updateCounter() {
  const pending = tasks.filter(task => !task.completed).length;
  taskCounter.textContent = `Pending tasks: ${pending}`;
}

function renderTasks() {
  taskList.innerHTML = "";
  let filteredTasks = tasks;

  if (currentFilter === "pending") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    
    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
  updateCounter();
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return; // prevent empty tasks
  tasks.push({ text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem("tasks");
  if (stored) tasks = JSON.parse(stored);
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);

filterAll.addEventListener("click", () => {
  currentFilter = "all";
  renderTasks();
});

filterPending.addEventListener("click", () => {
  currentFilter = "pending";
  renderTasks();
});

filterCompleted.addEventListener("click", () => {
  currentFilter = "completed";
  renderTasks();
});

// Initial load
loadTasks();
renderTasks();
