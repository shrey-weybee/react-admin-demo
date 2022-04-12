import {Route} from "react-router-dom";
import Demo from "../../Demo";
import DefaultLayout from "../../layout/DefaultLayout";
import ProductListPage from "../../components/pages/product/ProductListPage/ProductListPage";
import ProductFormPage from "../../components/pages/product/ProductFormPage/ProductFormPage";
import CustomerListPage from "../../components/pages/customer/CustomerListPage/CustomerListPage";
import CustomerFormPage from "../../components/pages/customer/CustomerFormPage/CustomerFormPage";

const routes = [
    {
        path:'/',
        element: DefaultLayout,
        name:'Home',
        children: [
            {
                index:true,
                name:'Demo',
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
                path:'/customers',
                name:'Product List',
                element:CustomerListPage,
            },
            {
                path:'/customers/create',
                name:'Customer Create',
                element:CustomerFormPage,
            },
            {
                path:'/customers/update/:customerId',
                name:'Customer Update',
                element:CustomerFormPage,
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
        return <Route {...route} key={route.key || route.name || route.path}  element={<Component />}  />
    }
    return <Route {...route} key={route.key || route.name || route.path} element={<Component />} >
        {route.children.map(getRoute)}
    </Route>

}

export default routes