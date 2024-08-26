import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../Nhelpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../Nhelpers/DisplayCurrency'
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../Nhelpers/addToCart';
import Context from '../context';



const HorizontalCardProduct = ({category,heading}) => {
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

        <div className='flex item-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={ScollElement}> 

        <button className='bg-white shadow-md rounded-full p-1 absolute left-0 bottom-16 text-lg hidden md:block' onClick={scrollLeft}><FaAngleDoubleLeft /> </button>
        <button className='bg-white shadow-md rounded-full p-1 absolute right-0 bottom-16 text-lg hidden md:block' onClick={scrollRight}><FaAngleDoubleRight /> </button> 

         { loading ? (
          loadingList.map((product,index)=>{
            return(
                <div className='w-full min-w-[320px] md:min-w-[320px] max-w-[340px] md:max-w-[360px] h-36 bg-white rounded-sm shadow flex'>
                   <div className='bg-slate-200 h-full p-4 object-cover min-w-[120px] md:min-w-[145] animate-pulse'>
                      
                   </div>
                 <div className='p-4 gird w-full gap-5'>
                 <h2 className='font-semibold text-base md:text-lg line-clamp-1 bg-slate-200 w-full p-1 h-4 animate-pulse rounded'></h2>
                   <p className='capitalize mt-2 text-slate-500 p-1 bg-slate-200 h-3 rounded'></p>
                   <div className='flex mt-2 gap-2 w-full'>
                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full h-3 rounded'></p>
                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full h-3 rounded'></p>
                   </div>
                   <button className='text-sm text-white mt-2 p-1 rounded-full w-36 bg-slate-200 h-4 animate-bounce'></button>

                </div>   
      
              </div>

            )
          })
         ):(
          data.map((product,index)=>{
            return(
                <Link to={"product/"+product?._id} className='w-full min-w-[320px] md:min-w-[320px] max-w-[340px] md:max-w-[360px] h-36 bg-white rounded-sm shadow flex'>
                   <div className='bg-slate-200 h-full p-4 object-cover min-w-[120px] md:min-w-[120]'>
                      <img src={product.productImage[0]} className='object-scale-down mix-blend-multiply h-full hover:scale-110 transition-all'/>
                   </div>
                 <div className='p-4 gird'>
                   <h2 className='font-semibold text-base md:text-lg line-clamp-1 text-black'>{product?.productName}</h2>
                   <p className='capitalize text-slate-500'>{product?.category}</p>
                   <div className='flex gap-2'>
                    <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                    <p className='text-slate-200 line-through'>{displayINRCurrency(product?.price)}</p>
                   </div>
                   <button className='text-sm bg-red-600 hover:bg-red-700 text-white mt-2 p-1 w-28 rounded-full'onClick={(e)=>handleAddToCart(e,product?._id)} >Add to Cart</button>

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

export default HorizontalCardProduct