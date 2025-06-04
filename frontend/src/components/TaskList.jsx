import React from "react";
import TaskItem from "./TaskItem";

/**
 * Отображает список задач.
 * @param {object} props
 * @param {array} props.tasks
 * @param {function} props.onEdit
 * @param {function} props.onDelete
 */
export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks.length) {
    return <p>Нет задач</p>;
  }
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  );
}