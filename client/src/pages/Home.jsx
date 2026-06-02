import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Filters from "../components/Filters";
import { useState } from "react";

function Home() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Task Manager
      </h1>

      <TaskForm addTask={addTask} />
      <Filters />

      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default Home;