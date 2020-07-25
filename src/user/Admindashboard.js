import React from 'react';
import Layout from '../core/Layout';
import {isauthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
const Dashboard =()=>{
    const {user}=isauthenticated();
   const links=()=>{
       return (
    <div className="card mb-5">
    <h3 className="card-header">links</h3>
    <ul className="list-group">
        <li className="list-group-item"><Link to ="/product/create">create product</Link></li>
        <li className="list-group-item"><Link to ="/category/create">create category</Link> </li>
        <li className="list-group-item"><Link to ="/admin/orders">Orders history</Link> </li>

        <li className="list-group-item"><Link to ="/admin/products">
            Manage Products
            </Link> </li>
    </ul>
    </div>
   )}
        const userinfo=()=>{
            return (
        
<div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
            <li className="list-group-item">{user.name}</li>
            <li className="list-group-item">{user.email}</li>
            <li className="list-group-item">{user.role===1?'Admin':'User'}</li>
        </ul>

    </div>
        )}

        

return (
    <Layout title="Admin Dashboard" description="welcome admin" >
   <div className="container">
       <div className="row">
           <div className="col-md-3">
               {links()}
           </div>
           <div className="col-md-9">
               {userinfo()}
              
               </div>
           </div>
   </div>
   </Layout>
    )
            }




export default Dashboard;
