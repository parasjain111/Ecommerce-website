import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Showimage from './showimage';
import '../style.css';
import {addItem,updateitem,removeitem} from './carthelper';

const card=({product,showbutton,showatcbutton=true,incdec=false,showremovebutton=false,setRun=f=>f,run=undefined})=>{
    const [redirect,setredirect]=useState(false)
    const [count,setcount]=useState(product.count);
       const showviewbutton=showbutton=>{
           return(
               showbutton && (
                   <button className="btn btn-outline-warning">
                       View product
                   </button>
               ))
           
                   }
                   
                   const showcartbutton=showatcbutton=>{
                    return(
                        showatcbutton && (
                            <button onClick={addTocart} className="btn btn-outline-success btn-md">
                                Add to cart
                            </button>

                        ))
                    
                            }

                            const showremove=showremovebutton=>{
                                return(
                                    showremovebutton && (
                                        <button onClick={()=>{removeitem(product._id);
                                         setRun(!run)}} className="btn btn-outline-danger btn-md">
                                            Remove product
                                        </button>
            
                                    ))
                                
                                        }

const handlechange=productid=>event=>{
setRun(!run);
    setcount(event.target.value<1 ?1:event.target.value);
    if(event.target.value>1){
        updateitem(productid,event.target.value);
    }
}
 

const updatequality=incdec=>{
    return (
        incdec && (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    Adjust quality
                </span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handlechange(product._id)}/>
        </div>
    ))
}

const addTocart=()=>{
    addItem(product,()=>{
        setredirect(true)
    })
}
const shouldredirect=redirect=>{
    if(redirect){
        return <Redirect to="/cart" />
    }
}


const showStock=(quantity)=>{
    return quantity>0 ? (
    <span className="badge badge-primary badge-pill">In stock </span>
    ):(
        <span className="badge badge-primary badge-pill">Out of stock ></span> 
    )
}
                   return (
        <div className="card">
                    <div className="card-header name">
                        {product.name}
                    </div>
                    <div className="card-body">
                        {shouldredirect(redirect)}
                        <Showimage item={product} url="photo/of" />
                        <p className="lead mt-2">{product.description}</p>
                        <div>
                          <p className="black-11">Rs {product.price} /-</p>
                <p className="black-10">Category: {product.category && product.category.name}</p>
                       
                        </div>

                        {showStock(product.quantity)}
<br></br>

                        <Link to ={`/product/${product._id}`}>
                           
                        {showviewbutton(showbutton)}
                        </Link>
                        <Link to ="/">
                            {showcartbutton(showatcbutton)}
                        </Link>
                   {updatequality(incdec)}
                   {showremove(showremovebutton)}
                </div>
            </div>
    
    )
}

export default card;