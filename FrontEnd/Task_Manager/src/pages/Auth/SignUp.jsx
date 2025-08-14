import React, { useContext, useState } from 'react'
import AuthLayout from '../../Component/layout/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilephotoSelector from '../../Component/Inputs/ProfilephotoSelector';
import Input from '../../Component/Inputs/input';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/Axiosinstance';
import { API_PATHS } from '../../utils/apiPath';
import uploadImage from '../../utils/imageUploder';


const SignUp = () => {

  const [Profilepic,setProfilepic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken,setAdminInviteToken]=useState("");

  const [error, setError] = useState("");

  const {updateUser} = useContext(Usercontext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
      e.preventDefault();

      let profileImageUrl= '';

      if(!fullName) {
        setError("Please enter a valid full name.");
        return;
      }
  

      if(!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
  
      if(!password || password.length < 8) {
        setError("Please enter a valid password.");
        return;
      }
  
      setError("");
  
      //signup API Call

       try{

        //upload image is present
       

        if(profileImageUrl){
          const imageUpload=await uploadImage(profileImageUrl);
          profileImageUrl=imageUpload.url || "";
        }
        
        const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
          name:fullName,
          email,
          password,
          profileImageUrl,
          adminInviteToken
        });

        const {token,role}=response.data;
        if(token){
          localStorage.setItem("token", token);
          updateUser(response.data);

          //redirect based on role
          if(role === "admin"){
            navigate("/admin/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        }
    }
   
    
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

    <div className='lg:w-[100%] h-auto md:h-full mt-10 flex flex-col  justify-center '>
      <h3 className='text-xl font-semibold text-black mt-12'>Create an Account </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today entering your details below.</p>


      <form onSubmit={handleSignUp}>
        <ProfilephotoSelector images={Profilepic} setImages={setProfilepic} />
        <div className='grid grid-col-1 md:grid-cols-2 gap-4'>

        </div>
      </form>
    
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

    <Input 
    value={fullName}
    onChange={({target}) => setFullName(target.value)}
    label="Full Name"
    placeholder='Jhone Doe'
    type="text" 
    />
    
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

        <Input
        type="text"
         value={adminInviteToken} 
        onChange={({target}) => setAdminInviteToken(target.value)}
        label="Admin Invite Token"
        placeholder='6 Digit Code'
        />
    
    </div>


        <button type='submit' className='btn-primary' onClick={handleSignUp}>
          SIGN UP
        </button>
        <p className='text-[13px] text-slate-700 mt-3'>
          Already an account?{" "}
          <Link className="font-medium text-primary underline" to="/login">Log In</Link>
        </p>
    </div>

    </AuthLayout>
  )
}

export default SignUp