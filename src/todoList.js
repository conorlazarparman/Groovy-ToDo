import React, { useState } from 'react';
import './App.css';

function TodoList() {
  // tasks: array of [title, notes, due]
  const [tasks, setTasks] = useState([]);

  // add‐form state
  const [addTitle, setAddTitle] = useState('');
  const [addNotes, setAddNotes]   = useState('');
  const [addDue, setAddDue]       = useState('');

  // edit‐form state
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editDue, setEditDue]     = useState('');

  // Add a new task (no guard—empty is allowed)
  const handleAdd = () => {
    setTasks([...tasks, [addTitle, addNotes, addDue]]);
    setAddTitle(''); setAddNotes(''); setAddDue('');
  };

  // Click “Edit” on task i: toggle open/close
  const handleEditClick = (i) => {
    if (editingIndex === i) {
      setEditingIndex(null);
    } else {
      const [t, n, d] = tasks[i];
      setEditTitle(t);
      setEditNotes(n);
      setEditDue(d);
      setEditingIndex(i);
    }
  };

  // Confirm edit on task i
  const handleConfirmEdit = (i) => {
    const newTasks = [...tasks];
    newTasks[i] = [editTitle, editNotes, editDue];
    setTasks(newTasks);
    setEditingIndex(null);
  };

  // Remove task i
  const handleRemove = (i) => {
    const newTasks = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
    if (editingIndex === i) setEditingIndex(null);
  };

  return (
    <div className="todo-container">
      <h1 className="holographic-text">Todo List</h1>

      {/* ALWAYS show the add‐form */}
      <div className="add-form">
        <p>
        <input
          type="text"
          placeholder="Task Title"
          value={addTitle}
          onChange={e => setAddTitle(e.target.value)}
        />
        </p>
        <p>
        <input
          type="text"
          placeholder="Task Notes"
          value={addNotes}
          onChange={e => setAddNotes(e.target.value)}
        />
        </p>
        <p>
        <input
          type="text"
          placeholder="Task Due Date"
          value={addDue}
          onChange={e => setAddDue(e.target.value)}
        />
        </p>
        <button onClick={handleAdd}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map((task, idx) => (
          <div key={idx} className="todo-item">
            <p>Task: {task[0]}</p>
            <p>Notes: {task[1]}</p>
            <p>Due: {task[2]}</p>

            {/* stacked buttons */}
            <div><button onClick={() => handleRemove(idx)}>Remove</button></div>
            <div>
              <button onClick={() => handleEditClick(idx)}>
                {editingIndex === idx ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {/* per‐task edit form */}
            {editingIndex === idx && (
              <div className="edit-form">
                <p>
                <input
                  type="text"
                  placeholder="Task Title"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                </p>
                <p>
                <input
                  type="text"
                  placeholder="Task Notes"
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                />
                </p>
                <p>
                <input
                  type="text"
                  placeholder="Task Due Date"
                  value={editDue}
                  onChange={e => setEditDue(e.target.value)}
                />
                </p>
                <button onClick={() => handleConfirmEdit(idx)}>
                  Confirm Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
