const API_URL = "https://to-do-list-api-5eba.onrender.com/api/v1/tasks";

// Carregar tarefas
async function loadTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();

  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${task.id}, ${!task.completed})">${task.title}</span>
      <button class="deleteBtn" onclick="deleteTask(${task.id})">✖</button>
    `;

    list.appendChild(li);
  });
}

// Adicionar tarefa
async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  input.value = "";
  loadTasks();
}

// Marcar/desmarcar concluída
async function toggleTask(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed })
  });
  loadTasks();
}

// Apagar tarefa
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTasks();
}

// Inicializar
loadTasks();