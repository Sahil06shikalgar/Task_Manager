import React from "react";
import { LuUser } from "react-icons/lu";

const AvatarGroup = ({ users = [] }) => {
  const visibleUsers = users.slice(0, 3);
  const remainingCount = users.length - visibleUsers.length;

  return (
    <div className="flex items-center -space-x-2">
      {visibleUsers.map((user, index) => {
        const imageUrl = user?.profileImageUrl?.trim()
          ? user.profileImageUrl
          : "/default-avatar.png"; // Fallback image in public/

        return (
          <div
            key={user._id || index}
            className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium overflow-hidden"
            title={user?.name || "Unknown"}
          >
            {imageUrl !== "/default-avatar.png" ? (
              <img
                src={imageUrl}
                alt={user?.name || "User"}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
              />
            ) : (
              <LuUser className="text-gray-500" />
            )}
          </div>
        );
      })}

      {remainingCount > 0 && (
        <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-medium">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
