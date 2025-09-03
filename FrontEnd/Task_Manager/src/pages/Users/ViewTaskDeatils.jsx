import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/Axiosinstance";
import { API_PATHS } from "../../utils/apiPath";
import DashboardLayout from "../../Component/layout/DashboardLayout";
import InfoBox from "../../Component/Card/InfoBox";
import moment from "moment";
import AvatarGroup from "../../Component/AvatarGroup";
import { LuSquareArrowOutUpRight } from "react-icons/lu";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTaskDetailsById = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        setTask(response.data);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodoCheckList = async (index) => {
  try {
    const taskId = id;
    const todoChecklist = [...task.todoChecklist];

    if (todoChecklist[index]) {
      // ✅ Optimistically update UI
      todoChecklist[index].completed = !todoChecklist[index].completed;
      setTask((prev) => ({ ...prev, todoChecklist }));

      // ✅ Send update to server
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TODO_CHECKLIST(taskId),
        { todoChecklist }
      );

      if (response.status === 200) {
        // Update with latest task from backend
        setTask(response.data?.task || task);
      } else {
        // Rollback if server rejected
        todoChecklist[index].completed = !todoChecklist[index].completed;
        setTask((prev) => ({ ...prev, todoChecklist }));
      }
    }
  } catch (error) {
    console.error("Error updating todo checklist:", error);

    // Rollback on error
    const todoChecklist = [...task.todoChecklist];
    todoChecklist[index].completed = !todoChecklist[index].completed;
    setTask((prev) => ({ ...prev, todoChecklist }));
  }
};

  const handleAttachmentClick = (fileUrl) => {

    if (!/^https?:\/\//.test(fileUrl)) {
          link="https://"+ fileUrl;
    }
     window.open(fileUrl, "_blank");
  };

  const getStatusTagColor = (status) => {
    switch (status) {
      case "In-Progress":
        return "text-cyan-500 bg-cyan-50 border-cyan-500/10";
      case "Done":
        return "text-green-500 bg-green-50 border-green-500/10";
      case "Pending":
        return "text-purple-500 bg-purple-50 border-purple-500/10";
      default:
        return "text-gray-500 bg-gray-50 border-gray-500/10";
    }
  };

  useEffect(() => {
    if (id) getTaskDetailsById();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout activeMenu="My Task">
        <div className="p-5 text-gray-500">Loading task details...</div>
      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout activeMenu="My Task">
        <div className="p-5 text-gray-500">No task found.</div>
      </DashboardLayout>
    );
  }

 

  return (
    <DashboardLayout activeMenu="My Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Task Main Info */}
          <div className="form-card col-span-3 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-medium">{task.title}</h2>
              <div
                className={`text-[11px] md:text-[13px] font-medium px-5 py-2 rounded ${getStatusTagColor(task?.status
                )}`}
              >
                {task.status}
              </div>
            </div>

            <div className="mt-4">
              <InfoBox label="Description" value={task.description} />
            </div>

            <div className="grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex justify-between mb-3">
                <InfoBox label="Priority" value={task.priority} />
                <InfoBox
                  label="Due Date"
                  value={
                    task.dueDate
                      ? moment(task.dueDate).format("DD/MM/YYYY")
                      : "N/A"
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">
                  Assigned To
                </label>
                <AvatarGroup
                  users={task.assignedTo || []}
                  maxVisible={5}
                  className="mt-2 mr-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <InfoBox
                label="Created At"
                value={moment(task.createdAt).format("DD/MM/YYYY")}
              />
              <InfoBox
                label="Last Updated"
                value={moment(task.updatedAt).format("DD/MM/YYYY")}
              />
            </div>

            {/* Checklist */}
            <div className="mt-2">
              <label className="text-xs font-medium text-slate-500">
                Todo Checklist
              </label>

              {task?.todoChecklist?.length > 0 ? (
                task.todoChecklist.map((item, index) => (
                  <TodoCheckList
                    key={`todo_${index}`}
                    text={item.text}
                    isChecked={item.completed}
                    onChange={() => updateTodoCheckList(index)}
                  />
                ))
              ) : (
                <p className="text-sm text-gray-400 mt-2">
                  No checklist items.
                </p>
              )}
            </div>

            {/* Attachments */}
            {task?.attachments?.length > 0 && (
              <div className="mt-4">
                <label className="text-xs font-medium text-slate-500">
                  Attachments
                </label>
                <div className="mt-2">
                  {task.attachments.map((file, index) => (
                    <Attachment
                      key={file._id || `file_${index}`}
                      index={index}
                      fileName={file.fileName || `File ${index + 1}`}
                      fileUrl={file.fileUrl}
                      onClick={() => handleAttachmentClick(file.fileUrl)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetails;

/* ---------------- Sub-components ---------------- */

const TodoCheckList = ({ text, isChecked, onChange }) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm cursor-pointer"
      />
      <p
        className={`text-[13px] ${
          isChecked ? "line-through text-gray-500" : "text-gray-800"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

const Attachment = ({ index, fileName, fileUrl, onClick }) => {
  return (
    <div
      className="flex justify-between items-center bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-2 cursor-pointer hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="text-xs text-gray-400 font-semibold">
          {index < 9 ? `0${index + 1}` : index + 1}
        </span>
        <p className="text-xs text-black truncate">{fileName}</p>
      </div>
      <LuSquareArrowOutUpRight className="text-gray-400" />
    </div>
  );
};
