const displayINRCurrency=(num)=>{
    const formatter=new Intl.NumberFormat("en-in",{
        style:"currency",
        currency:"INR",
        minimumFractionDigits:2,
    })
    return formatter.format(num)
}


export default displayINRCurrency