import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../Nhelpers/productCategory'
import CategoryWiseProductDisplay from '../componets/CategoryWiseProductDisplay'
import VerticalCart from '../componets/VerticalCart'
import summeryapi from '../common'

const CategoryProducts = () => {
    const params =useParams()
    const[data,setdata]=useState([])
   const navigate = useNavigate()

    const[loading,setloading]= useState(false)
    const location = useLocation()
   const urlSearch = new URLSearchParams(location.search)
   const urlCategoryListInArray = urlSearch.getAll("category")
   const urlCategoryListObject = {}
   urlCategoryListInArray.forEach(el=>{
    urlCategoryListObject[el] = true
   })

    const[selectCategory,setSelectCategory]=useState(urlCategoryListObject)
    const [filterCategoryList,SetFilterCategoryList]=useState({})

    
    const[sortBy,setSortBy]=useState("")

    const fetchData = async()=>{
      const responce = await fetch(summeryapi.filterProduct.url,{
        method : summeryapi.filterProduct.method,
        headers :{
          "content-type":"application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList,
        })
      })
      const dataResponce = await responce.json()
      setdata(dataResponce?.data || [])
      
    }

    const handleSelectCategory = (e)=>{
      const {name,value, checked} = e.target
      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked,
      }
      })
      
    }
    useEffect(()=>{
      fetchData()
    },[filterCategoryList])


    useEffect(()=>{
      const arrayOfCategory =Object.keys(selectCategory).map(categoryKeyname =>{
        if(selectCategory[categoryKeyname]){
          return categoryKeyname
        }
        return null
      }).filter(el => el)

      SetFilterCategoryList(arrayOfCategory)
      const urlFormate = arrayOfCategory.map((el,index)=>{
        if((arrayOfCategory.length-1) === index){
          return `category=${el}`
        }

        return `category=${el}&&`
      })
      navigate("/product-category?"+urlFormate.join(""))

    },[selectCategory])
    const handleOnchangesortby = (e)=>{
      const {value}= e.target
        setSortBy(value)

      if(value === 'asc'){
        setdata(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

        if(value === 'dec'){
        setdata(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
      
    }
    useEffect(()=>{

    },[sortBy])
    
    // {params?.categoryName}

  return (
    <div className='container mx-auto p-4'>

      {/* desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr] '>
         {/* left side  product*/}
         <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/* sort by */}
            <div>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'> Sort By</h3>

              <form action="" className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center  gap-3 '>
                  <input type="radio" name='sortBy' checked={sortBy === 'asc'} value={"asc"} onChange={handleOnchangesortby}/>
                  <label htmlFor=""> Price - Low To High</label>
                </div>

                <div className='flex items-center gap-3'>
                  <input type="radio" name='sorByt' checked={sortBy === 'dec'} value={"dec"}  onChange={handleOnchangesortby}/>
                  <label htmlFor=""> Price - High To Low</label>
                </div>
              </form>

            </div>

            {/* filter by */}
            <div>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

              <form action="" className='text-sm flex flex-col gap-2 py-2'>
                {
              productCategory.map((categoryname,index)=>{
                return(
                  <div className='flex items-center gap-3'>
                    <input type="checkbox"  name={"category"} value={categoryname?.value} checked={selectCategory[categoryname?.value]} id={categoryname?.value} onChange={handleSelectCategory }/>
                    <label htmlFor={categoryname?.value}>{categoryname?.label}</label>
                  </div>
                )
              })

                }
              </form>

            </div>

         </div>

           {/* right side product*/}
            <div className='px-4'>
              <p className="font-medium text-slate-800 text-lg my-2">Search Results : {data.length}</p>
             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
             {
                data.length !== 0 && (
                  <VerticalCart data={data} loading={loading}/>
                )
              }
            
             </div>
           </div>

      </div>
      
      </div>
  )
}

export default CategoryProducts