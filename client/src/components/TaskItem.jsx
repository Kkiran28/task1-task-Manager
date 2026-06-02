function TaskItem({ task, deleteTask }) {
  return (
    <div className="bg-white p-3 shadow rounded flex justify-between items-center">
      <div>
        <h2 className="font-bold">{task.title}</h2>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-400">{task.dueDate}</p>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;