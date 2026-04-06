export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const isOverdue =
    task.dueDate && task.status === 'pending' && new Date(task.dueDate) < new Date();

  return (
    <div className={`task-card ${task.status} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`badge ${task.status}`}>{task.status}</span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      {task.dueDate && (
        <p className="task-due">
          Due: {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && <span className="overdue-label"> (Overdue)</span>}
        </p>
      )}
      <div className="task-actions">
        <button onClick={() => onToggle(task)}>
          {task.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button className="btn-delete" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
