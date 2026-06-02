import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [titleError, setTitleError] = useState("");

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
      setTitleError("This field is mandatory");
      return;
    }

    setTitleError("");

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
        setTitleError("");
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
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex flex-col">

      {/* HEADER */}
      <div className="py-6 text-center">
        <h1 className="text-3xl md:text-5xl leading-[1.3] pb-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-pink-200">
          Task Manager
        </h1>
        <h3 className="text-white/80 text-sm mt-1">
          Organize your tasks
        </h3>
      </div>

      {/* PAGE CONTENT */}
      <div className="flex-1 flex justify-center px-3 pb-10">

        <div className="w-full max-w-2xl">

          {/* FORM CARD */}
          <div className="bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-4 mb-4">

            <div className="space-y-3">

              <div>
                <label className="text-white text-sm">Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task name"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (titleError) setTitleError("");
                  }}
                  className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
                />
                {titleError && (
                  <p className="text-red-400 text-xs mt-1">{titleError}</p>
                )}
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

                <div>
                  <label className="text-white text-sm">Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
                  />
                </div>

                <div>
                  <label className="text-white text-sm">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    <option value="">Select</option>
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
          </div>

          {/* FILTER */}
          <div className="flex items-center justify-between bg-white/10 p-2 rounded-xl border border-white/20 mb-4">

            <span className="text-white text-xs">Show:</span>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  filter === "all"
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  filter === "completed"
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                Completed
              </button>

              <button
                onClick={() => setFilter("active")}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  filter === "active"
                    ? "bg-white text-purple-700"
                    : "bg-white/20 text-white"
                }`}
              >
                Active
              </button>
            </div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
              <p className="text-white/80 text-xs">Completed</p>
              <p className="text-3xl font-bold text-yellow-300">{completedCount}</p>
            </div>

            <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-4 text-center">
              <p className="text-white/80 text-xs">Incomplete</p>
              <p className="text-3xl font-bold text-pink-300">{incompleteCount}</p>
            </div>
          </div>

          {/* TASK LIST */}
          <div className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
                <p className="text-white/80 text-sm">No tasks yet. Create one to get started!</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task._id || task.id}
                  className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl p-3 flex items-start justify-between hover:border-white/40 transition"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => handleToggleTask(task._id || task.id, task.completed)}
                      className="mt-1 w-4 h-4 rounded cursor-pointer accent-yellow-300"
                    />
                    <div className="flex-1">
                      <h4 className={`text-sm font-semibold ${
                        task.completed
                          ? "text-white/60 line-through"
                          : "text-white"
                      }`}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="text-white/70 text-xs mt-1">
                          {task.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-2 text-xs text-white/60">
                        {task.dueDate && (
                          <span>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        )}
                        {task.createdAt && (
                          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task._id || task.id)}
                    className="text-black font-bold text-lg ml-2 hover:text-gray-700 transition"
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