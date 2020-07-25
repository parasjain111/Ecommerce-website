import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {getproduct,getclienttoken,processPayment,createorder} from './userapi';
import Card from './card';
import Shop from './shop';
import Search from './Search';
import {removecart} from './carthelper';
import {Link,Redirect} from 'react-router-dom';
import {isauthenticated} from '../auth/index';
import DropIn from 'braintree-web-drop-in-react';
const checkout=({products})=>{
    const [data,setdata]=useState({
        success:false,
        clienttoken:null,
        error:'',
        instance:{},
        address:''
    })

const userId=isauthenticated() && isauthenticated().user._id;
const token=isauthenticated() && isauthenticated().token;
console.log(userId,token);
const gettoken=(userId,token)=>{
    getclienttoken(userId,token)
    .then(data=>{
        if(data.error){
            setdata({...data,error:data.error})
        }
        else{
            setdata({clienttoken:data.clientToken})
        }
    })
}

useEffect(()=>{
    gettoken(userId,token)
   // console.log(data.clienttoken)
},[]);
let adre=data.address;
const buy=()=>{
    let nonce;
    let getnonce=data.instance.requestPaymentMethod()
    .then(data=>{
        //console.log(data);
        nonce=data.nonce;
        //console.log(nonce,getTotal(products))
        const paymentdata={
            paymentMethodNonce:nonce,
            amount:getTotal(products)
        }
        console.log(paymentdata);
        processPayment(userId,token,paymentdata)
        .then(response=>{
            console.log(response);
            const createorderData={
                products:products,
                transaction_id:response.transaction_id,
                amount:response.transaction.amount,
                address:adre

            }
            console.log(paymentdata);
            createorder(userId,token,createorderData)

            setdata({...data,success:response.success})
            removecart(()=>{
                console.log('derc');
            })
        })
        .catch(error=>console.log(error))
    })
    .catch(error=>{
        setdata({...data,error:error.message})
    })


}

const showsuccess=(success)=>(
    <div className="alert alert-info" style={{display:success ?'':'none'}} >
        Payment successful !
    </div>
)

const handleaddress=event=>{
    setdata({...data,address:event.target.value});
}
const showdropin=()=>(
    <div>
    
        {data.clienttoken !==null && products.length>0 ?(
            <div>
                <div className="form-group mb-3">
                    <label className="text-muted">Delievery address</label>
                    <textarea className="form-control" onChange={handleaddress} value={data.address} />

                    </div>
                    <DropIn options= {{
                        authorization: data.clienttoken,
                        paypal:{
                            flow:'vault'
                        }
                    }} onInstance={(instance)=>(data.instance=instance)}/>
                    <button onClick={buy} className="btn btn-outline-success">Pay Now</button>
            </div>
        ):null}
            </div>
)



   const getTotal=()=>{
       return products.reduce((currentValue,nextValue)=>{
           return currentValue+nextValue.count*nextValue.price;
       },0);
   }

   return (
       <div>
           {showsuccess(data.success)}
           <h1>Total : Rs {getTotal()}.00 /-</h1>
           {isauthenticated() ?(
               <div>{showdropin()}</div>
           ):(
<Link to ="/signin">
    <button className="btn btn-primary">
        Sign in to checkout
    </button>
</Link>
           )
}
           )}
       </div>
   )
}

export default checkout;