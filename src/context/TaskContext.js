import { createContext, useContext, useState } from "react";
import { client } from "../supabase/client";
export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTask must be used within a TaskContextProvider");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async (done = false) => {
    const user = client.auth.getUser();
    const { error, data } = await client
      .from("tasks")
      .select()
      .eq("userId", (await user).data.user.id)
      .eq("done", done)
      .order("id", { ascending: true });
    //console.log(result);
    if (error) throw error;

    setTasks(data);
  };

  const createTask = async (taskName) => {
    try {
      const user = await client.auth.getUser();
      const {error, data } = await client.from("tasks").insert({
        name: taskName,
        userId: await user.data.user.id,
      });
      

      if (error) throw error;

      setTasks([...tasks, ...data])
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};
