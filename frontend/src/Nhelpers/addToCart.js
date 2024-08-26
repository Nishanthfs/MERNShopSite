import { json } from "react-router-dom"
import summeryapi from "../common"
import {toast} from"react-toastify"

const addToCart = async(e,id)=>{
  e?.stopPropagation()
  e?.preventDefault() 
  const responce = await fetch(summeryapi.addToCartProduct.url,{
    method : summeryapi.addToCartProduct.method,
    credentials : "include",
    headers : {
      "content-type" : "application/json"
    },
    body :JSON.stringify(
      {productId : id}
    )

  })
  const responceData = await responce.json()
  if(responceData.success){
    toast.success(responceData.message)

  }
  if(responceData.error){
    toast.error(responceData.message)

  }

  return responceData
} 


export default addToCart