import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Component/layout/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/Data";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropDown from "../../Component/Inputs/SelectDropDown";
import SelectUser from "../../Component/layout/SelectUser";
import Model from "../../Component/Model";
import TodoListInput from "../../Component/Inputs/TodoListInput";
import AddAttachmentsInput from "../../Component/Inputs/AddAttachmentsInput";
import axiosInstance from "../../utils/Axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import toast from "react-hot-toast";
import DeleteAlert from "../../Component/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { taskId } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState(null);
  const [currentTask, setCurrentTask] = useState(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: moment().format("YYYY-MM-DD"),
    assignedTo: [],
    todoCheckList: [],
    attachments: [],
  });

  const handleValueChange = (key, value) => {
    setTaskData((prev) => ({ ...prev, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "",
      dueDate: moment().format("YYYY-MM-DD"),
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
    setError("");
  };

  // Create task
  const createTask = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: taskData.todoCheckList.map((item) => ({
          text: item,
          completed: false,
        })),
        attachments: taskData.attachments || [],
      };

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, payload);
      toast.success("Task created successfully");
      clearData();
      navigate("/admin/tasks");
    } catch (err) {
      console.error("Error creating task:", err);
      setError(err.response?.data?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async () => {
    try {
      setLoading(true);
      const preTodoList = currentTask?.todoCheckList || [];
      const todoList = taskData.todoCheckList.map((item) => {
        const match = preTodoList.find((task) => task.text === item);
        return { text: item, completed: match ? match.completed : false };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });

      toast.success("Task updated successfully");
      navigate("/admin/tasks");
    } catch (err) {
      console.error("Error updating task:", err);
      setError(err.response?.data?.message || "Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      toast.success("Task deleted successfully");
      navigate("/admin/tasks");
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task.");
    } finally {
      setOpenDeleteAlert(false);
    }
  };

  // Fetch task details
  const getTaskDetailsByID = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId));
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "",
          assignedTo: taskInfo.assignedTo?.map((u) => u?._id) || [],
          todoCheckList: taskInfo.todoCheckList?.map((t) => t?.text) || [],
          attachments: taskInfo.attachments || [],
        });
      }
    } catch (err) {
      console.error("Error fetching task details:", err);
      setError("Could not load task details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!taskData.title?.trim()) return setError("Title is required.");
    if (!taskData.description?.trim()) return setError("Description is required.");
    if (!taskData.dueDate) return setError("Due date is required.");
    if (!taskData.assignedTo?.length)
      return setError("Task not assigned to any member.");
    if (!taskData.todoCheckList?.length)
      return setError("Add at least one todo task.");
    if (taskId) return updateTask();
    createTask();
  };

  useEffect(() => {
    if (taskId) getTaskDetailsByID();
  }, [taskId]);

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  onClick={() => setOpenDeleteAlert(true)}
                  className="flex items-center gap-1.5 text-rose-500 bg-rose-50 rounded px-2 border border-rose-100 hover:bg-rose-300"
                >
                  <LuTrash2 className="text-base" />
                </button>
              )}
            </div>

            {/* Title */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">Task Title</label>
              <input
                type="text"
                className="card-input"
                placeholder="Create App UI"
                value={taskData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="mt-2">
              <label className="text-xs font-medium text-slate-600">Description</label>
              <textarea
                className="card-input"
                placeholder="Describe Task"
                rows={5}
                value={taskData.description}
                onChange={(e) => handleValueChange("description", e.target.value)}
              />
            </div>

            {/* Priority */}
            <div className="grid grid-cols-12 gap-4 mt-9">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">Priority</label>
              </div>
              <SelectDropDown
                options={PRIORITY_DATA}
                value={taskData.priority}
                placeholder="Select Priority"
                onChange={(value) => handleValueChange("priority", value)}
              />
            </div>

            {/* Due Date */}
            <div className="col-span-6 md:col-span-4 mt-9">
              <label className="text-xs font-medium text-slate-600">Due Date</label>
              <input
                type="date"
                value={taskData.dueDate}
                onChange={(e) => handleValueChange("dueDate", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Assign To */}
            <div className="col-span-12 md:col-span-3 mt-6">
              <label className="text-xs font-medium text-slate-600">Assign To</label>
              <SelectUser
                selectedUsers={taskData.assignedTo}
                setSelectedUsers={(v) => handleValueChange("assignedTo", v)}
              />
            </div>

            {/* Todo List */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">TODO Checklist</label>
              <TodoListInput
                todoList={taskData.todoCheckList}
                setTODOLists={(v) => handleValueChange("todoCheckList", v)}
              />
            </div>

            {/* Attachments */}
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">Attachments</label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(v) => handleValueChange("attachments", v)}
              />
            </div>

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <div className="mt-4">
              <button
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Model isOpen={openDeleteAlert} onClose={() => setOpenDeleteAlert(false)} title="Delete Task">
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          OnDelete={deleteTask}
        />
      </Model>
    </DashboardLayout>
  );
};

export default CreateTask;
