import React, {  use, useContext } from 'react'
import { UserContext } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';

const useUserAuth = () => {


    const{user,loading,clearuser}= useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {

        if(loading) return;
        if(user) return;

        if(!user){
            clearuser();
        }

        if (!loading) {
            navigate('/login');
        }
    }, [loading, user, navigate]);

  return (
    <>
    {loading && <div>Loading...</div>}
    {!loading && user && <div>Welcome {user.name}</div>}
    </>
  )
}

export default useUserAuth

    
   

