import React from 'react'
import StatCard from '../Card/StatCard'

const UserCard = ({ userInfo }) => {
  console.log("User Info:", userInfo);

  return (
    <div className="user-card p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl || null}
            alt="Avatar"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
          <div>
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-3 text-center justify-center">
        <StatCard
          label="Pending"
          count={Array.isArray(userInfo?.pendingTasks) ? userInfo.pendingTasks.length : (userInfo?.pendingTasks ?? 0)}
          status="Pending"
        />
        <StatCard
          label="Completed"
          count={Array.isArray(userInfo?.completedTasks) ? userInfo.completedTasks.length : (userInfo?.completedTasks ?? 0)}
          status="Completed"
        />
        <StatCard
          label="In Progress"
          count={Array.isArray(userInfo?.inProgressTasks) ? userInfo.inProgressTasks.length : (userInfo?.inProgressTasks ?? 0)}
          status="In Progress"
        />
      </div>
    </div>
  );
};

export default UserCard;
