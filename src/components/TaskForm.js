import React, { useState } from "react";
import { useTasks } from "../context/TaskContext";

function TaskForm() {
  const [taskName, setTaskName] = useState(" ");
  const {createTask, adding } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(adding);
    createTask(taskName)
    
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="taskName"
        placeholder="Write TaskName"
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

export default TaskForm;
