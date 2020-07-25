import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isauthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {getpurchasehistory} from './apiuser';
const Dashboard =()=>{

    const [history,sethistory]=useState([])
const {user,token}=isauthenticated();

const init=(userid,token)=>{
    console.log(userid,token);
    getpurchasehistory(userid,token)
    .then(data=>{
        if(data.error){
            console.log(data.error)
        }
        else{
            console.log(data);
            sethistory(data);
        }
    })

}

useEffect(()=>{
init(user._id,token);
},[])

   
   const links=()=>{
       return (
    <div className="card mb-5">
    <h3 className="card-header">links</h3>
    <ul className="list-group">
        <li className="list-group-item"><Link to ="/carts">My cart</Link></li>
        <li className="list-group-item"><Link to ={`/profile/${user._id}`}>Update profile</Link> </li>
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

        const purchasehist=(history)=>{
            
            return (
                <div className="card mb-5">
                    <h3 className="card-header">Purchase history</h3>
                    <ul className="list-group">
                        <li className="list-group-item">
                            {history.map((h, i) => {
                                return (
                                    <div>
                                        <hr />
                                        {h.products.map((p, i) => {
                                            return (
                                                <div key={i}>
                                                    <h6>Product name: {p.name}</h6>
                                                    <h6>Product price: ${p.price}</h6>
                                                    <h6>
                                                        Purchased date:{p.createdAt}
                                                    </h6>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </li>
                    </ul>
                </div>
            );
        }

return (
    <Layout title="user Dashboard" description="welcome user" >
   <div className="container">
       <div className="row">
           <div className="col-md-3">
               {links()}
           </div>
           <div className="col-md-9">
               {userinfo()}
               {purchasehist(history)}
               </div>
           </div>
   </div>
   </Layout>
    )
            }




export default Dashboard;
