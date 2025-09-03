import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Component/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/Axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../Component/TaskStatusTabs';
import TaskCard from '../../Component/Card/TaskCard';
import toast from 'react-hot-toast';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


const ManageTask = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  // Fetch all tasks
  const getAllTasks = async () => {
    try {
      
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus
        }
      });
      console.log("response.data", response.data);
      setAllTasks(response.data?.tasks || []);

      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Done", count: statusSummary.completedTasks || 0 },
      ];
      setTabs(statusArray);

    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  // Navigate to edit task page
  const handleClick = (task) => {
    navigate(`/admin/create-task`, { state: { taskId: task._id } });
  };

  // Download tasks as CSV
 const handleDownloadTasks = async () => {
  try {
    if (!allTasks || allTasks.length === 0) {
      toast.error("No tasks available to download");
      return;
    }

    toast.loading("Generating Tasks Excel report...");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks");

    const headers = Object.keys(allTasks[0]).map((key) => ({
      header: key,
      key: key,
      width: 30,
    }));

    worksheet.columns = headers;

    allTasks.forEach((task) => {
      const row = {};
      Object.keys(task).forEach((key) => {
        row[key] =
          typeof task[key] === "object" && task[key] !== null
            ? JSON.stringify(task[key])
            : task[key] ?? "";
      });
      worksheet.addRow(row);
    });

    worksheet.getRow(1).font = { bold: true };

    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "tasks_report.xlsx"
    );

    toast.dismiss();
    toast.success("Tasks report downloaded!");
  } catch (error) {
    toast.dismiss();
    toast.error("Failed to generate Tasks report");
    console.error(error);
  }
};


  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Task">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-xl md:text-xl font-medium'>My Tasks</h2>
            <button className='flex lg:hidden download-btn' onClick={handleDownloadTasks}>
              <LuFileSpreadsheet className='text-lg' />
              Download Report
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className='flex items-center gap-3'>
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
              <button className='hidden lg:flex download-btn' onClick={handleDownloadTasks}>
                <LuFileSpreadsheet className='text-lg' />
                Download Report
              </button>
            </div>
          )}
        </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {allTasks?.map((item, index) => (
      <TaskCard
        key={item._id || index}
        title={item.title}
        description={item.description}
        priority={item.priority}
        status={item.status}
        progress={item.progress}
        createdAt={item.createdAt}
        dueDate={item.dueDate}
         assignedTo={item.assignedTo?.map(user => user.profileImageUrl)}
        attachmentCount={item.attachments?.length || 0}
        completedTodoCount={item.completedTodoCount || 0}
        todoChecklist={item.todoChecklist || []}
        onClick={() => handleClick(item)}
      />
   

    ))}
    
  </div>
        </div>
      
    </DashboardLayout>
  );
};

export default ManageTask;
