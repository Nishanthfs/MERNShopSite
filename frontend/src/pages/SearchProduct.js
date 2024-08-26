import React, { useEffect, useState } from 'react'
import { useLocation} from 'react-router-dom'
import summeryapi from '../common'
import VerticalCart from '../componets/VerticalCart'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setdata] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)
    const fetchProduct = async()=>{
        setLoading(true)
        const responce = await fetch(summeryapi.searchProduct.url+query.search)
        const dataResponce = await responce.json()
      
        setLoading(false)
        setdata(dataResponce.data)
        
    }
    useEffect(()=>{
        fetchProduct()
    },[query])

  return (
    <div className='container mx-auto p-4'>
        {
            loading && (
                <p className='text-lg text-center'>Loading ...</p>
            )

        }
         <p className='text-lg font-semibold my-3 '>Search Result : {data.length}</p> 
        {
            data.length === 0 && !loading && (
                <p className="bg-white text-lg text-center p-4">No data Found.....</p>

            )
        }
        {
            data.length !==0 && !loading && (

             <VerticalCart loading={loading} data={data}/>    
                
            )
        }
    </div>
  )
}

export default SearchProduct