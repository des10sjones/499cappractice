// src/components/AbetCoordinatorDashboard/AbetCoordinatorDashboard.js
import React, { useState } from 'react';
import './AbetCoordinatorDashboard.css';

function AbetCoordinatorDashboard() {
  const [semesters, setSemesters] = useState([]);
  const [courses, setCourses] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [templates, setTemplates] = useState([]);

  // Semester management functions
  const createSemester = (semesterName) => {
    if (semesterName) {
      setSemesters([...semesters, { name: semesterName, courses: [] }]);
    }
  };

  // Notification function
  const sendNotification = (message, faculty) => {
    setNotifications([...notifications, { message, faculty }]);
  };

  // Course assignment function
  const assignCourseToFaculty = (courseName, faculty) => {
    setCourses([...courses, { courseName, faculty }]);
  };

  // Template upload function
  const uploadTemplate = (templateTitle, templateType) => {
    setTemplates([...templates, { title: templateTitle, type: templateType }]);
  };

  // Submission review function
  const reviewSubmission = (submissionIndex, newStatus) => {
    const updatedSubmissions = [...submissions];
    updatedSubmissions[submissionIndex].status = newStatus;
    setSubmissions(updatedSubmissions);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>ABET Coordinator Portal</h2>
        <button className="logout-button">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Row 1: Dashboard Analytics and Notifications */}
        <div className="grid-row">
          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-chart-line"></i> Dashboard Analytics
            </h3>
            <p>Total Submissions: {submissions.length}</p>
            <p>Unreviewed: {submissions.filter(s => s.status === 'Unreviewed').length}</p>
            <p>Approved: {submissions.filter(s => s.status === 'Approved').length}</p>
            <p>Needs Revision: {submissions.filter(s => s.status === 'Needs Revision').length}</p>
          </section>

          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-bell"></i> Notifications
            </h3>
            <input
              type="text"
              placeholder="Notification message"
              className="notification-input"
            />
            <button onClick={() => sendNotification("Please submit your materials by the deadline.", "Faculty")} className="send-notification-button">
              Send Notification
            </button>
            <ul>
              {notifications.map((note, index) => (
                <li key={index} className="notification-item">
                  {note.message} - {note.faculty}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Row 2: Course Assignment and Material Collection Decision */}
        <div className="grid-row">
          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-chalkboard-teacher"></i> Course Assignment
            </h3>
            <input type="text" placeholder="Course name (e.g., CS 101)" className="course-input" />
            <input type="text" placeholder="Faculty name" className="faculty-input" />
            <button onClick={() => assignCourseToFaculty("CS 101", "Dr. Smith")} className="assign-course-button">
              Assign Course
            </button>
            <ul>
              {courses.map((course, index) => (
                <li key={index} className="course-item">
                  {course.courseName} - {course.faculty}
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-clipboard-list"></i> Material Collection Decision
            </h3>
            <select className="material-selection">
              <option value="courseMaterials">Course Materials</option>
              <option value="courseAssessments">Course Assessments</option>
              <option value="clusterAssessments">Cluster Assessments</option>
            </select>
          </section>
        </div>

        {/* Row 3: Template Upload and Submission Review */}
        <div className="grid-row">
          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-upload"></i> Template Upload
            </h3>
            <input type="text" placeholder="Template title" className="template-title-input" />
            <select className="template-type-select">
              <option value="courseAssessment">Course Assessment</option>
              <option value="clusterAssessment">Cluster Assessment</option>
            </select>
            <button onClick={() => uploadTemplate("Course Assessment Plan", "courseAssessment")} className="upload-template-button">
              Upload Template
            </button>
            <ul>
              {templates.map((template, index) => (
                <li key={index} className="template-item">
                  {template.title} - {template.type}
                </li>
              ))}
            </ul>
          </section>

          <section className="section">
            <h3 className="section-title">
              <i className="icon fas fa-file-alt"></i> Submission Review
            </h3>
            <ul>
              {submissions.map((submission, index) => (
                <li key={index} className="submission-item">
                  <p><strong>{submission.material.title}</strong></p>
                  <p>Status: {submission.status}</p>
                  <button onClick={() => reviewSubmission(index, 'Approved')} className="approve-button">Approve</button>
                  <button onClick={() => reviewSubmission(index, 'Needs Revision')} className="revise-button">Needs Revision</button>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Row 4: Semester Management */}
        <section className="section full-width">
          <h3 className="section-title">
            <i className="icon fas fa-calendar-alt"></i> Semester Management
          </h3>
          <input
            type="text"
            placeholder="Enter semester name (e.g., Fall 2024)"
            onKeyDown={(e) => e.key === 'Enter' && createSemester(e.target.value)}
            className="semester-input"
          />
          <button onClick={() => createSemester("Fall 2024")} className="add-semester-button">
            Add Semester
          </button>
          <ul>
            {semesters.map((semester, index) => (
              <li key={index} className="semester-item">
                {semester.name}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AbetCoordinatorDashboard;
