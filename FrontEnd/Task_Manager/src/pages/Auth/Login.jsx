import React, { useContext, useState } from 'react';
import AuthLayout from '../../Component/layout/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../Component/Inputs/input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/Axiosinstance';
import { API_PATHS } from '../../utils/apiPath';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(Usercontext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password || password.length < 8) {
      setError("Please enter a valid password.");
      return;
    }

    setError("");

    //login API Call

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const{token,role}=response.data;
      updateUser(response.data);



      if(token){
        localStorage.setItem("token", token);
      }
       if(role==="admin"){
       navigate("/admin/dashboard");
     } else {
       navigate("/user/dashboard");
     }
    }
    //redirect base on role
    
    catch(err) {
      if(err.response && err.response.data) {
        setError(err.response.data.message || "Login failed. Please try again.");
      } else {
        setError("Login failed. Please try again.");
      }
    }

  };

  return (
    <AuthLayout>
     <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center mt-10'>
      <h3 className='text-xl font-semibold text-black'>
        Welcome Back
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to login
      </p>

      <form onSubmit={handleLogin}>
        <Input
        type="text" value={email} 
        onChange={({target}) => setEmail(target.value)}
        label="Email Address"
        placeholder='Jhone@gmail.com'
        />

        <Input
        type="password"
         value={password} 
        onChange={({target}) => setPassword(target.value)}
        label="Password"
        placeholder='Min 8 characters'
        />

        {error && <p className='text-red-500 text-xs mt-2 pb-2.5'>{error}</p>}

        <button type='submit' className='btn-primary'>
          LOGIN
        </button>
        <p className='text-[13px] text-slate-700 mt-3'>
          Don't have an account?{" "}
          <Link className="font-medium text-primary underline" to="/signup">Sign Up</Link>
        </p>
      </form>
     </div>
    </AuthLayout>
  );
};

export default Login;


