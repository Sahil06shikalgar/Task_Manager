import React, { useContext, useEffect, useState } from "react";
import useUserAuth from "../../hooks/useUserAuth";
import DashboardLayout from "../../Component/layout/DashboardLayout";
import { data, useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPath";
import { UserContext } from "../../context/usercontext";
import axiosInstance from "../../utils/Axiosinstance";
import moment from "moment";
import InfoCard from "../../Component/Card/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../Component/TaskListTable";
import CustomPieChart from "../../Component/Chart/CustomPieChart";
import CustomBarChart from "../../Component/Chart/CustomBarChart";

const COLORS = ["#1E90FF", "#A463F2", "#6BCB2C", ];

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [piechartData, setPiechartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // Prepare chart data
  const PrepareChartData = (Data) => {
    const taskDistribution = Data?.charts?.taskDistribution || {};
    const taskPriorities = Data?.charts?.taskPriorityLevels || {};

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Done || 0 },
    ];
    setPiechartData(taskDistributionData);

    const priorityLevelData = [
  { priority: "High", count: taskPriorities?.High ?? taskPriorities?.high ?? 0 },
  { priority: "Medium", count: taskPriorities?.Medium ?? taskPriorities?.medium ?? 0 },
  { priority: "Low", count: taskPriorities?.Low ?? taskPriorities?.low ?? 0 },
];
setBarChartData(priorityLevelData);

    
  }; 

  // Navigate to task page
  const onSeeMore = () => {
    if (user?.role === "admin") {
      navigate("/tasks");
    }
  };

  // Fetch dashboard data
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      if (response.data) {
        setDashboardData(response.data);
        PrepareChartData(response.data);
        
      }
      
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      {/* Header */}
      <div className="card my-5">
        <div className="col-span-3">
          <h2 className="text-xl md:text-2xl">Welcome! {user?.name}</h2>
          <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
            {moment().format("dddd MMMM Do YYYY")}
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Task"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color="bg-primary"
          />

          <InfoCard
            label="Pending Task"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color="bg-violet-500"
          />

          <InfoCard
            label="In Progress Task"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color="bg-cyan-500"
          />

          <InfoCard
            label="Completed Task"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Done || 0
            )}
            color="bg-lime-500"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6 ">
        <div className="card">
          <h5 className="text-lg mb-2">Task Distribution</h5>
          <CustomPieChart  data={piechartData} colors={COLORS}  />
        </div>

        <div className="card">
          <h5 className="text-lg mb-2">Task Priority Level</h5>
          <CustomBarChart data={barChartData} colors={COLORS} />
          
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-lg">Recent Task</h5>
              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
  