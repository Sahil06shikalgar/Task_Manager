import React, { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineAdd } from "react-icons/md";

const TodoListInput = ({ todoList, setTODOLists }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    if (option.trim()) {
      setTODOLists([...todoList, option]);
      setOption("");
    }
  };

  const handleDeleteOption = (index) => {
    const updatedArr = todoList.filter((_, idx) => idx !== index);
    setTODOLists(updatedArr);
  };

  return (
    <div>
      {todoList.map((item, index) => (
        <div
          key={index}
          className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 mb-3 mt-3 rounded-md'
        >
          <p className='text-xs text-gray-600 font-semibold mr-2'>
            <span className='mr-2'>
              {index < 9 ? `0${index + 1}` : index + 1}.
            </span>
            {item}
          </p>

          <button
            className='cursor-pointer'
            onClick={() => handleDeleteOption(index)}
          >
            <HiOutlineTrash className='text-lg text-red-500' />
          </button>
        </div>
      ))}

      <div className='flex items-center gap-5 mt-4'>
        <input
          type="text"
          placeholder='Enter The Task'
          value={option}
          onChange={({ target }) => setOption(target.value)}
          className='w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md'
        />
        <button
          className='card-btn text-nowrap'
          onClick={handleAddOption}
        >
          <MdOutlineAdd className='text-lg' /> Add
        </button>
      </div>
    </div>
  );
};

export default TodoListInput;
