import { useContext,useCallback } from "react";
import { client } from "../supabase/client";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/TaskList";

export default function Home() {
  
  const handleOnLogout = useCallback(async () => {
    const { error } = await client.auth.signOut();
  }, []);

  return (
    <div>
      <div>Home </div>
      <button onClick={handleOnLogout}>logout</button>
      <TaskForm/>
      <TaskList/>


    </div>
  );
}
