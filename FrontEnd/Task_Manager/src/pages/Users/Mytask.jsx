import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Component/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/Axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import { LuFileSpreadsheet } from 'react-icons/lu';
import TaskStatusTabs from '../../Component/TaskStatusTabs';
import TaskCard from '../../Component/Card/TaskCard';



const Mytask = () => {
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
  const handleClick = (taskId) => {
   navigate(`/user/task-details/${taskId}`)
  };

  


  useEffect(() => {
    getAllTasks();
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Task">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row justify-between lg:items-center'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-xl m-6 md:text-xl font-medium'>My Tasks</h2>
          </div>
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
        onClick={() => handleClick(item._id )}
      />
   

    ))}
    
  </div>
        </div>
      
    </DashboardLayout>
  );
};

export default Mytask;
