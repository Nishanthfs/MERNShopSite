// import React from 'react'
import React, { useState } from 'react'
import loginicon from "../NHproperities/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imagetobase64 from '../Nhelpers/imagetobase64';
import summeryapi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {

   const[showpassword,setpassword]= useState(false)
   const[showconfirmpassword,setconfirmpassword]= useState(false)

    const[data,setdata]=useState({
  
      email:"",
      password:"",
      name:"",
      confirmpassword:"",
      profilepic:"",
    }
    )

    const navigate=useNavigate()
    const handleonchange=(e)=>{
      const{name,value}=e.target
      setdata((preve)=>{
        return{
          ...preve,
          [name]:value
  
        }
  
      })    
      
    }

    const handleuploadpic= async(e)=>{
      const file=e.target.files[0]
      const imgepic= await imagetobase64(file)
      // console.log("imgepic",imgepic)
      setdata((preve)=>{
        return{
          ...preve,
           profilepic:imgepic
          }
        
      })


    }

    const handlesubmit=async(e)=>{
      e.preventDefault()
      if(data.password=== data.confirmpassword){
        
        const dataResponse=await fetch(summeryapi.signUp.url,{
          method: summeryapi.signUp.method,
          headers: {
            "content-type":"application/json"
  
          },
          body:JSON.stringify(data)
        })
        const dataApi= await dataResponse.json()
        if(dataApi.success){
          toast.success(dataApi.message)
          navigate("/login")
        }
        if(dataApi.error){
          toast.error(dataApi.message)

        }
        
        // console.log("data",dataApi)
    
      }else{
        toast.error("Please Check Password and Confirem Password")
      }

      }
     
    // console.log("data login",data)

  return (
    <route id="signup">
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-sm mx-auto'> 
        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
          <div>
          <img src={ data.profilepic || loginicon} alt="loginIcon" />
          <form action="">
            <label>
              <div className='text-xs bg-opacity-85 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
               Upload Photo
              </div>
              <input type='file' className='hidden' onChange={handleuploadpic}/>
            </label>
          </form>
          </div>
            
        </div>

          <form action="" className='pt-6 flex flex-col gap-2' onSubmit={handlesubmit}>

          <div className='grid'>
              <label htmlFor="">Name:</label>
              <div className='bg-slate-100 p-2'>
              <input 
              type="text"
               placeholder='enter the name'
               name='name'
               value={data.name}
               onChange={handleonchange}
               required
                className='w-full h-full outline-none bg-transparent '/>
              </div>
            </div>

            <div className='grid'>
              <label htmlFor="">Email:</label>
              <div className='bg-slate-100 p-2'>
              <input 
              type="email"
               placeholder='enter email'
               name='email'
               value={data.email}
               onChange={handleonchange}
               required
                className='w-full h-full outline-none bg-transparent '/>
              </div>
            </div>

            <div>
              <label htmlFor="">Password:</label>
              <div className='bg-slate-100 p-2 flex'>
              <input
               type={showpassword ?"text":"password"} 
               placeholder='enter password'
               name='password'
               value={data.password}
               onChange={handleonchange} 
               required
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
              
            </div>

            <div>
              <label htmlFor="">Confirm Password:</label>
              <div className='bg-slate-100 p-2 flex'>
              <input
               type={showconfirmpassword ?"text":"password"} 
               placeholder='enter confirm password'
               name='confirmpassword'
               value={data.confirmpassword}
               onChange={handleonchange} 
               required
              className='w-full h-full outline-none bg-transparent'/>
              <div className='cursor-pointer text-xl' onClick={()=>setconfirmpassword((preve)=>!preve)}>

                <span>
                  {
                    // useing ternory //
                    showconfirmpassword ?(
                    <FaEyeSlash />):(
                    <FaEye />
                    )
                  }
                 
                </span>
             
              </div>
              </div>
              
            </div>

            <button className='bg-blue-600 hover:bg-blue-900 text-white px-6 py-2 w-full max-w-[120px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Sign Up
            </button>

          </form>
          <p className='my-4'> Already have acccount? <Link to={"/login"} className=" text-blue-600 hover:text-blue-900 hover:underline"> Login</Link></p>
          {/* login */}

        </div>

      </div>

    </route>
  )
}

export default SignUp