import React, { useState } from "react";
import { useTaskTimerContext } from "../context/TaskTimerContext";
import formatTime from "../utils/formatTime";

export default function TasksPanel() {
  const { state, dispatch } = useTaskTimerContext();
  const [newTaskName, setNewTaskName] = useState("");

  const greenClass = "bg-green-600 hover:bg-green-700"; // ✅ Green theme utility class

  const handleAddTask = () => {
    const trimmed = newTaskName.trim();
    if (trimmed) {
      dispatch({ type: "ADD_TASK", payload: { title: trimmed } });
      setNewTaskName("");
    }
  };

  const handleSelect = (taskId) => {
    if (state.isRunning) {
      alert("Please pause the timer before switching tasks.");
      return;
    }
    dispatch({ type: "SELECT_TASK", payload: { taskId } });
  };

  const handleDelete = () => {
    const selectedTask = state.tasks.find((t) => t.id === state.currentTaskId);
    if (selectedTask) {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete "${selectedTask.title}"?`
      );
      if (confirmDelete) {
        dispatch({ type: "DELETE_TASK", payload: { taskId: selectedTask.id } });
      }
    }
  };

  const totalTime = state.tasks.reduce((sum, task) => sum + (task.elapsed || 0), 0);

  return (
    <div className="p-4 space-y-4 w-full h-full flex flex-col justify-between">
      {/* Header and Add Task */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Tasks
        </h2>

        <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow"
            placeholder="New task name..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
            }}
          />
          <button
            onClick={handleAddTask}
            className={`${greenClass} text-white px-4 py-2 rounded-lg shadow text-lg`}
            title="Add Task"
          >
            +
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-3 overflow-y-auto max-h-[60vh] pr-1">
          {state.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleSelect(task.id)}
              className={`p-4 border rounded-lg cursor-pointer flex flex-col transition-all shadow-sm ${
                state.currentTaskId === task.id
                  ? `bg-green-100 dark:bg-green-700 opacity-90`
                  : "bg-white dark:bg-gray-800"
              }`}
            >
              <div className="font-semibold text-md text-gray-800 dark:text-white">
                {task.title}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {formatTime(task.elapsed || 0)}
              </div>
            </div>
          ))}

          {/* Total Time Summary */}
          {state.tasks.length > 0 && (
            <div className="mt-4 p-3 bg-gray-200 dark:bg-gray-700 rounded-lg text-center shadow">
              <div className="text-xs uppercase text-gray-600 dark:text-gray-300">Total Time</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {formatTime(totalTime)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Button */}
      {state.currentTaskId && (
        <button
          onClick={handleDelete}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full shadow"
        >
          Delete Selected Task
        </button>
      )}
    </div>
  );
}
