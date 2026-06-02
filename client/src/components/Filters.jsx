function Filters() {
  return (
    <div className="flex gap-2 justify-center mb-4">
      <button className="px-3 py-1 bg-gray-200 rounded">
        All
      </button>
      <button className="px-3 py-1 bg-gray-200 rounded">
        Active
      </button>
      <button className="px-3 py-1 bg-gray-200 rounded">
        Completed
      </button>
    </div>
  );
}

export default Filters;