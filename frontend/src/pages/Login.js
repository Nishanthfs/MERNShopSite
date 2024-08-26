import React, { useContext, useState } from 'react'
import loginicon from "../NHproperities/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import summeryapi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
  const[showpassword,setpassword]= useState(false) // true will be shoowing password otherwise not showing the password
  const[data,setdata]=useState({
    email:"",
    password:""
  }
  )
  const navigate=useNavigate()
  const {fetchUserDetails,fetchUserAddToCart}=useContext(Context)
  const handleonchange=(e)=>{
    const{name,value}=e.target
    setdata((preve)=>{
      return{
        ...preve,
        [name]:value

      }

    })    
    
  }
  const handlesubmit= async(e)=>{
    e.preventDefault()
    const dataResponce = await fetch(summeryapi.signIn.url,{
      method : summeryapi.signIn.method,
      credentials:"include",
      headers:{
           "content-type":"application/json"
    },
    body: JSON.stringify(data)

    })
    const dataApi= await dataResponce.json()
    if(dataApi.success){
      toast.success(dataApi.message)
      navigate("/")
      fetchUserDetails()
      fetchUserAddToCart()
      


    }
    if(dataApi.error){
      toast.error(dataApi.message)

    }

  }
  console.log("data login",data)

  return (
    <route id="login">
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'> 
        <div className='w-20 h-20 mx-auto'>
             <img src={loginicon} alt="loginIcon"  className='rounded-full'/>
        </div>

          <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handlesubmit}>
            <div className='grid'>
              <label htmlFor="">Email :</label>
              <div className='bg-slate-100 p-2'>
              <input 
              type="email"
               placeholder='enter email'
               name='email'
               value={data.email}
               onChange={handleonchange}
                className='w-full h-full outline-none bg-transparent '/>
              </div>
            </div>

            <div>
              <label htmlFor="">Password :</label>
              <div className='bg-slate-100 p-2 flex'>
              <input
               type={showpassword ?"text":"password"} 
               placeholder='enter password'
               name='password'
               value={data.password}
               onChange={handleonchange} 
              className='w-full h-full outline-none bg-transparent'/>
              <div className='cursor-pointer text-xl' onClick={()=>setpassword((preve)=>!preve)}>

                <span>
                  {
                    // useing ternory //
                    showpassword ?(
                    <FaEyeSlash />):(
                    <FaEye />
                    )
                  }
                 
                </span>
             
              </div>
              </div>
              <Link to={"/forgot-password"} className="block w-fit ml-auto hover:underline hover:text-blue-500">
                Forgot password
              </Link>
            </div>

            <button className='bg-blue-600 hover:bg-blue-900 text-white px-6 py-2 w-full max-w-[120px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Login
            </button>

          </form>
          <p className='my-4'> Don't have account? <Link to={"/sign-up"} className=" text-blue-600 hover:text-blue-900 hover:underline"> Sign Up</Link></p>
          {/* login */}

        </div>

      </div>

    </route>
  )
}

export default Login