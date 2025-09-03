import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../Component/layout/DashboardLayout';
import axiosInstance from '../../utils/Axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../Component/Card/UserCard';
import toast from 'react-hot-toast';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const ManageUser = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);

      if (response.data?.length > 0) {
        // ✅ Filter only members (non-admins)
        const membersOnly = response.data.filter((user) => user.role !== 'admin');
        setAllUsers(membersOnly);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error Fetching Users', error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDownloadReport = async () => {
    try {
      if (!allUsers || allUsers.length === 0) {
        toast.error('No data available to download');
        return;
      }

      toast.loading('Generating Excel report...');

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('User Task Report');

      worksheet.columns = [
        { header: 'User Name', key: 'name', width: 30 },
        { header: 'Email', key: 'email', width: 40 },
        { header: 'Total Assigned Tasks', key: 'taskCount', width: 20 },
        { header: 'Pending Tasks', key: 'pendingTasks', width: 20 },
        { header: 'In Progress Tasks', key: 'inProgressTasks', width: 20 },
        { header: 'Completed Tasks', key: 'completedTasks', width: 20 },
      ];

      allUsers.forEach((user) => {
        worksheet.addRow({
          name: user.name,
          email: user.email,
          taskCount: user.taskCount || 0,
          pendingTasks: user.pendingTasks || 0,
          inProgressTasks: user.inProgressTasks || 0,
          completedTasks: user.completedTasks || 0,
        });
      });

      worksheet.getRow(1).font = { bold: true };

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'users_report.xlsx');

      toast.dismiss();
      toast.success('Report downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate report');
      console.error('Error generating Excel:', error);
    }
  };

  return (
    <div>
      <DashboardLayout activeMenu={'Team Member'}>
        <div className="mt-5 mb-10">
          <div className="flex md:flex-row flex-col justify-between items-center">
            <h2 className="text-xl md:text-xl font-medium">Team Member</h2>
            <button className="flex md:flex download-btn" onClick={handleDownloadReport}>
              Download Report
              <LuFileSpreadsheet className="text-lg" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {allUsers.map((user) => (
              <UserCard key={user._id} userInfo={user} />
            ))}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default ManageUser;
