import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          dueDate,
          priority,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("");
        fetchTasks();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggleTask = async (id, currentCompleted) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentCompleted }),
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredTasks =
    filter === "all"
      ? sortedTasks
      : filter === "completed"
      ? sortedTasks.filter((t) => t.completed)
      : sortedTasks.filter((t) => !t.completed);

  const completedCount = tasks.filter((t) => t.completed).length;
  const incompleteCount = tasks.length - completedCount;
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex flex-col">

      {/* HEADER */}
      <div className="py-8 mt-4  text-center ">
        <h1 className="text-3xl md:text-5xl leading-[1.3] pb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-pink-200">
          Task Manager
        </h1>
        <h3 className="text-white/80 text-sm mt-1">
          Organize your tasks
        </h3>
      </div>

      {/* CENTER AREA */}
      <div className="flex-1 flex items-start justify-center px-3 pt-2 pb-6 overflow-y-auto">
        <div className="w-full max-w-2xl">

          {/* FORM CARD */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-4 mb-4">

            {/* FORM */}
            <div className="space-y-3">

            <div>
              <label className="text-white text-sm">Task Title</label>
              <input
                type="text"
                placeholder="Enter task name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="text-white text-sm">Description</label>
              <textarea
                rows="2"
                placeholder="Add task details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            
            <div className="grid grid-cols-2 gap-3">

              {/* DUE DATE */}
              <div>
                <label className="text-white text-sm">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>

              {/* PRIORITY */}
              <div>
                <label className="text-white text-sm">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  defaultValue=""
                  className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  <option value="" disabled>
                    Select priority
                  </option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

            </div>

            <button
              onClick={handleAddTask}
              className="w-full rounded-xl bg-gradient-to-r from-yellow-300 to-pink-400 py-2 font-bold text-gray-900 hover:scale-[1.02] transition"
            >
              + Add Task
            </button>

          </div>

          {/* FILTER */}
          <div className="mt-3 flex items-center justify-between bg-white/10 p-2 rounded-xl border border-white/20">

            <span className="text-white text-xs">Show:</span>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  filter === "all"
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  filter === "completed"
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  filter === "active"
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                Active
              </button>
            </div>

          </div>

        </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-4 text-center">
              <p className="text-white/80 text-xs">Completed</p>
              <p className="text-3xl font-bold text-yellow-300">{completedCount}</p>
            </div>
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-4 text-center">
              <p className="text-white/80 text-xs">Incomplete</p>
              <p className="text-3xl font-bold text-pink-300">{incompleteCount}</p>
            </div>
          </div>

          {/* TASKS LIST */}
          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-6 text-center">
                <p className="text-white/80 text-sm">No tasks yet. Create one to get started!</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-lg rounded-2xl p-3 flex items-start justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id, task.completed)}
                        className="rounded cursor-pointer"
                      />
                      <h4
                        className={`text-sm font-semibold ${
                          task.completed
                            ? "text-white/60 line-through"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </h4>
                      {task.priority && (
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === "high"
                              ? "bg-red-500/30 text-red-200"
                              : task.priority === "medium"
                              ? "bg-yellow-500/30 text-yellow-200"
                              : "bg-green-500/30 text-green-200"
                          }`}
                        >
                          {task.priority}
                        </span>
                      )}
                    </div>
                    {task.description && (
                      <p className="text-white/70 text-xs mt-1 ml-6">
                        {task.description}
                      </p>
                    )}
                    {task.dueDate && (
                      <p className="text-white/60 text-xs mt-1 ml-6">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-400 hover:text-red-300 text-xs ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;