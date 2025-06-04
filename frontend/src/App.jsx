import { useEffect, useState } from "react";
import { fetchTasks, addTask, updateTask, deleteTask } from "./api/tasks";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

/**
 * Основное приложение ToDo Manager.
 * Хранит состояние задач и обрабатывает действия пользователя.
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Загрузка задач при старте
  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  // Добавление новой задачи
  const handleAdd = async (task) => {
    const newTask = await addTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  // Начать редактирование
  const handleEditInit = (task) => setEditingTask(task);

  // Сохранить изменения задачи
  const handleEditSave = async (id, task) => {
    const updated = await updateTask(id, task);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    setEditingTask(null);
  };

  // Удаление задачи
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingTask && editingTask.id === id) setEditingTask(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h1>ToDo Manager</h1>
      <TaskForm
        key={editingTask?.id || "new"}
        initial={editingTask}
        onSave={
          editingTask
            ? (task) => handleEditSave(editingTask.id, task)
            : handleAdd
        }
        onCancel={() => setEditingTask(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={handleEditInit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
