import { useState, useEffect } from 'react';

const empty = { title: '', description: '', status: 'pending', dueDate: '' };

export default function TaskForm({ onSubmit, editTask, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description || '',
        status: editTask.status,
        dueDate: editTask.dueDate ? editTask.dueDate.slice(0, 10) : '',
      });
    } else {
      setForm(empty);
    }
  }, [editTask]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(empty);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Task title" value={form.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description (optional)" value={form.description} onChange={handleChange} rows={2} />
      <div className="form-row">
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
        {editTask && <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
