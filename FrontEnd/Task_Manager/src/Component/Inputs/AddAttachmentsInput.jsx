import React, { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { LuPaperclip } from "react-icons/lu";
import { MdOutlineAdd } from "react-icons/md";

const AddAttachmentsInput = ({ attachments, setAttachments }) => {
  const [fileUrl, setFileUrl] = useState("");

  // Function to handle adding a new attachment
  const handleAddAttachment = () => {
    if (!fileUrl.trim()) return;

    const fileName = fileUrl.split("/").pop() || "Untitled";
    const newAttachment = {
      fileName,
      fileUrl: fileUrl.trim(),
      id: Date.now().toString(),
    };

    setAttachments([...attachments, newAttachment]);
    setFileUrl("");
  };

  // Function to handle deleting an attachment
  const handleDeleteAttachment = (id) => {
    const updatedArr = attachments.filter((att) => att.id !== id);
    setAttachments(updatedArr);
  };

  return (
    <div className="p-4 border rounded-md bg-white border-none">
      {/* Attachment List */}
      {attachments.length === 0 && (
        <p className="text-sm text-gray-500 mb-3">No attachments yet</p>
      )}
{attachments.map((item, index) => {
  const key = item?.id || `${item?.fileUrl || item}-${index}`;
  return (
    <div
      key={key}
      className="flex justify-between items-center bg-gray-50 border border-gray-200 px-3 py-2 mb-2 rounded-md"
    >
      <div className="flex items-center gap-2">
        <LuPaperclip className="text-gray-500 text-lg" />
        <a
          href={item?.fileUrl || item}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-sm"
        >
          {item?.fileName || item}
        </a>
      </div>
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => handleDeleteAttachment(item?.id || index)}
      >
        <HiOutlineTrash className="text-lg" />
      </button>
    </div>
  );
})}


      {/* Input + Add Button */}
      <div className="flex items-center gap-3 mt-4">
        <div className="flex items-center gap-2 flex-1 border border-gray-300 px-3 py-2 rounded-md">
          <LuPaperclip className="text-gray-500" />
          <input
            type="text"
            placeholder="Paste file link here"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            className="w-full text-[13px] text-gray-700 outline-none bg-white py-1"
          />
        </div>
        <button
          className="card-btn text-nowrap flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleAddAttachment}
        >
          <MdOutlineAdd className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttachmentsInput;
