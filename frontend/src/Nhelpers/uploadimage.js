const url=`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`

const uploadimage = async(image) => {
    const formdata= new FormData()
    formdata.append("file",image)
    formdata.append("upload_preset","mern_product")
  
    const dataResponce = await fetch(url,{
        method:'post',
        body: formdata
    })
    return dataResponce.json()
  
}

export default uploadimage