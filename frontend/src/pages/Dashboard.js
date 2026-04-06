import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') document.body.classList.add('dark');
    return saved === 'true';
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (filterStatus) params.status = filterStatus;
      const { data } = await api.get('/tasks', { params });
      setTasks(data);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [search, filterStatus]); // eslint-disable-line

  const handleCreate = async (form) => {
    try {
      const { data } = await api.post('/tasks', form);
      setTasks([data, ...tasks]);
    } catch { setError('Failed to create task'); }
  };

  const handleUpdate = async (form) => {
    try {
      const { data } = await api.put(`/tasks/${editTask._id}`, form);
      setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
      setEditTask(null);
    } catch { setError('Failed to update task'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch { setError('Failed to delete task'); }
  };

  const handleToggle = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    try {
      const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
    } catch { setError('Failed to update task'); }
  };

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle('dark', next);
    localStorage.setItem('darkMode', next);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <nav className="navbar">
        <span className="brand">Smart Tasks</span>
        <div className="nav-right">
          <span>Hi, {user?.name}</span>
          <button onClick={toggleDark}>{darkMode ? '☀️' : '🌙'}</button>
          <button onClick={() => { document.body.classList.remove('dark'); logout(); navigate('/login'); }}>Logout</button>
        </div>
      </nav>

      <div className="dashboard">
        <TaskForm
          onSubmit={editTask ? handleUpdate : handleCreate}
          editTask={editTask}
          onCancel={() => setEditTask(null)}
        />

        <div className="filters">
          <input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="loading">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty">No tasks found. Add one above.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={setEditTask}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
