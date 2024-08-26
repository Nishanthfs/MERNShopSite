import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import summeryapi from '../common';
import{toast} from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
const Header = () => {
  const user= useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false);
  const context = useContext(Context)
  const navigate =useNavigate()
  const searchInput = useLocation()
  const  URLsearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLsearch.getAll("q")

  const [search,setSearch]=useState(searchQuery)

const handleLogout = async()=>{
    const fetchdata = await fetch(summeryapi.logout_user.url,{
      method : summeryapi.logout_user.method,
      credentials:"include"
    })

    const data = await fetchdata.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")

    }
    if(data.error){
      toast.error(data.message)

    }
  }
    const handleSearch =async(e)=>{
      const {value} = e.target
      setSearch(value)
      if(value){
        navigate(`/search?q=${value}`)

      }else{
        navigate("/search")
      }

    }
  

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
    <route className=" h-full container max-auto flex items-center px-6 justify-between"> 
       <div className=''>
          <Link to={"/"}>
          <Logo w={105}h={40}/>
          </Link>
        </div>

         <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-3'>
           <input type="text" placeholder='Search Product here....' className='w-full outline-none pl-2' onChange={ handleSearch} value={search}/> 
           <div className='text-lg min-w-[50px] h-8 bg-red-600  flex items-center justify-center rounded-r-full text-white'>
              <GrSearch />
           </div>
        </div>

        <div className='flex items-center gap-7'>

          <div className='relative flex justify-center'>
            {
              user?._id &&(
                <div className='text-3xl cursor-pointer relative flex justify-center'onClick={()=>setMenuDisplay(preve => !preve)} Tog>
                {
                  user?.profilepic?(
                    <img src={user?.profilepic}  className='w-10 h-10 rounded-full' alt={user?.name}/>
                  ):(
                     <FaRegUserCircle />
                  )  
                }
              </div>

              )
            }
         
          {
            menuDisplay &&(
              <div className='absolute bg-white bottom-0 top-11 h-fit p-3 shadow-lg rounded'> {/* hidden group-hover:block */}
             <nav>
              {
                user?.role ===ROLE.ADMIN &&(
                  <Link to={"/admin-panel/all-Prodects"} className='whitespace-nowrap hidden md:block hover:bg-slate-50 p-2'>Admin Panel</Link>
              )
              }
             
              </nav>          
              </div>
            )
          }

          </div>
          {
             user?._id &&  (
            <Link to={"/cart"} className='text-2xl relative'>
               <span><FaCartShopping /></span>
          
              <div className='bg-red-600 text-white w-5  h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'> 
               <p className='text-sm'>{context?.cartProductCount}</p>
               </div>
          </Link>

             )
          }

          
          
        <div>
          {
            user?._id ?(
              <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
            ):
            (
            <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700' > Login</Link>
            )
          }
         
        </div>

        
        </div>
      
    </route>
    </header>
  )
}

export default Header