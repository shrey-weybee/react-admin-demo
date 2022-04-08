import {Route} from "react-router-dom";
import Demo from "../../Demo";
import DefaultLayout from "../../layout/DefaultLayout";
import ProductListPage from "../../components/pages/product/ProductListPage";
import ProductFormPage from "../../components/pages/product/ProductFormPage";

const routes = [
    {
        path:'/',
        element: DefaultLayout,
        name:'Home',
        children: [
            {
                index:true,
                element:Demo
            },
            {
                path:'/products',
                name:'Product List',
                element:ProductListPage,
            },
            {
                path:'/products/create',
                name:'Product Create',
                element:ProductFormPage,
            },
            {
                path:'/products/update/:productId',
                name:'Product Update',
                element:ProductFormPage,
            },
            {
                path:'/*',
                element:Demo
            }
        ]
    },
]

export const getRoute=(route)=>{
    const Component = route.element

    if(!route.children){
        return <Route {...route}  element={<Component />}  />
    }
    return <Route {...route}  element={<Component />} >
        {route.children.map(getRoute)}
    </Route>

}

export default routes