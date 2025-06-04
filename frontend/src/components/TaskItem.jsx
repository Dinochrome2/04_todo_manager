import React from "react";

/**
 * Один элемент задачи в списке.
 * @param {object} props
 * @param {object} props.task
 * @param {function} props.onEdit
 * @param {function} props.onDelete
 */
export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <li style={{ border: "1px solid #ddd", marginBottom: 8, padding: 12, borderRadius: 8 }}>
      <strong>{task.title}</strong> ({["-", "Обычная", "Важная", "Очень важная"][task.importance]})
      <div>{task.description}</div>
      <div>
        Создана: {new Date(task.created_at).toLocaleString()}
        {task.deadline && (
          <span> | Крайний срок: {new Date(task.deadline).toLocaleString()}</span>
        )}
      </div>
      <div>
        <button onClick={onEdit}>Изменить</button>
        <button onClick={onDelete} style={{ marginLeft: 8 }}>Удалить</button>
      </div>
    </li>
  );
}