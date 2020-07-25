import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {getproduct} from '../core/userapi';
import Card from '../core/card';
import Shop from '../core/shop';
import Search from '../core/Search';
import { isauthenticated } from '../auth';
import {listorders, getstatus,updatestatus} from './adminapi';

const orders=()=>{
const [order,setorder]=useState([])
const {user,token}=isauthenticated();
const [statusValues,setStatusValues]=useState([])
const loadorders=()=>{
    console.log(user._id,token);
    listorders(user._id,token)
    .then(data=>{
        console.log(data);
        if(data.error){
            console.log(data.error)
        }
        else{
            setorder(data)
        }
    })
}

const loadStatusValues = () => {
    getstatus(user._id, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            setStatusValues(data);
        }
    });
};
useEffect(()=>{
loadorders();
loadStatusValues();
},[])

const handleStatusChange=(e,orderId)=>{
    console.log(e.target.value);
    updatestatus(user._id,token,orderId,e.target.value)
    .then(data=>{
        if(data.error){
            console.log('failed update');
        }
        else{
           loadorders();
        }
    })
}

const showStatus = o => (
    <div className="form-group">
        <h3 className="mark mb-4">Status: {o.status}</h3>
        <select
            className="form-control"
            onChange={e => handleStatusChange(e, o._id)}
        >
            <option>Update Status</option>
            {statusValues.map((status, index) => (
                <option key={index} value={status}>
                    {status}
                </option>
            ))}
        </select>
    </div>
);

const showorderlength=()=>{
    if(order.length>0){
        return (
            <h1 className="text-danger display-2">Total order :{order.length}</h1>
        )
    }
    else{
        return <h1 className="text-danger display-2">No orders</h1>
    }
}



const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
            <div className="input-group-text">{key}</div>
        </div>
        <input
            type="text"
            value={value}
            className="form-control"
            readOnly
        />
    </div>
);

return (
    <Layout title="Orders" description="Orders history" >
        {showorderlength()}
        {order.map((o, oIndex) =>{
            return (
                        
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo" }}
                            >
                                <h2 className="mb-5">
                                    <span className="bg-primary">
                                        Order ID: {o._id}
                                    </span>
                                </h2>
                                <ul className="list-group-mb-2">
                                
                                                                       
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: Rs {o.amount} /-
                                    </li>
                                    <li className="list-group-item">
                                       Delievery Address: {o.address}
                                         </li>
                                         <h3 className="mb-4 font-italic">
                                       Total Products in order:{o.products.length}
                                         </h3>
                                        
                                         {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}

                                    </ul>
                                   
                              
                                
                            </div>
            )}
                    )}
              
    </Layout>
)
}

export default orders;