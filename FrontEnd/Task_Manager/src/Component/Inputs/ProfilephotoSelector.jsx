import React, { useRef, useState } from 'react'
import {LuUser,LuUpload,LuTrash} from 'react-icons/lu'

const ProfilephotoSelector = (props) => {

    const inputref=useRef(null);
    const [Image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        
        if (file) {
            //upload the file
            setImage(file); 
            props.setImages(file)
            //Genrate the preview url file
            const preview=URL.createObjectURL(file);
            
            setPreviewUrl(preview);
        }
    }

    


    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile=()=>{
        inputref.current.click();
        
    };
  return (
    <div className='flex justify-center mb-6'>
      <input type="file"
      accept='image'
      ref={inputref}
      onChange={handleFileChange}
      className='hidden'
      />

      {!Image ? (
        <div  onClick={onChooseFile} className=' h-20 w-20 flex items-center justify-center cursor-pointer  bg-blue-100/50 rounded-full relative'>
          <LuUser className='text-4xl text-primary' />
          <button type='button' className='w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer'>
            <LuUpload className='text-slate-400' />
          </button>
        </div>
      ) : (
        <div className='relative '>
          <img src={previewUrl} alt="Profile Photo" className='w-20 h-20 rounded-full object-cover' />
          <button className='w-8 h-8 flex justify-center bg-red-500 text-white rounded-full absoulte -bottom-1 -right-1 ' onClick={handleRemoveImage}>
            <LuTrash className='mt-1.5' />
          </button>
        </div>
      )}

    </div>
  )
}

export default ProfilephotoSelector
