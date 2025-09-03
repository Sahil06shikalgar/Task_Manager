import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Admin/DashBoard';
import ManageTask from './pages/Admin/ManageTask';
import CreateTask from './pages/Admin/CreateTask';
import ManageUser from './pages/Admin/ManageUser';
import UserDashboard from './pages/Users/UserDashboard';
import Mytask from './pages/Users/Mytask';
import ViewTaskDetails from './pages/Users/ViewTaskDeatils';
import PrivateRoutes from './Routes/PrivateRoutes';
import UserProvider, { UserContext } from '/src/context/usercontext.jsx';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
   
   <UserProvider>
    <div>
      <Router>
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            {/* {Admin Pannel} */}
            <Route element={<PrivateRoutes allowedRoles={['Admin']} />} >
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/tasks' element={<ManageTask />} />
            <Route path='/admin/create-task' element={<CreateTask />} />
            <Route path='/admin/users' element={<ManageUser />} />
            </Route>
            
            {/* {User Pannel} */}
             <Route element={<PrivateRoutes allowedRoles={['User']} />} >
            <Route path='/user/dashboard' element={<UserDashboard />} />
            <Route path='/user/task' element={<Mytask />} />
            <Route path='/user/task-details/:id' element={<ViewTaskDetails />} />

            </Route>

          <Route path='/' element={<Root/>}/>

        </Routes>
      </Router>
    </div>

    <Toaster 
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px",
    },}
    }
    />

    
    </UserProvider>

    
  )
}

export default App

const Root = () => {
  const {user,loading}=useContext(UserContext);

  if(loading) return <Outlet/>

if(!user){ return <Navigate to="/login" />};

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />;
  
}