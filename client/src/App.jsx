function App() {
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
      <div className="flex-1 flex items-start justify-center px-3 pt-2 pb-6">
        {/* CARD */}
        <div className="w-full max-w-xl max-h-full bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-4 flex flex-col">

          {/* FORM */}
          <div className="space-y-3 flex-1">

            <div>
              <label className="text-white text-sm">Task Title</label>
              <input
                type="text"
                placeholder="Enter task name"
                className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="text-white text-sm">Description</label>
              <textarea
                rows="2"
                placeholder="Add task details"
                className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="text-white text-sm">Due Date</label>
              <input
                type="date"
                className="mt-1 w-full rounded-xl bg-white/90 px-3 py-2 text-gray-800 outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <button className="w-full rounded-xl bg-gradient-to-r from-yellow-300 to-pink-400 py-2 font-bold text-gray-900 hover:scale-[1.02] transition">
              + Add Task
            </button>

          </div>

          {/* FILTER */}
          <div className="mt-3 flex items-center justify-between bg-white/10 p-2 rounded-xl border border-white/20">

            <span className="text-white text-xs">Show:</span>

            <div className="flex gap-2">
              <button className="px-3 py-1 rounded-full bg-white text-purple-700 text-xs font-semibold">
                All
              </button>
              <button className="px-3 py-1 rounded-full bg-white/20 text-white text-xs">
                Completed
              </button>
              <button className="px-3 py-1 rounded-full bg-white/20 text-white text-xs">
                Active
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;