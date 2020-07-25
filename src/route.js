import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/signup';
import Signin from './user/signin';
import Home from './core/home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/dashboard';
import Menu from './core/menu';
import Admindash from './user/Admindashboard';
import AdminRoute from './auth/Adminprivate';
import Addcategory from './Admin/addcategory';
import Addproduct from './Admin/addproduct';
import Shop from './core/shop';
import Product from './core/product';
import Cart from './core/Cart';
import Orders from './Admin/orders';
import Profile from './user/profile';
import Manageproduct from './Admin/manageproduct';
import Managepro from './Admin/manageproduct';
import Updateproduct from './Admin/updateproduct';

const Routes = () => {
    return (

        <BrowserRouter>
        <Menu />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <AdminRoute path="/admin/dashboard" exact component={Admindash} />
                <AdminRoute path="/category/create" exact component={Addcategory} />
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <Route path="/product/create" exact component={Addproduct} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <AdminRoute path="/admin/products" exact component={Managepro} />
                
                <AdminRoute path="/admin/product/update/:productId" exact component={Updateproduct} />
                </Switch>
        </BrowserRouter>
    );
};

export default Routes;