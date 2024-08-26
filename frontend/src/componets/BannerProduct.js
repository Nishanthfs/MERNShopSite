import React, { useEffect, useState } from 'react'
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAngleDoubleLeft } from "react-icons/fa";
import image1 from"../assets/banner/banner 1.webp";
import image2 from"../assets/banner/banner 2.jpg";
import image3 from"../assets/banner/banner 3.jpg";
import image4 from"../assets/banner/banner 4.jpg";
import image5 from"../assets/banner/banner 5.jpg";
import image6 from"../assets/banner/banner 6.jpg";
import image7 from"../assets/banner/banner 7.jpg";
import image8 from"../assets/banner/banner 8.jpg";



import image1mobile from "../assets/banner/banner ph.jpg";

const BannerProduct = () => {
  const [currentImage,SetCurrentImage]=useState(0)
  const desktopImage=[
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ]
  const mobileImage=[
    image1mobile,
    
  ]
  const nextImage=()=>{
    if(desktopImage.length - 1 > currentImage){
      SetCurrentImage(preve => preve + 1)
    }
    

  }
    const preveImage=()=>{
    if(currentImage != 0){
      SetCurrentImage(preve => preve - 1)
    }
  }
  useEffect(()=>{
    const interval= setInterval(() => {
      if(desktopImage.length -1 > currentImage){
        nextImage()
      }else{
        SetCurrentImage(0)
      }
      
    }, 5000)
    return ()=>clearInterval(interval)

  },[currentImage])

  return (
   <div className='container mx-auto px-4 rounded '>
      <div className='h-56 md:h-56 w-full bg-slate-200 relative'>

        <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
          <div className='flex justify-between w-full text-3xl'>
            <button onClick={preveImage} className='bg-white shadow-md rounded-full p-2'><FaAngleDoubleLeft /> </button>
            <button onClick={nextImage}  className='bg-white shadow-md rounded-full p-2'><FaAngleDoubleRight /> </button>
          </div>
        </div>

        {/** desktop and tablet version */}

        <div className='hidden md:flex w-full h-full overflow-hidden'> 

          {
               desktopImage.map((imageURL,index)=>{
               return(
                  <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform:`translateX(-${currentImage*100}%)`}}>
                     <img src={imageURL} alt="" className='w-full h-full'/>
                  </div>
               )
              })
          }
        </div>

            {/** mobile version*/}
        <div className='flex  w-full h-full overflow-hidden md:hidden'> 

          {
             mobileImage.map((imageURL,index)=>{
               return(
                  <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{transform:`translateX(-${currentImage*100}%)`}}>
                     <img src={imageURL} alt="" className='w-full h-full object-cover'/>
                  </div>
               )
              })
          }
        </div>
         
         
      </div>
   </div>
  
  )
}

export default BannerProduct