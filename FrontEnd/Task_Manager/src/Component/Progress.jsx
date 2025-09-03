import React from "react";

const Progress = ({ progress, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-500";
      case "Completed":
        return "bg-lime-500";
      case "Pending":
        return "bg-amber-500";
      default:
        return "bg-violet-500";
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative overflow-hidden">
      {/* Progress Bar */}
      <div
        className={`${getStatusColor(
          status
        )} h-4 rounded-full transition-all duration-300 flex items-center justify-center`}
        style={{ width: `${progress}%` }}
      >
        {/* Show text inside if progress > 15% */}
        {progress > 15 && (
          <span className="text-[11px] text-white font-medium">{progress}%</span>
        )}
      </div>

      {/* If bar too small, show text outside */}
      {progress <= 15 && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-gray-700 font-medium">
          {progress}%
        </span>
      )}
    </div>
  );
};

export default Progress;
