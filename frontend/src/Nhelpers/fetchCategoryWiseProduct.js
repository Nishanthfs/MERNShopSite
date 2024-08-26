import summeryapi from "../common"

const fetchCategoryWiseProduct = async(category)=>{
    const responce =await fetch(summeryapi.categoryWiseProduct.url,{
        method : summeryapi.categoryWiseProduct.method,
        headers : {
            "content-type":"application/json"
        },
        body :JSON.stringify({
            category : category
        })
    })
    const dataResponce = await responce.json()
    return dataResponce
}






export default fetchCategoryWiseProduct




