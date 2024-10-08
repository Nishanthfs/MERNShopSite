import React, { useCallback, useContext, useEffect, useState } from 'react'
import {useNavigate, useParams}from 'react-router-dom'
import summeryapi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayINRCurrency from '../Nhelpers/DisplayCurrency';
import VerticalCardProduct from '../componets/VerticalCardProduct';
import CategoryWiseProductDisplay from '../componets/CategoryWiseProductDisplay';
import addToCart from '../Nhelpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const[data,setdata]=useState({
    productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:"",

  })
  const params = useParams()
  const[loading,setloading]=useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const[activeImage,setActiveImage]=useState("")

  const[zoomImageCoordinate,setZoomImageCoordinate] = useState({
    x : 0,
    y : 0
  })
  const[zoomImage,setZoomImage]=useState(false)

  const {fetchUserAddToCart}=useContext(Context)

  const navigate = useNavigate()
  // console.log("product id",params)

  const fetchProductDetails = async()=>{
    setloading(true)
    const responce = await fetch(summeryapi.productDetails.url,{
      method : summeryapi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setloading(false)
    const dataResponce = await responce.json()
    setdata(dataResponce?.data)
    setActiveImage(dataResponce?.data?.productImage[0])
    
  }
  // console.log("data",data)
 useEffect(()=>{ 
  fetchProductDetails()

 },[params])
const handleMouseEnterProduct = (imgURL)=>{
  setActiveImage(imgURL)

}

 // empty dependence []//
 const handleZoomImage = useCallback((e)=>{
  setZoomImage(true)
  const{left,top,width,height} = e.target.getBoundingClientRect()
  const x = (e.clientX-left)/width
  const y = (e.clientX-top)/height
  setZoomImageCoordinate({
    x,
    y
  })
  
 },[zoomImageCoordinate])

 const handleLeaveZoomImage = ()=>{
  setZoomImage(false)
 }

 const handleAddToCart = async(e,id)=>{
  await addToCart(e,id)
  fetchUserAddToCart()

 }

const handleBuyProduct =async(e,id)=>{
  await addToCart(e,id)
  fetchUserAddToCart()
  navigate("/cart")

}

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
        {/** product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 p-2'>
             <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative'>
              <img src={activeImage} alt="" className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveZoomImage} />

                 {
                  zoomImage && (
                     <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                <div 
                className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                style={{
                  backgroundImage :`url(${activeImage})`,
                  backgroundRepeat:'no-repeat',
                  backgroundPosition:`${zoomImageCoordinate.x*100}% ${zoomImageCoordinate.y*100}%`
                }}
                >
                  </div>

              </div>

                  )
                 }
             

                
             </div>
          <div className='h-full'>
            {
              loading ? (
              <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'> 
                {
                 productImageListLoading.map((el,index) =>{
                    return(
                      <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
 
                      </div>
                   )
                  })
               }
             </div>
                
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'> 
                {
                 data?.productImage?.map((imgURL,index) =>{
                    return(
                      <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                        <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
 
                      </div>
                   )
                  })
               }
             </div>

              
              )

            }

          </div>

         </div>

          {/** product details*/}
          { 
            loading ? (
              <div className='flex flex-col gap-4 w-full'>
            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
            <h2 className='text-2xl lg:text-4xl font-medium h-6  bg-slate-200 animate-pulse lg:h-8 w-full'></h2>
            <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse lg:h-8 h-6 w-full'></p>

            <div className='text-red-600  bg-slate-200 flex items-center gap-1 lg:h-8 w-full h-6'>
           
            </div>

            <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 animate-pulse lg:h-8 w-full'>
            <p className='text-red-600 bg-slate-200 w-full'></p>
            <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
            </div>
            <div className='flex items-center gap-3 my-2 py-1 w-full'>
            <button className=' h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full'></button>
            <button className='h-6 lg:h-8 bg-slate-200 rounded animate-pulse w-full' ></button>
            </div>
            <div>
              <p className='text-slate-600 font-medium my-1 h-6 bg-slate-200 animate-pulse rounded lg:h-8 w-full'></p>
              <p className='h-10 bg-slate-200 rounded animate-pulse lg:h-8 w-full'></p>
            </div>
          </div>

            ):(
              <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>
  
              <div className='text-red-600 flex items-center gap-1'>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
              </div>
  
              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
              <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
              <p className='text-slate-400 line-through'>{displayINRCurrency(data?.price)}</p>
              </div>
              <div className='flex items-center gap-3 my-2'>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white'onClick={(e)=>handleBuyProduct(e,data?._id)} >Buy</button>
              <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'onClick={(e)=> handleAddToCart(e,data?._id)}>Add To Cart</button>
              </div>
              <div>
                <p className='text-slate-600 font-medium my-1'> Description :</p>
                <p>{data?.description}</p>
              </div>
  
            
  
  
            </div>
  
              
            )
          }
          

      </div>


      {
        data.category && (
          <CategoryWiseProductDisplay category={data.category} heading={"Recommended Product"}/>
        )
      }
     
    </div>
  )
}

export default ProductDetails