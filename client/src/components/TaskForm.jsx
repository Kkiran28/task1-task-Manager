import { useState } from "react";

function TaskForm({ addTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title) return;

    const newTask = {
      id: Date.now(),
      ...form
    };

    addTask(newTask);

    setForm({ title: "", description: "", dueDate: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-4">
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;