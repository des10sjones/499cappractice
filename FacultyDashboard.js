// src/components/FacultyDashboard/FacultyDashboard.js
import React, { useState } from 'react';
import './FacultyDashboard.css';

function FacultyDashboard() {
  const [files, setFiles] = useState([]);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Upload Course Materials', course: 'CS 101', dueDate: 'Due in 3 days' },
    { id: 2, text: 'Submit Assessment Plan', course: 'CS 202', dueDate: 'Due in 5 days' }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const addTask = () => {
    if (newTaskText && newCourse && newDueDate) {
      const newTask = {
        id: Date.now(),
        text: newTaskText,
        course: newCourse,
        dueDate: newDueDate,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setNewCourse('');
      setNewDueDate('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskEdit = (taskId, updatedText, updatedCourse, updatedDueDate) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, text: updatedText, course: updatedCourse, dueDate: updatedDueDate }
        : task
    ));
  };

  const handleFileChange = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles([...files, ...event.dataTransfer.files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Faculty Portal</h2>
        <button className="logout-button">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Row 1: To-Do List and Notifications */}
        <div className="grid-row">
          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-tasks"></i> To-Do List
            </h3>
            <div className="task-inputs">
              <input
                type="text"
                placeholder="Task description"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
              />
              <input
                type="text"
                placeholder="Course (e.g., CS 101)"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
              />
              <input
                type="text"
                placeholder="Due date (e.g., Due in 3 days)"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
              />
              <button onClick={addTask} className="add-task-button">Add Task</button>
            </div>
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={deleteTask}
                onEdit={handleTaskEdit}
              />
            ))}
          </section>

          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-bell"></i> Notifications
            </h3>
            <div className="card">
              <p><strong>New Assessment Plan Required</strong></p>
              <p>2 hours ago</p>
            </div>
            <div className="card">
              <p><strong>Course Materials Due Soon</strong></p>
              <p>1 day ago</p>
            </div>
          </section>
        </div>

        {/* Row 2: Course Materials and Upload Materials */}
        <div className="grid-row">
          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-book"></i> Course Materials
            </h3>
            <div className="card">
              <p><strong>CS 101</strong></p>
              <p>• Course Materials<br />• Assessments<br />• Syllabus</p>
              <a href="#" className="view-details">View Details</a>
            </div>
            <div className="card">
              <p><strong>CS 202</strong></p>
              <p>• Course Materials<br />• Assessments<br />• Syllabus</p>
              <a href="#" className="view-details">View Details</a>
            </div>
          </section>

          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-upload"></i> Upload Materials
            </h3>
            <div
              className="upload-area"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <i className="upload-icon fas fa-cloud-upload-alt"></i>
              <p>Drag and drop files here, or click to select files</p>
              <input
                type="file"
                multiple
                className="file-input"
                onChange={handleFileChange}
              />
              <button className="select-files-button">Select Files</button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// TaskCard Component for editing and deleting tasks
function TaskCard({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(task.text);
  const [updatedCourse, setUpdatedCourse] = useState(task.course);
  const [updatedDueDate, setUpdatedDueDate] = useState(task.dueDate);

  const handleSave = () => {
    onEdit(task.id, updatedText, updatedCourse, updatedDueDate);
    setIsEditing(false);
  };

  return (
    <div className="card">
      {isEditing ? (
        <>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            placeholder="Edit task description"
          />
          <input
            type="text"
            value={updatedCourse}
            onChange={(e) => setUpdatedCourse(e.target.value)}
            placeholder="Edit course"
          />
          <input
            type="text"
            value={updatedDueDate}
            onChange={(e) => setUpdatedDueDate(e.target.value)}
            placeholder="Edit due date"
          />
          <button onClick={handleSave} className="save-task-button">Save</button>
        </>
      ) : (
        <>
          <p><strong>{task.text}</strong></p>
          <p>{task.course} - {task.dueDate}</p>
          <button onClick={() => setIsEditing(true)} className="edit-task-button">Edit</button>
          <button onClick={() => onDelete(task.id)} className="delete-task-button">Delete</button>
        </>
      )}
    </div>
  );
}

export default FacultyDashboard;
