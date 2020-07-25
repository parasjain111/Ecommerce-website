import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import {getproduct} from './userapi';
import Card from './card';
import Shop from './shop';
import Search from './Search';
import {getcarts,removeitem} from './carthelper';
import {Link} from 'react-router-dom';
import Checkout from './checkout';

const Cart=()=>{
    const [items,setitems]=useState([])
    const [run, setRun] = useState(false);

    useEffect(()=>{
        setitems(getcarts())
    },[run]);

    const showitems=items=>{
        return(
            <div>
                <h2>Your cart has {`${items.length}`} items</h2>
                <br/>
                { items.map((p,i)=>(
                    <Card key={i} product={p} showbutton={true} showatcbutton={false} incdec={true} showremovebutton={true} setRun={setRun} run={run}/>
                ))}
                </div>
        )
    }
const nomessage=()=>(
    <h2>
        Your cart is empty <br />
    <Link to ="/shop">Continue Shopping</Link>
    </h2>
)

    return (
        <Layout title="Cart details" description="check out your products" >
            <div className="row">
                <div className="col-6">
                    {items.length>0 ? showitems(items):nomessage()}
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your Cart Summary</h2>
 <br/>
    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart;