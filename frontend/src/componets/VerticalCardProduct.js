import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../Nhelpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../Nhelpers/DisplayCurrency'
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../Nhelpers/addToCart';
import Context from '../context';

const VerticalCardProduct = ({category,heading}) => {
    const [data,setdata]=useState([])
    const[loading,setLoading]=useState(true)
    const loadingList = new Array(13).fill(null)
    const [scroll,setScroll]=useState(0)
    const ScollElement=useRef()

    const {fetchUserAddToCart}=useContext(Context)
    const handleAddToCart = async(e,id)=>{
      await addToCart(e,id)
      fetchUserAddToCart()
   }


    const fetchData= async()=>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setdata(categoryProduct?.data)
    }
    useEffect(()=>{
        fetchData()    
    },[])  

    const scrollRight=()=>{
      ScollElement.current.scrollLeft += 300
    }
    const scrollLeft=()=>{
      ScollElement.current.scrollLeft -= 300
    }
  


  return (
    <div className='container mx-auto px-4 my-6 relative'>

         <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

        <div className='flex item-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={ScollElement}> 

        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg  bottom-40 hidden md:block' onClick={scrollLeft}><FaAngleDoubleLeft /> </button>
        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg bottom-40 hidden md:block' onClick={scrollRight}><FaAngleDoubleRight /> </button> 

         {  
              loading ? (
                loadingList.map((product,index)=>{
                  return(
                      <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                         <div className='bg-slate-200 h-48 p-4  min-w-[280px] md:min-w-[145] flex justify-center items-center animate-pulse'>
                            
                         </div>
                       <div className='p-4 grid gap-3'>
                         <h2 className='font-semibold text-base md:text-lg line-clamp-1 text-black p-1 py-2 animate-pulse bg-slate-200 w-full'></h2>
                         <p className='capitalize  bg-slate-200 p-1 py-2 rounded'></p>
                         <div className='flex gap-2'>
                          <p className='text-red-600 font-medium p-1 bg-slate-200 w-full py-2 rounded'></p>
                          <p className='text-slate-200 line-through p-1 bg-slate-200 w-full py2 rounded'></p>
                         </div>
                         <button className='text-sm  text-white mt-2 p-1 w-36 rounded-full bg-slate-200 py-3 animate-bounce'></button>
  
                      </div>   
            
                    </div>
  
                  )
              })
             
            ):(
              data.map((product,index)=>{
                return(
                    <Link to={"product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow'>
                       <div className='bg-slate-200 h-48 p-4  min-w-[280px] md:min-w-[145] flex justify-center items-center'>
                          <img src={product.productImage[0]} className='object-scale-down mix-blend-multiply h-full hover:scale-110 transition-all'/>
                       </div>
                     <div className='p-4 grid gap-1'>
                       <h2 className='font-semibold text-base md:text-lg line-clamp-1 text-black'>{product?.productName}</h2>
                       <p className='capitalize'>{product?.category}</p>
                       <div className='flex gap-2'>
                        <p className='text-red-600 font-medium '>{displayINRCurrency(product?.sellingPrice)}</p>
                        <p className='text-slate-200 line-through '>{displayINRCurrency(product?.price)}</p>
                       </div>
                       <button className='text-sm bg-red-600 hover:bg-red-700 text-white mt-2 p-1 w-36 rounded-full'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>

                    </div>   
          
                  </Link>

                )

            })

            )
       
         }
     </div>
       
    </div>
  )
}

export default  VerticalCardProduct