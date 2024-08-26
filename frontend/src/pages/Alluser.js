import React, { useEffect, useState } from 'react'
import summeryapi from '../common'
import { toast } from 'react-toastify'
import moment from'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../componets/ChangeUserRole';
const Alluser = () => {


  const [alluser,setallUsers]= useState([])
  const [openUpdateRole,setopenUpdateRole]= useState(false)
  const [updateUserdetails,setupdateUserdetails]=useState({
    email:"",
    name:"",
    role:"",
    _id:"",
  })
  const FetchAllusers =async()=>{
    const fetchData= await fetch(summeryapi.alluser.url,{
      method :summeryapi.alluser.method,
      credentials: "include"
    })
    const dataResponce= await fetchData.json()
    if(dataResponce.success){
      setallUsers(dataResponce.data)
    }
    if(dataResponce.error){
      toast.error(dataResponce.message)
    }
    console.log(dataResponce)
  }


  useEffect(()=>{
    FetchAllusers()

  },[])
  return (
    <div className='bg-white pb-4 p-4'>
     <table className='w-full userTable'>
       <thead>
        <tr className='bg-black text-white'>
         <th>Sr.</th>  
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Create Date</th>
          <th>Action</th>
        </tr>    
        </thead>
        <tbody className=''>
          {
            alluser.map((el,index)=>{
              return(
                <tr>
                  <td>{index+1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button className='bg-green-200 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                     onClick={()=>{
                      setupdateUserdetails(el)
                      setopenUpdateRole(true)
                    }} 
                      > <MdEdit /> </button>
                  </td>
                </tr>
              )

            })

          }
        </tbody>
     </table>
     {
      openUpdateRole &&(
        <ChangeUserRole onClose={()=>setopenUpdateRole(false)} 
        name={updateUserdetails.name}
        email={updateUserdetails.email}
        role={updateUserdetails.role}
        userId={updateUserdetails._id}
        callfunc={FetchAllusers}
        
        
        />
      )
     }
   
  </div>
  )
}

export default Alluser