document.addEventListener("DOMContentLoaded", function () {

  loadTasks();

  const clearBtn = document.getElementById("clearTask");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearAllTasks);
  }

});

/* ========== STORAGE FUNCTIONS ========== */

function getTasks() {
  const data = localStorage.getItem("advancedTasks");
  return data ? JSON.parse(data) : [];
}

function saveTasks(tasks) {
  localStorage.setItem("advancedTasks", JSON.stringify(tasks));
}

/* ========== MAIN FUNCTIONS ========== */

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const time = document.getElementById("taskTime").value;

  if (!title || !date || !time) {
    alert("Please enter task name, date and time.");
    return;
  }

  const tasks = getTasks();
  tasks.push({ title, date, time, completed: false });

  saveTasks(tasks);
  clearForm();
  loadTasks();
}

function loadTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  const tasks = getTasks();

  if (tasks.length === 0) {
    list.innerHTML = "<li class='empty'>No tasks added yet 🚀</li>";
    return;
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <strong>${task.title}</strong>
      <div class="task-meta">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="#DC3545" fill="currentColor" class="bi bi-calendar2-heart-fill" viewBox="0 0 16 16">
        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zm-2 4v-1c0-.276.244-.5.545-.5h10.91c.3 0 .545.224.545.5v1c0 .276-.244.5-.546.5H2.545C2.245 5 2 4.776 2 4.5m6 3.493c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
      </svg> ${task.date} ⏰ ${task.time}</div>
      <div class="task-controls">
        <button class="complete-btn" onclick="toggleComplete(${index})">
          ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function clearForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskTime").value = "";
}

/* ========== ACTION FUNCTIONS ========== */

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  loadTasks();
}

function deleteTask(index) {
  const tasks = getTasks();

  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    loadTasks();
  }
}

function editTask(index) {
  const tasks = getTasks();
  const task = tasks[index];

  const newTitle = prompt("Edit Task Name:", task.title);
  if (newTitle === null) return;

  const newDate = prompt("Edit Date (YYYY-MM-DD):", task.date);
  if (newDate === null) return;

  const newTime = prompt("Edit Time (HH:MM):", task.time);
  if (newTime === null) return;

  if (newTitle.trim() && newDate && newTime) {
    tasks[index] = {
      title: newTitle.trim(),
      date: newDate,
      time: newTime,
      completed: task.completed
    };

    saveTasks(tasks);
    loadTasks();
  }
}

function clearAllTasks() {
  if (confirm("Are you sure you want to clear all tasks?")) {
    localStorage.removeItem("advancedTasks");
    loadTasks();
  }
}
