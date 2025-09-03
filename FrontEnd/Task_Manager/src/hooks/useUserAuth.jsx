import React, {  use, useContext, useEffect } from 'react'
import { UserContext } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';

const useUserAuth = () => {


    const{user,loading,clearUser}= useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {

        if(loading) return;
        if(user) return;

        if(!user){
            clearUser();
        }

        if (!loading) {
            navigate('/login');
        }
    }, [loading, user, navigate]);

  return (
  <div>

  </div>
  )
}

export default useUserAuth

    
   

