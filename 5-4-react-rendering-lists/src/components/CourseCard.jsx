import { useState } from "react";
import TaskItem from "./TaskItem";
import DueBadge from "./DueBadge";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  function toggleTask(id) {
    onMutateCourse(index, tasks => tasks.map(t => t.id === id ? {...t, isDone: !t.isDone} : t));
  }

  function deleteTask(id) {
    onMutateCourse(index, tasks => tasks.filter(t => t.id !== id)); 
  }

  function addTask(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title: title,
      dueDate: date,
      isDone: false
    };
    onMutateCourse(index, tasks => [...tasks, newTask]);
    setTitle("");
    setDate("");
  }

  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {course.tasks.length === 0 && <p>All caught up</p>}
 
      </header>

    
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
      <ul className="tasks"> 
        { course.tasks.length === 0 ? <p>No tasks yet. Add your first one below.</p> :
          course.tasks.map((task, idx) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}</ul>
    </article>
  );
}
