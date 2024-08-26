
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './componets/Footer';
import Header from './componets/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summeryapi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';


function App() {
 const dispatch=useDispatch()
 const[cartProductCount,setCartProductCount] = useState(0) 
  const fetchUserDetails=async()=>{
    const dataResponce= await fetch(summeryapi.current_user.url,{
      method: summeryapi.current_user.method,
      credentials :"include"

    })
    const dataApi = await dataResponce.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))

    }
    // console.log("data-user",dataResponce)

  }

  const fetchUserAddToCart = async()=>{
    const dataResponce= await fetch(summeryapi.addToCartProductCount.url,{
      method: summeryapi.addToCartProductCount.method,
      credentials :"include"

    })
    const dataApi = await dataResponce.json()
    console.log("dataApi",dataApi)
    setCartProductCount(dataApi?.data?.count)
  }

 useEffect(()=>{
  /**user Details*/
     fetchUserDetails()

      /**user Details count*/
     fetchUserAddToCart()

 },[])

  return (
    <>
    <Context.Provider value={{

     fetchUserDetails, // user details fetch
     cartProductCount, // current user add to cart product count
     fetchUserAddToCart
    }}>
    <ToastContainer 
    position='top-center'
    />
    <Header/>
    <main className='min-h-[calc(100vh-120px)] pt-16'>
    <Outlet/>
    </main>
    <Footer/>
    </Context.Provider>
    
    </>
  )
}

export default App;

