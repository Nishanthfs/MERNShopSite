import { createBrowserRouter} from"react-router-dom"
import App  from "../App"
import Forgotpassword from "../pages/Forgotpassword"
import Home from "../pages/Home"
import Login from "../pages/Login"
import SignUp from "../pages/SignUp"
import AdminPanel from "../pages/AdminPanel"
import Alluser from "../pages/Alluser"
import AllProducts from "../pages/AllProducts"
import CategoryProducts from "../pages/CategoryProducts"
import ProductDetails from "../pages/ProductDetails"
import Cart from "../pages/Cart"
import SearchProduct from "../pages/SearchProduct"
 const router =createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element:<Login/>
            },
            {
                path:"forgot-password",
                element:<Forgotpassword/>
           
            },
            {
                path:"sign-up",
                element:<SignUp/>
            },
            {
                path:"product-category",
                element:<CategoryProducts/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>

            },
            {
                path:"cart",
                element:<Cart/>
            },
            {
                path:"search",
                element:<SearchProduct/>
            },
            {
                path: "admin-panel",
                element:<AdminPanel/>,
                children :[
                    {
                        path:"all-users",
                        element:<Alluser/>
    
                    },
                    {
                        path:"all-Prodects",
                        element:<AllProducts/>

                    },
            
                ]
            },
            
                
             
            
        ]
    }
    
 ])

export default router