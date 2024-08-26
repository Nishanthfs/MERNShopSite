import React, { useState } from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import productCategory from '../Nhelpers/productCategory';
import{FaCloudUploadAlt} from"react-icons/fa"
import uploadimage from '../Nhelpers/uploadimage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import summeryapi from '../common';
import {toast} from "react-toastify"

const UploadProduct = ({
    onClose,
    fetchData
}) => {
  const[data,setdata]=useState({
    productName:"",
    brandName:"",
    category:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:"",

  })

  const[openFullScreenImage,setOpenFullScreenImage]=useState(false)
  const [fullscreenImage,setFullscreenImage]=useState("")
  // const[uploadProductImageInput,setUploadProcutImageInput]=useState()

  const handleonchange=(e)=>{
    const{name,value}=e.target
    setdata((preve)=>{
      return{
        ...preve,
        [name]: value
      }
     })

  }

  const handleUploadProduct=async(e)=>{
    const file = e.target.files[0]
    // setUploadProcutImageInput(file.name)
    // console.log("file",file)
   const uploadImageCloudinary= await uploadimage(file)
   setdata((preve)=>{
    return{
      ...preve,
      productImage:[...preve.productImage,uploadImageCloudinary.url]
    }
   })
  //  console.log("uploadimage",uploadImageCloudinary.url)
  }

  const handleDeleteProductImage=async(index)=>{
    const newProductImage=[...data.productImage]
    newProductImage.splice(index,1)
    setdata((preve)=>{
      return{
        ...preve,
        productImage:[...newProductImage]
      }
     })
  }

  {/***upload product */}

  const handleSumbit=async(e)=>{
    e.preventDefault()
    const responce = await fetch(summeryapi.uploadProduct.url,{
      method : summeryapi.uploadProduct.method,
      credentials: "include",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(data)
    })
    const responceData= await responce.json()
    console.log("responce",responceData)
    if(responceData.success){
      toast.success(responceData?.message)
      onClose()
      fetchData()

    }
    if(responceData.error){
      toast.error(responceData?.message)

    }
    
  }



  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-45 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'> Upload Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                <AiFillCloseCircle />
                </div>
            </div>

          <form action="" className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSumbit}>
            <label htmlFor="productName">Product Name :</label>
            <input 
             type="text" 
             id='productName'
             placeholder='enter product name' 
             value={data.productName} 
             name='productName'
             onChange={handleonchange}
             className='p-2 bg-slate-100 border rounded'
             required
             />
              
            <label htmlFor="brandName" className='mt-3'>Brand Name :</label>
             <input 
             type="text" 
             id='brandName'
             placeholder='enter brand name' 
             value={data.brandName} 
             name='brandName'
             onChange={handleonchange}
             className='p-2 bg-slate-100 border rounded'
             required
             />

          <label htmlFor="category" className='mt-3'>Category:</label>
           <select required value={data.category} name='category' onChange={handleonchange} className='p-2 bg-slate-100 border rounded'>
           <option value={""}>Select Category</option>
             {
                productCategory.map((el,index)=>{

                  return(
                      <option value={el.value} key={el.value+index}>{el.label}</option>
                     )
                })
             }
           </select>

          <label htmlFor="productImage" className='mt-3'>ProductImage :</label>
          <label htmlFor='uploadImageInput'>    
            <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
            
                 <div className='text-slate-500 flex justify-center items-center flex-col gap-1'>
                     <span className='text-4xl'><FaCloudUploadAlt/></span>
                        <p className='text-sm'>Upload Product Image</p>
                      <input type="file" id='uploadImageInput' className='hidden'onChange={handleUploadProduct}/>

                  </div>
            </div>
            </label>
            <div>
              {
                data?.productImage[0]? (
                  <div className='flex items-center gap-2'>{

                    data.productImage.map((el,index)=>{
                      return(
                      <div className='relative group'>
                         <img src={el}
                          alt={el} 
                          width={80} 
                          height={80} 
                          className='bg-slate-100 border cursor-pointer'
                          onClick={()=>{
                          setOpenFullScreenImage(true)
                          setFullscreenImage(el)
                        }}/>

                       <div className='absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer'onClick={()=>handleDeleteProductImage(index)}>
                       <MdDelete />
                      </div>

                      </div>
                      )
                       })
                      }
                  </div>
                ):(
                  <p className="text-red-600 text-xs">*Please upload Product image</p>
                )
              }
             
            </div>

            <label htmlFor="price" className='mt-3'>Price :</label>
            <input 
             type="number" 
             id='price'
             placeholder='enter Price' 
             value={data.price} 
             name='price'
             onChange={handleonchange}
             className='p-2 bg-slate-100 border rounded'
             required
             />

           <label htmlFor="sellingPrice" className='mt-3'>Selling Price :</label>
            <input 
             type="number" 
             id='sellingPrice'
             placeholder='enter Selling Price' 
             value={data.sellingPrice} 
             name='sellingPrice'
             onChange={handleonchange}
             className='p-2 bg-slate-100 border rounded'
             required
             />
             <label htmlFor="description" className='mt-3'>Description : </label>
             <textarea className='h-28 bg-slate-100 border resize-none p-1'placeholder="enter product description" value={data.description} name='description' rows={3} onChange={handleonchange}>

             </textarea>



            <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Upload Product</button>
            </form>
          

        </div>
        {/***  display image full screen*/}
        {
          openFullScreenImage && (
            <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullscreenImage}/>

          )
        }
      

    </div>
  )
}

export default UploadProduct