import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axiosinstance"; 
import { LuUser } from "react-icons/lu";
import Model from "../Model";
import AvatarGroup from "../AvatarGroup";
import { API_PATHS } from "../../utils/apiPath";

/**
 * SelectUser
 * Allows assigning users via modal, shows AvatarGroup of selected users.
 */
const SelectUser = ({ selectedUsers = [], setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  // Fetch all users from API
  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (Array.isArray(response.data)) {
        setAllUsers(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Toggle user selection inside modal
  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  // Apply selection and close modal
  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  // Fetch users once on mount
  useEffect(() => {
    getAllUsers();
  }, []);

  // Reset modal selection when parent resets
  useEffect(() => {
    if (selectedUsers.length === 0) {
      setTempSelectedUsers([]);
    }
  }, [selectedUsers]);

  return (
    <div className="space-y-4 mt-2">
      {/* Show Add Members button OR selected avatars */}
      {selectedUsers.length === 0 ? (
        <button
          className="card-btn flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <LuUser className="text-sm" /> Add Members
        </button>
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <AvatarGroup
            users={allUsers.filter((u) => selectedUsers.includes(u._id))}
          />
        </div>
      )}

      {/* User Selection Modal */}
      <Model
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="space-y-4 h-[60vh] overflow-y-auto bg-white pt-3 px-5">
          {allUsers.map((user) => (
            <label
              key={user._id}
              className={`flex items-center gap-4 p-3 border-b border-gray-200 cursor-pointer rounded-lg transition ${
                tempSelectedUsers.includes(user._id) ? "bg-gray-50 shadow" : ""
              }`}
            >
              <img
                src={user.profileImageUrl || "https://via.placeholder.com/40"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded-sm"
              />
            </label>
          ))}
        </div>

        {/* Modal footer */}
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleAssign}
          >
            Assign
          </button>
        </div>
      </Model>
    </div>
  );
};

export default SelectUser;
