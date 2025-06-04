const API_URL = "http://localhost:8000/tasks/";

export async function fetchTasks() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function addTask(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${API_URL}${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_URL}${id}`, { method: "DELETE" });
}