import React, { useEffect, useState } from 'react'
import UploadProduct from '../componets/UploadProduct'
import summeryapi from '../common'
import AdminProductCard from '../componets/AdminProductCard'

const AllProducts = () => {
  const[openUploadProduct,setOpenUploadProducts]=useState(false)
  const[allProduct,setAllProduct]=useState([])
  const fetchAllProduct=async()=>{
    const responce = await fetch(summeryapi.allProduct.url)
    const dataResponce= await responce.json() 
    // console.log("responce product",dataResponce)
    setAllProduct(dataResponce?.data || [])

  }
  useEffect(()=>{
  
   fetchAllProduct()
  
  })

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white py-1 px-4 rounded-full' onClick={()=>setOpenUploadProducts(true)}>Upload Product</button>
      </div>
      {/**all products */}
      <div className='flex items-center flex-wrap gap-4 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
        {
        allProduct.map((product,index)=>{
         return(
          <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
         
        )

       })
        }
    
      </div>




      {   //upload product things//
      }
      {
        openUploadProduct &&(
          <UploadProduct onClose={()=>setOpenUploadProducts(false)}  fetchData={fetchAllProduct}/>
         
        )
      }
    </div>
  )
}

export default AllProducts