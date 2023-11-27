import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

export default function TaskList() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return <div>

      { 
      tasks.map(task => (
        <div key={task.id}>
          <h1>{task.name}</h1>
          <p>{JSON.stringify(task.done)}</p>
        </div>
      ))
      }
    </div>
}
