import React, { useState, useEffect } from "react";

/**
 * Форма для добавления или редактирования задачи.
 * @param {object} props
 * @param {object} [props.initial] — Если передано, форма в режиме редактирования.
 * @param {function} props.onSave — Колбэк для сохранения задачи.
 * @param {function} [props.onCancel] — Колбэк для отмены редактирования.
 */
export default function TaskForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    importance: 1,
    deadline: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title,
        description: initial.description,
        importance: initial.importance,
        deadline: initial.deadline
          ? initial.deadline.slice(0, 16)
          : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        importance: 1,
        deadline: "",
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      importance: Number(form.importance),
      deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
    });
    setForm({ title: "", description: "", importance: 1, deadline: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <input
        type="text"
        name="title"
        placeholder="Название"
        value={form.title}
        onChange={handleChange}
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={form.description}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <select
        name="importance"
        value={form.importance}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 8 }}
      >
        <option value={1}>Обычная</option>
        <option value={2}>Важная</option>
        <option value={3}>Очень важная</option>
      </select>
      <input
        type="datetime-local"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button type="submit">{initial ? "Изменить" : "Добавить"}</button>
      {initial && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
          Отмена
        </button>
      )}
    </form>
  );
}