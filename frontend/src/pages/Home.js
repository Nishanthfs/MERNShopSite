import React from 'react'
import CategoryList from '../componets/CategoryList'
import BannerProduct from '../componets/BannerProduct'
import HorizontalCardProduct from '../componets/HorizontalCardProduct'
import VerticalCardProduct from '../componets/VerticalCardProduct'



const Home = () => {
  return (
    <div>
     <CategoryList/>
     <BannerProduct/>
     <HorizontalCardProduct category={"airpodes"} heading={"TOP's Airpodes"}/>
     <HorizontalCardProduct category={"watches"} heading={"Popular's watches"}/>

     <VerticalCardProduct category={"mobiles"} heading={"Mobiles"}/>
     <VerticalCardProduct category={"mouse"} heading={"Sensitive Mouse"}/> 
     <VerticalCardProduct category={"televisions"} heading={"Televisions"}/>
     <VerticalCardProduct category={"laptop"} heading={"Brand New Laptop"}/>
     <VerticalCardProduct category={"speakers"} heading={"Blutooth speakers"}/>
     <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"}/>
     {/** <VerticalCardProduct category={"printers"} heading={"Printers"}/>
     <VerticalCardProduct category={"processor"} heading={"High Level Processor"}/> */}
     <VerticalCardProduct category={"trimmers"} heading={"Trimmers"}/>

      

    </div>
    // im finding big error this version ,you will using router element must be insert the route fregment tag//
  )
}

export default Home