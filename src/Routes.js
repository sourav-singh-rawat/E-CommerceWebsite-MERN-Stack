import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from "./core/Home"
import Signin from './user/Signin'
import Signup from './user/Signup'
import AdminRoute from './auth/helper/AdminRoutes'
import PrivateRoute from './auth/helper/PrivateRoutes'
import UserDashBoard from './user/UserDashBoard'
import AdminDashBoard from './user/AdminDashBoard'
import Profile from './user/Profile'
import AddCategory from './admin/AddCategory'
import ManageCategory from './admin/ManageCategory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpadteProduct from "./admin/UpdateProduct"
import UpdateCategory from './admin/UpdateCategory'
import Cart from './core/Cart'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/signin" exact component={Signin}/>
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
                <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
                <AdminRoute path="/admin/categories" exact component={ManageCategory}/>
                <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
                <AdminRoute path="/admin/products" exact component={ManageProducts}/>
                <AdminRoute path="/admin/product/update/:productId" exact component={UpadteProduct}/>
                <AdminRoute path="/admin/catergory/update/:categoryId" exact component={UpdateCategory}/>
                <PrivateRoute path="/cart" exact component={Cart}/>
            </Switch>
        </BrowserRouter>
    )
}